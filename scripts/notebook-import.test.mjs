import assert from "node:assert/strict";
import test from "node:test";
import { convertNotebook } from "./import-python-notes.mjs";

test("preserves markdown, code indentation, and text output without executing cells", () => {
  assert.deepEqual(convertNotebook({ cells: [
    { cell_type: "markdown", source: ["# Variables\n", "Learn with examples."] },
    { cell_type: "code", source: ["if True:\n", "    print('hello')"], outputs: [
      { output_type: "stream", text: ["hello\n"] },
      { output_type: "execute_result", data: { "text/plain": ["42"], "text/html": ["<script>bad()</script>"] } },
      { output_type: "error", traceback: ["private local path"] },
    ] },
  ] }), [
    { type: "markdown", content: "# Variables\nLearn with examples.", output: "" },
    { type: "code", content: "if True:\n    print('hello')", output: "hello\n\n42" },
  ]);
});

test("skips empty and raw cells, but rejects malformed notebook text", () => {
  assert.deepEqual(convertNotebook({ cells: [
    { cell_type: "raw", source: "raw markup" },
    { cell_type: "code", source: [" \n"], outputs: [] },
  ] }), []);
  assert.throws(() => convertNotebook({}), /no cells/);
  assert.throws(() => convertNotebook({ cells: [{ cell_type: "code", source: [42] }] }), /notebook text/);
});
