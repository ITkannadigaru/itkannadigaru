import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export const notebookFiles = [
  "01-VARIABLE-DATATYPES.ipynb",
  "02-STRINGS.ipynb",
  "03-LIST-TUPLE.ipynb",
  "04-DICT-AND-SETS.ipynb",
  "05-CONDITIONAL.ipynb",
  "06-LOOPS.ipynb",
  "07-FUNCTIONS.ipynb",
  "08-EXCEPTION-HANDLING.ipynb",
  "09-FILEHANDLING.ipynb",
  "10-MODULE-PACKAGE.ipynb",
  "11-OOPS.ipynb",
  "13-Typing.ipynb",
];

function text(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && value.every((part) => typeof part === "string")) return value.join("");
  throw new Error("Expected notebook text to be a string or array of strings");
}

export function convertNotebook(notebook) {
  if (!Array.isArray(notebook.cells)) throw new Error("Notebook has no cells");
  return notebook.cells.flatMap((cell) => {
    if (!["markdown", "code"].includes(cell.cell_type)) return [];
    const content = text(cell.source);
    if (!content.trim()) return [];
    const outputs = [];
    if (cell.cell_type === "code") {
      for (const output of cell.outputs ?? []) {
        if (output.output_type === "stream") outputs.push(text(output.text));
        else if (["display_data", "execute_result"].includes(output.output_type) && output.data?.["text/plain"]) {
          outputs.push(text(output.data["text/plain"]));
        }
      }
    }
    return [{ type: cell.cell_type, content, output: outputs.join("\n") }];
  });
}

function importNotes() {
  const repo = "ManojKRISHNAPPA/ITK-COMPLETE-GENAI-SERIES";
  const commit = JSON.parse(execFileSync("gh", ["api", `repos/${repo}/commits/main`], { encoding: "utf8" })).sha;
  const notebooks = {};
  for (const file of notebookFiles) {
    const path = `ITK-PYTHON/${file}`;
    const response = JSON.parse(execFileSync("gh", ["api", `repos/${repo}/contents/${path}?ref=${commit}`], {
      encoding: "utf8",
      maxBuffer: 10 * 1024 * 1024,
    }));
    if (response.encoding !== "base64" || !response.content) throw new Error(`No content for ${path}`);
    const notebook = JSON.parse(Buffer.from(response.content, "base64").toString("utf8"));
    notebooks[file] = {
      source: `https://github.com/${repo}/blob/${commit}/${path}`,
      cells: convertNotebook(notebook),
    };
    console.log(`${file}: ${notebooks[file].cells.length} readable cells`);
  }
  writeFileSync(new URL("../src/data/python-notebooks.json", import.meta.url), JSON.stringify({
    repository: repo,
    commit,
    importedAt: new Date().toISOString(),
    notebooks,
  }, null, 2) + "\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) importNotes();
