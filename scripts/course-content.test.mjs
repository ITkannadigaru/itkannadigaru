import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
const cache = new Map();
function load(relativePath) {
  const file = path.resolve(relativePath);
  if (cache.has(file)) return cache.get(file);
  const loaded = { exports: {} };
  const code = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  const localRequire = (name) => name.startsWith("@/")
    ? (name.endsWith(".json") ? require(path.resolve("src", name.slice(2))) : load(path.join("src", `${name.slice(2)}.ts`)))
    : require(name);
  vm.runInThisContext(`(function(require,module,exports){${code}\n})`, { filename: file })(localRequire, loaded, loaded.exports);
  cache.set(file, loaded.exports);
  return loaded.exports;
}

const { catalog } = load("src/lib/catalog.ts");
const { getCourseLessons } = load("src/lib/course-lessons.ts");
const { getCourseMaterials } = load("src/lib/course-materials.ts");
const { lessons: pythonLessons } = load("src/lib/python-lessons.ts");
const { getPythonStudyGuide } = load("src/lib/python-study-guides.ts");
const { getCourseStudyGuide } = load("src/lib/course-study-guides.ts");

test("every published video has distinct practice and valid pinned source references", () => {
  let total = 0;
  for (const course of catalog) {
    const lessons = getCourseLessons(course);
    total += lessons.length;
    assert.deepEqual(lessons.map((lesson) => lesson.id), course.videos.map((video) => video.id));
    assert.equal(new Set(lessons.map((lesson) => lesson.assessment.question)).size, lessons.length);
    const { documents } = getCourseMaterials(lessons);
    for (const lesson of lessons) {
      const assessment = lesson.assessment;
      assert.equal(new Set(assessment.options).size, 3);
      assert.ok(assessment.answer >= 0 && assessment.answer < 3);
      assert.ok(assessment.explanation.startsWith(assessment.options[assessment.answer]));
      assert.ok(assessment.criteria.length >= 3);
      for (const id of lesson.sourceIds) {
        const document = documents.find((item) => item.id === id);
        assert.ok(document, `${course.slug}: missing ${id}`);
        assert.ok(document.source.includes(`/blob/${document.commit}/`));
        assert.ok(document.cells.length > 0);
      }
    }
  }
  assert.equal(total, 120);
});

test("CKA ordering and companion mappings survive a reordered playlist", () => {
  const course = catalog.find((course) => course.slug === "kubernetes-cka");
  const lessons = getCourseLessons(course);
  assert.deepEqual(lessons.map((lesson) => lesson.label), Array.from({ length: 43 }, (_, i) => `Day ${i + 1}`));
  assert.equal(lessons[20].id, "jEFwfxfYtHk");
  assert.ok(lessons[20].assessment.question.includes("PriorityClass"));
  const reversed = getCourseLessons({ ...course, videos: [...course.videos].reverse() });
  assert.equal(reversed.find((lesson) => lesson.id === lessons[20].id).assessment.question, lessons[20].assessment.question);
});

test("unmapped videos and source IDs fail explicitly rather than showing unrelated notes", () => {
  assert.throws(() => getCourseLessons({ ...catalog[0], videos: [{ id: "unknown", title: "Unknown" }, ...catalog[0].videos.slice(1)] }), /Missing companion/);
  const lesson = getCourseLessons(catalog[0])[0];
  assert.throws(() => getCourseMaterials([{ ...lesson, sourceIds: ["ai:missing.ipynb"] }]), /Missing imported source/);
  const dsa = catalog.find((course) => course.slug === "python-dsa");
  const practice = getCourseLessons(dsa).find((lesson) => lesson.id === "oAnn4d0_1BQ");
  assert.match(practice.explanation, /original companion practice/i);
  assert.deepEqual(practice.sourceIds, []);
});

test("all courses provide contextual walkthroughs rather than generic source wrappers", () => {
  const all = [
    ...catalog.flatMap((course) => getCourseLessons(course).map((lesson) => ({ id: lesson.id, guide: lesson.studyGuide }))),
    ...pythonLessons.map((lesson) => ({ id: lesson.video, guide: getPythonStudyGuide(lesson.video) })),
  ];
  assert.equal(all.length, 143);
  for (const { id, guide } of all) {
    assert.ok(guide.title && guide.connection && guide.mistake && guide.remember, id);
    assert.ok(guide.walkthrough.length >= 3, `${id}: missing explanatory steps`);
    assert.equal(new Set(guide.walkthrough).size, guide.walkthrough.length);
  }
  const variables = getPythonStudyGuide(pythonLessons[0].video);
  const calculations = getPythonStudyGuide(pythonLessons[1].video);
  assert.notDeepEqual(variables.walkthrough, calculations.walkthrough);
  assert.ok(calculations.walkthrough.some((step) => step.includes("60")));
  assert.match(getCourseStudyGuide("HU2hK-IbIzM").remember, /ML learns patterns/);
  assert.match(getCourseStudyGuide("oGF0HNcmre4").mistake, /Deletion/);
  assert.throws(() => getCourseStudyGuide("not-a-video"), /Missing course study guide/);
  assert.throws(() => getPythonStudyGuide("not-a-video"), /Missing Python study guide/);
});
