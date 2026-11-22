export type CareerTopic = { name: string; why: string };
export type CareerPhase = {
  title: string;
  outcome: string;
  topics: CareerTopic[];
  course?: { slug: string; label: string };
};
export type CareerRoadmap = {
  id: "ai" | "devops";
  title: string;
  invitation: string;
  description: string;
  phases: CareerPhase[];
};

export const careerRoadmaps: CareerRoadmap[] = [
  {
    id: "ai",
    title: "AI Engineer",
    invitation: "Want to become an AI engineer?",
    description: "Start with Python, understand how models work, then build, evaluate and deploy useful AI applications.",
    phases: [
      {
        title: "Build your Python foundation",
        outcome: "Write and debug small programs before connecting them to a model.",
        course: { slug: "python-for-ai", label: "Learn Python for AI" },
        topics: [
          { name: "Variables & types", why: "Represent inputs and results clearly." },
          { name: "Strings & collections", why: "Organize prompts, documents and lists of results." },
          { name: "Conditions & loops", why: "Control application decisions and repeated work." },
          { name: "Functions & modules", why: "Break an application into reusable, testable pieces." },
          { name: "Objects & type hints", why: "Describe data and keep larger programs understandable." },
          { name: "Validation & errors", why: "Catch invalid inputs and explain failures instead of hiding them." },
        ],
      },
      {
        title: "Understand and use models",
        outcome: "Know what a language model can do, where it can fail and how to ask it for useful output.",
        course: { slug: "ai-engineering", label: "Explore AI Engineering" },
        topics: [
          { name: "LLM fundamentals", why: "Understand generation, context limits and unreliable answers." },
          { name: "Transformers", why: "Build a mental model of how modern language models process context." },
          { name: "Prompt engineering", why: "Give clear instructions and test whether responses meet the task." },
          { name: "Chatbot", why: "Connect a model to a useful conversation and manage its context." },
          { name: "Evaluation & safety", why: "Test quality and guard against unsafe inputs, output and data exposure." },
        ],
      },
      {
        title: "Ground answers with RAG",
        outcome: "Build an assistant that can retrieve evidence and say when it cannot find an answer.",
        course: { slug: "ai-engineering", label: "Explore AI Engineering" },
        topics: [
          { name: "Data loading", why: "Bring approved source documents into a searchable workflow." },
          { name: "Chunking", why: "Split documents into useful passages that fit retrieval and context limits." },
          { name: "Embeddings", why: "Represent text for semantic similarity search." },
          { name: "Vector store", why: "Index and search embeddings to find relevant passages." },
          { name: "Retrieval", why: "Select evidence before asking the model to answer." },
          { name: "PostgreSQL & persistence", why: "Store application data and, where appropriate, searchable vectors." },
          { name: "RAG project", why: "Test citations, missing evidence and answer quality end to end." },
        ],
      },
      {
        title: "Create agent workflows",
        outcome: "Give an application controlled tools and clear boundaries, then test each decision.",
        topics: [
          { name: "Agents & tools", why: "Let a model choose from explicitly allowed actions for a task." },
          { name: "Web search", why: "Retrieve current information while checking source quality and permissions." },
          { name: "Weather agent", why: "Practise calling a limited external tool and handling errors." },
          { name: "Agentic workflows", why: "Coordinate decisions, tool calls and stopping conditions." },
          { name: "LangGraph", why: "Model multi-step workflows with explicit state and transitions." },
          { name: "Multi-source & agentic RAG", why: "Route questions across sources and evaluate retrieved evidence." },
          { name: "MCP", why: "Connect compatible tools through a standard protocol with explicit permissions." },
          { name: "Kubernetes & Jira tools", why: "Practise integrations using read-only or test environments before real actions." },
        ],
      },
      {
        title: "Ship and show your work",
        outcome: "Package a project, observe its behavior and explain its limitations.",
        course: { slug: "devops-projects", label: "Explore deployment projects" },
        topics: [
          { name: "Cloud basics", why: "Understand where applications run and how usage affects cost." },
          { name: "Docker", why: "Package dependencies so an application can run consistently." },
          { name: "Kubernetes", why: "Learn how containerized services are deployed and operated at scale." },
          { name: "Monitoring & evaluation", why: "Find failures, measure quality and improve safely after release." },
          { name: "Portfolio project", why: "Demonstrate the problem, architecture, tests and tradeoffs you actually built." },
        ],
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    invitation: "Want to become a DevOps engineer?",
    description: "Build strong Linux and cloud foundations, then automate delivery, operate containers and practise troubleshooting.",
    phases: [
      {
        title: "Start with the foundations",
        outcome: "Use a terminal, understand networks and make small automation scripts.",
        topics: [
          { name: "Linux & shell", why: "Operate servers, inspect processes and troubleshoot applications." },
          { name: "Files, users & packages", why: "Manage permissions and software without relying on a graphical interface." },
          { name: "Networking basics", why: "Trace traffic and understand addresses, DNS, ports and protocols." },
          { name: "Shell scripting & Python", why: "Automate repeatable tasks and handle failures consistently." },
          { name: "Git", why: "Track changes, review code and collaborate safely." },
          { name: "Cloud basics", why: "Understand shared responsibility, resource costs and service models." },
        ],
        course: { slug: "python-for-ai", label: "Practise Python" },
      },
      {
        title: "Explore AWS compute and networking",
        outcome: "Build a safe practice environment and understand how traffic reaches a workload.",
        topics: [
          { name: "AWS account & billing", why: "Set budgets and understand costs before creating resources." },
          { name: "EC2, AMIs & instance types", why: "Choose and launch a suitable virtual machine." },
          { name: "Keys & security groups", why: "Control administrative access and restrict network traffic." },
          { name: "VPC & subnets", why: "Separate workloads into planned network boundaries." },
          { name: "Routes, internet & NAT gateways", why: "Understand how public and private subnets communicate." },
          { name: "Bastion or managed access", why: "Reach private systems through a controlled access path." },
          { name: "EBS & snapshots", why: "Provide block storage and plan recovery from data loss." },
          { name: "User data & termination", why: "Bootstrap instances and understand their lifecycle." },
        ],
      },
      {
        title: "Protect and store data",
        outcome: "Choose storage deliberately and grant only the permissions a workload needs.",
        course: { slug: "aws-projects", label: "Explore AWS projects" },
        topics: [
          { name: "IAM users, roles & policies", why: "Apply least privilege to people and workloads." },
          { name: "S3 buckets & objects", why: "Store and retrieve object data without managing a file server." },
          { name: "Versioning & lifecycle", why: "Recover older object versions and manage retention and cost." },
          { name: "Storage classes", why: "Balance access needs, retrieval costs and durability." },
          { name: "EFS", why: "Provide a shared file system when multiple workloads need it." },
          { name: "Lambda & CloudWatch", why: "Run event-driven tasks and inspect logs and metrics." },
        ],
      },
      {
        title: "Automate infrastructure and delivery",
        outcome: "Review changes before deployment and make delivery repeatable.",
        course: { slug: "terraform", label: "Learn Terraform" },
        topics: [
          { name: "CI/CD", why: "Build, test and deliver changes through repeatable steps." },
          { name: "GitHub Actions & Jenkins", why: "Practise pipeline automation and test gates." },
          { name: "Terraform", why: "Describe infrastructure as code and review a plan before applying." },
          { name: "State & approvals", why: "Protect infrastructure state and control who can apply changes." },
          { name: "Docker", why: "Package an application and its dependencies as a portable image." },
        ],
      },
      {
        title: "Operate container platforms",
        outcome: "Deploy services, trace requests and investigate failures in a local cluster.",
        course: { slug: "kubernetes-cka", label: "Learn Kubernetes & CKA" },
        topics: [
          { name: "Kubernetes workloads", why: "Run and manage application containers using declarative resources." },
          { name: "Services & ingress", why: "Route requests to healthy application endpoints." },
          { name: "Storage & access control", why: "Persist data and restrict what workloads and users can do." },
          { name: "Helm", why: "Package and configure reusable Kubernetes applications." },
          { name: "Microservices", why: "Understand service contracts, dependencies and failure boundaries." },
        ],
      },
      {
        title: "Observe, improve and demonstrate",
        outcome: "Practise monitoring, cost review and a safe deployment with a rollback plan.",
        course: { slug: "devops-projects", label: "Explore DevOps projects" },
        topics: [
          { name: "Logs, metrics & alerts", why: "Detect failures and investigate what changed." },
          { name: "Prometheus & Grafana", why: "Collect metrics and build dashboards for operational visibility." },
          { name: "Cost optimization", why: "Review usage and reduce waste without deleting needed resources." },
          { name: "Cloud deployment project", why: "Connect compute, networking, data and delivery in a realistic lab." },
          { name: "Rollback & recovery", why: "Restore service when a release or infrastructure change fails." },
        ],
      },
    ],
  },
];
