export const learningPaths = [
  {
    id: "ai", title: "AI Engineering", prerequisites: "Start with basic computer skills. Learn Python before using model libraries; use approved, non-sensitive practice documents.",
    stages: [
      { name: "Python foundations", slug: "python-for-ai", detail: "Learn variables, collections, functions and validation.", milestone: "Build and test a small study-planner program.", project: false },
      { name: "Understand AI & retrieval", slug: "ai-engineering", detail: "Follow AI fundamentals, prompts, documents, embeddings and retrieval in lesson order.", milestone: "Explain how an answer is grounded in retrieved evidence.", project: false },
      { name: "Build a study assistant", slug: "ai-engineering", detail: "Use the final project to connect retrieval, citations and an explicit not-found response.", milestone: "Demonstrate supported answers and missing-evidence cases.", project: true },
      { name: "Explain your work", slug: "interview-preparation", detail: "Practise describing your contribution, architecture, tradeoffs and failures honestly.", milestone: "Present a real project with reproducible evidence.", project: false },
    ],
  },
  {
    id: "devops", title: "DevOps & Kubernetes", prerequisites: "Review Linux shell, basic networking, Git and YAML first. Use disposable local containers and a practice cluster, not production.",
    stages: [
      { name: "Containers & Kubernetes", slug: "kubernetes-cka", detail: "Begin with Docker, then learn workloads, networking, storage and troubleshooting.", milestone: "Trace a request from a Service to a ready Pod.", project: false },
      { name: "Package applications", slug: "helm", detail: "Turn reviewed Kubernetes manifests into configurable charts.", milestone: "Lint and render a chart with two different values files.", project: false },
      { name: "Connect services", slug: "microservices", detail: "Map interfaces, build versioned images and rehearse dependency failures.", milestone: "Demonstrate a local two-service request and recovery.", project: false },
      { name: "Verify delivery", slug: "devops-projects", detail: "Build a mock-model chatbot pipeline with test gates and a local rollback plan.", milestone: "Show that failed tests block publication and bad releases can be rolled back.", project: true },
    ],
  },
  {
    id: "cloud", title: "Cloud & Infrastructure", prerequisites: "Review AWS IAM, EBS, Lambda, EventBridge and cloud networking separately before the AWS project. These playlists are not a complete AWS-foundations course.",
    stages: [
      { name: "Automation with Python", slug: "python-for-ai", detail: "Practise functions, files, exceptions and structured data before writing automation.", milestone: "Read a fixture and report an invalid record clearly.", project: false },
      { name: "Read-only AWS reporting", slug: "aws-projects", detail: "Explore unused-resource inventory with mock data and deletion disabled.", milestone: "Explain why unattached storage is not automatically safe to delete.", project: false },
      { name: "Infrastructure as code", slug: "terraform", detail: "Learn configuration, providers, state and plan review; start with local resources.", milestone: "Review a plan and prove an unchanged local configuration has no pending changes.", project: true },
      { name: "Review infrastructure delivery", slug: "devops-projects", detail: "Study how validation and plans enter a pipeline before an approved apply.", milestone: "Document permissions, state protection, costs and the approval boundary.", project: false },
    ],
  },
  {
    id: "interview", title: "Python & Interview Readiness", prerequisites: "Use Python basics first and bring a project you actually built. Practice results are self-reviewed, not a hiring guarantee.",
    stages: [
      { name: "Write readable Python", slug: "python-for-ai", detail: "Use clear functions, data structures and validation.", milestone: "Explain an input, a transformation and a returned result.", project: false },
      { name: "Trace algorithms", slug: "python-dsa", detail: "Practise loops, two pointers, searching and complexity with explicit edge cases.", milestone: "Compare a correct baseline with an optimized solution.", project: false },
      { name: "Build a problem-solving portfolio", slug: "python-dsa", detail: "Complete the algorithm workbench project with tests and operation-count comparisons.", milestone: "Explain correctness and complexity using your own examples.", project: true },
      { name: "Rehearse with evidence", slug: "interview-preparation", detail: "Prepare a project story, request trace and failure investigation.", milestone: "Separate personal contributions, measurements and uncertainties.", project: true },
    ],
  },
];
