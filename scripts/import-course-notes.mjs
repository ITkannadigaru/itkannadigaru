import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { convertNotebook } from "./import-python-notes.mjs";

const sources = [
  {
    id: "ai",
    repository: "ManojKRISHNAPPA/ITK-FREE-GENAI-SERIES-NOTES",
    files: [
      "DAY-01/DAY-1-AI-ML-DL-GENAI-kannadaversion.md",
      "DAY-02/DAY-2-HOW-LLM-WORKS.md",
      "DAY-03/DAY-3-TRANSFORMERS-BASIC.md",
      "DAY-03/ENCODER-DECODER.md",
      "DAY-05/1.openai.ipynb", "DAY-05/2.ollama.ipynb",
      "DAY-07/01-foundations.md", "DAY-07/02-basic-techniques.md", "DAY-07/03-chain-of-thought.md",
      "DAY-08/04-role-prompting.md", "DAY-08/05-output-formatting.md", "DAY-08/06-advanced-techniques.md",
      "DAY-09/notes copy.ipynb", "DAY-10/notes.ipynb", "DAY-11/notes.ipynb",
      "DAY-12/pdf-handling.ipynb", "DAY-13/notes.ipynb", "DAY-14/emmbedings.ipynb",
      "DAY-15/notes.ipynb", "DAY-16/Notes.ipynb", "DAY-17/NOTES.ipynb",
      "DAY-18/NOTES.ipynb", "DAY-19/notes.ipynb", "DAY-20/Notes.md",
      "DAY-21/NLP_and_TF_IDF_Beginner_Notes.md", "DAY-22/NOTES.ipynb", "DAY-23/Notes.md",
      "DAY-24/notes.ipynb", "DAY-25/Notes.Ipynb", "DAY-26/notes.ipynb",
      "DAY-27/NOTES.IPYNB", "DAY-28/Notes.ipynb", "InterviewPrep.md",
    ],
  },
  {
    id: "cka",
    repository: "ManojKRISHNAPPA/ITkannadigaru-CKA-2026-Certification",
    files: [
      "01-Docker-Core/README.md",
      "03-workloads-scheduling/01-complete-pod.md",
      "03-workloads-scheduling/02-labels-and-selectors.md",
      "03-workloads-scheduling/03-replicaset.md",
      "03-workloads-scheduling/04-deployments.md",
      "03-workloads-scheduling/05-multicontainer-pods.md",
      "03-workloads-scheduling/06-nodeselector.md",
      "03-workloads-scheduling/07-node-affinity.md",
      "03-workloads-scheduling/08-daemonset.md",
      "03-workloads-scheduling/09-requests-and-limits.md",
      "03-workloads-scheduling/10-priority-class.md",
      "04-Service-and-Networking/01-Complete-service-Guide.md",
      "04-Service-and-Networking/02-ingress.md",
      "04-Service-and-Networking/03-namespaces.md",
      "04-Service-and-Networking/04-service-accounts.md",
      "04-Service-and-Networking/06-hpa.md",
      "04-Service-and-Networking/07-vpa.md",
      "04-Service-and-Networking/08-gateway-api.md",
      "04-Service-and-Networking/09-probes.md",
      "04-Service-and-Networking/10-configmap-and-secrets.md",
      "05-Security/01-tls-ssl-management.md",
      "05-Security/02-authentication-and-authorization.md",
      "05-Security/04-rbac.md",
      "05-Security/05-clusterrole-clusterrolebinding.md",
      "06-Storage/01-storage-complete-guide.md",
      "07-Cluster-Architecture/01-cluster-architecture-installation-configuration.md",
      "07-Cluster-Architecture/02-kubernetes-1.35-cluster-from-scratch.md",
      "10-Troubleshooting/01-troubleshooting-application-failure.md",
      "eks-clsture-creation.md", "microservices-architecture.md",
    ],
  },
  {
    id: "terraform",
    repository: "ManojKRISHNAPPA/Terraform-Zero-Hero-Series-ITkannadigaru",
    files: [
      "01-first-resource/main.tf", "02-s3-bucket/main.tf", "03-ec2-basic/main.tf",
      "04-ec2-part-2/main.tf", "05-Count/main.tf", "06-VPC/main.tf",
      "07-Project-01/main.tf", "08-project-2/main.tf", "terraform-scripts/notes.md",
    ],
  },
  {
    id: "aws",
    repository: "ManojKRISHNAPPA/ITKannadigaru-AWS-project-Series",
    files: ["01-Cloud-Cost-optimisation/cost-optimisation.md", "Notes.md"],
  },
];

const documents = [];
for (const { id, repository, files } of sources) {
  const commit = JSON.parse(execFileSync("gh", ["api", `repos/${repository}/commits/HEAD`], { encoding: "utf8" })).sha;
  for (const file of files) {
    const encodedPath = file.split("/").map(encodeURIComponent).join("/");
    let response = JSON.parse(execFileSync("gh", ["api", `repos/${repository}/contents/${encodedPath}?ref=${commit}`], {
      encoding: "utf8", maxBuffer: 20 * 1024 * 1024,
    }));
    if (response.encoding === "none" && response.sha) {
      response = JSON.parse(execFileSync("gh", ["api", `repos/${repository}/git/blobs/${response.sha}`], {
        encoding: "utf8", maxBuffer: 20 * 1024 * 1024,
      }));
    }
    if (response.encoding !== "base64" || !response.content) throw new Error(`Missing source content: ${file}`);
    const content = Buffer.from(response.content, "base64").toString("utf8");
    const cells = /\.ipynb$/i.test(file) ? convertNotebook(JSON.parse(content)) : [
      { type: /\.md$/i.test(file) ? "markdown" : "code", content, output: "" },
    ];
    documents.push({
      id: `${id}:${file}`, title: file, repository, commit,
      source: `https://github.com/${repository}/blob/${commit}/${encodedPath}`,
      cells,
    });
    console.log(`${id}/${file}: ${cells.length} cells`);
  }
}
writeFileSync(new URL("../src/data/course-notes.json", import.meta.url), JSON.stringify({
  importedAt: new Date().toISOString(), documents,
}, null, 2) + "\n");
