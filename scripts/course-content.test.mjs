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
const { readLessonResume, resumeKey } = load("src/lib/course-resume.ts");
const { learningPaths } = load("src/lib/learning-paths.ts");
const { careerRoadmaps } = load("src/lib/career-roadmaps.ts");
const { getCourseProject } = load("src/lib/course-projects.ts");
const { lessonVisuals } = load("src/lib/lesson-visuals.ts");
const { safeReturnPath } = load("src/lib/visitor-session.ts");
const { profileName } = load("src/lib/profile.ts");

test("profile names prefer learner edits and fall back to Google names", () => {
  assert.equal(profileName({ display_name: "  Anu  ", full_name: "Google Name", name: "Other" }), "Anu");
  assert.equal(profileName({ display_name: "  ", full_name: " Google Name " }), "Google Name");
  assert.equal(profileName({ full_name: null, name: "Google Name" }), "Google Name");
  assert.equal(profileName({ display_name: 42, full_name: "" }), "Learner");
  assert.equal(profileName(null), "Learner");
});

test("login return paths stay inside the site and avoid redirect loops", () => {
  assert.equal(safeReturnPath("/itkannadigaru/learn/python-for-ai?x=1#notes"), "/itkannadigaru/learn/python-for-ai?x=1#notes");
  for (const value of [null, "//evil.example", "/\\evil.example", "/other", "/itkannadigaru/login", "/itkannadigaru/login/", "/itkannadigaru/../other"]) {
    assert.equal(safeReturnPath(value), "/itkannadigaru");
  }
});

test("career roadmaps explain each topic and link to available courses", () => {
  const slugs = new Set(["python-for-ai", ...catalog.map((course) => course.slug)]);
  assert.deepEqual(careerRoadmaps.map((roadmap) => roadmap.id), ["ai", "devops"]);
  for (const roadmap of careerRoadmaps) {
    assert.ok(roadmap.phases.length >= 5);
    const topics = roadmap.phases.flatMap((phase) => {
      assert.ok(phase.title && phase.outcome);
      if (phase.course) assert.ok(slugs.has(phase.course.slug));
      return phase.topics;
    });
    assert.ok(topics.length >= 25);
    assert.equal(new Set(topics.map((topic) => topic.name)).size, topics.length);
    for (const topic of topics) assert.ok(topic.name && topic.why, `${roadmap.id}: missing explanation`);
  }
});

test("learning paths cover available courses and link only to real project briefs", () => {
  const slugs = new Set(["python-for-ai", ...catalog.map((course) => course.slug)]);
  const linked = new Set();
  for (const path of learningPaths) {
    for (const stage of path.stages) {
      assert.ok(slugs.has(stage.slug), `${path.id}: missing route ${stage.slug}`);
      linked.add(stage.slug);
      if (stage.project) assert.ok(getCourseProject(stage.slug).checks.length >= 3);
    }
  }
  assert.deepEqual(linked, slugs);
  const projects = [...slugs].map(getCourseProject);
  assert.equal(new Set(projects.map((project) => project.title)).size, slugs.size);
  for (const project of projects) {
    assert.ok(project.fixture && project.expected && project.safety);
    assert.ok(project.steps.length >= 4 && project.deliverables.length >= 3);
    assert.ok(project.troubleshooting.length >= 2);
  }
  assert.throws(() => getCourseProject("unpublished-course"), /Missing course project/);
  assert.throws(() => getCourseProject("__proto__"), /Missing course project/);
});

test("visual examples map to published lessons and include observations and failure diagnosis", () => {
  const videoIds = new Set([...pythonLessons.map((lesson) => lesson.video), ...catalog.flatMap((course) => course.videos.map((video) => video.id))]);
  for (const [id, visual] of Object.entries(lessonVisuals)) {
    assert.ok(videoIds.has(id), `Unmapped visual example: ${id}`);
    assert.ok(visual.nodes.length >= 3);
    assert.equal(new Set(visual.nodes).size, visual.nodes.length);
    assert.ok(visual.expected && visual.fault && visual.fix);
  }
  for (const lesson of pythonLessons) assert.ok(lessonVisuals[lesson.video], `Missing Python visual: ${lesson.day}`);
  for (const course of catalog) assert.ok(course.videos.some((video) => lessonVisuals[video.id]), `No worked visual for ${course.slug}`);
});

test("saved lessons use video identity, validate data and isolate each course", () => {
  const saved = new Map();
  const storage = { getItem: (key) => saved.get(key) ?? null };
  assert.equal(readLessonResume(storage, "ai-engineering", ["first", "second"]), null);
  saved.set(resumeKey("ai-engineering"), JSON.stringify({ videoId: "second", updatedAt: 123 }));
  assert.deepEqual(readLessonResume(storage, "ai-engineering", ["second", "first"]), { videoId: "second", updatedAt: 123 });
  assert.equal(readLessonResume(storage, "python-for-ai", ["second"]), null);
  assert.throws(() => readLessonResume(storage, "ai-engineering", ["first"]), /Invalid saved lesson/);
  for (const value of ["invalid JSON", "null", '{"videoId":"second","updatedAt":"123"}', '{"videoId":"second","updatedAt":0}']) {
    saved.set(resumeKey("ai-engineering"), value);
    assert.throws(() => readLessonResume(storage, "ai-engineering", ["second"]));
  }
  assert.throws(() => readLessonResume({ getItem: () => { throw new Error("Storage blocked"); } }, "ai-engineering", ["first"]), /Storage blocked/);
});

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
