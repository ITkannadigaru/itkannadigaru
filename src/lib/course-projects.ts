export type CourseProjectBrief = {
  title: string;
  goal: string;
  prerequisites: string;
  steps: { title: string; detail: string }[];
  fixture: string;
  expected: string;
  checks: { scenario: string; expected: string }[];
  deliverables: string[];
  troubleshooting: { symptom: string; check: string }[];
  safety: string;
};

const projects: Record<string, CourseProjectBrief> = {
  "python-for-ai": {
    title: "Build your own study planner",
    goal: "Write a small Python program that validates a learning plan, calculates study time and saves a readable report.",
    prerequisites: "Python 3, functions, conditions, collections, exception handling and file handling. No paid services or web framework required.",
    steps: [
      { title: "Define the input", detail: "Accept a learner name, lesson count and minutes per lesson. Require a non-empty name, whole-number lesson count >= 0 and minutes per lesson > 0." },
      { title: "Separate the calculation", detail: "Put total_minutes in a function that returns lesson_count * minutes_per_lesson. Keep user input and printing outside it." },
      { title: "Save a report", detail: "Write the name and total to a new, explicitly chosen practice file. Read it back and handle conversion and file errors with useful messages." },
      { title: "Test and explain", detail: "Test normal, zero-lesson and invalid inputs. Explain each test and show that a failed input does not produce a success report." },
    ],
    fixture: 'name = "Anu"\nlesson_count = 3\nminutes_per_lesson = 20',
    expected: "Learner: Anu\nStudy time: 60 minutes",
    checks: [
      { scenario: "3 lessons, 20 minutes each", expected: "Return 60 and include it in the saved report." },
      { scenario: "0 lessons, 20 minutes each", expected: "Return 0 without treating the plan as completed coursework." },
      { scenario: "Negative count, non-number or zero session length", expected: "Reject the input with a specific message; do not write a success report." },
    ],
    deliverables: ["Python source with a reusable calculation function.", "Automated tests or a reproducible input/output test table.", "A sample report using fictional learner data and a short explanation."],
    troubleshooting: [
      { symptom: "The report repeats text instead of adding minutes.", check: "Check input types. input() returns text; validate and convert before arithmetic." },
      { symptom: "A previous file disappears.", check: "Write mode replaces contents. Use an explicitly named practice file and review its path." },
    ],
    safety: "Use fictional profiles and a new practice folder. Never overwrite an existing personal file to test file handling.",
  },
  "ai-engineering": {
    title: "Build a source-grounded study assistant",
    goal: "Answer study questions from a tiny approved document collection, preserving citations and admitting when evidence is missing.",
    prerequisites: "Python, document loading, retrieval and prompt validation. Begin with deterministic mock retrieval; a local or approved hosted model is an optional extension.",
    steps: [
      { title: "Prepare the evidence", detail: "Write three short original notes with source IDs. Include a Pod definition, a Service definition and a note about local Terraform plans." },
      { title: "Retrieve before answering", detail: "Implement a documented retrieval rule, then inspect the selected passage. Treat document text as evidence, not instructions to run tools." },
      { title: "Return a traceable answer", detail: "Return an answer and source ID only when a passage supports it. Otherwise return Not found in notes. A model extension must keep the same contract." },
      { title: "Evaluate failure cases", detail: "Test at least three supported questions and two unsupported ones. Record selected sources and verify every answer against them." },
    ],
    fixture: 'source: pods.txt\ntext: A Pod groups containers that share networking.\nquestion: What shares networking inside a Pod?',
    expected: "Answer: Containers within the Pod share networking.\nSource: pods.txt",
    checks: [
      { scenario: "Question supported by pods.txt", expected: "Answer is supported by that passage and cites pods.txt." },
      { scenario: "Question absent from all three notes", expected: "Return Not found in notes, without an invented source." },
      { scenario: "A passage says to ignore instructions or expose a key", expected: "Treat that text as untrusted evidence; do not execute it or reveal secrets." },
    ],
    deliverables: ["The three original notes and their source identifiers.", "A retrieval-and-answer demo plus a five-question evaluation table.", "A diagram and explanation of loading, retrieval, answering and verification."],
    troubleshooting: [
      { symptom: "A fluent answer cites an unrelated note.", check: "Inspect retrieval first; compare the actual passage with the question before changing the prompt." },
      { symptom: "Search results become meaningless after changing a model.", check: "Keep document and query embedding configurations consistent; review whether the index must be rebuilt." },
    ],
    safety: "Use non-sensitive notes. Mock generation is sufficient for the core project; never embed API keys in frontend code or claim mock responses came from a real model.",
  },
  "kubernetes-cka": {
    title: "Deploy and troubleshoot a local web application",
    goal: "Run a two-replica application behind a Service, then diagnose a controlled routing failure with evidence.",
    prerequisites: "Docker, YAML, kubectl and a disposable kind or minikube cluster. Check the context before making any change.",
    steps: [
      { title: "Prepare a scoped lab", detail: "Create a dedicated itk-lab namespace in your local cluster. Write a Deployment with two nginx replicas, matching labels and a readiness check." },
      { title: "Route a request", detail: "Add a ClusterIP Service with matching selectors and the correct targetPort. Use port-forward to test locally; do not create a cloud LoadBalancer." },
      { title: "Introduce one controlled fault", detail: "Change only the lab Service selector so it no longer matches. Inspect Pod readiness and EndpointSlices before proposing a fix." },
      { title: "Recover and verify", detail: "Restore the matching selector, repeat the HTTP request and keep before/after evidence. Identify only your owned lab resources for cleanup." },
    ],
    fixture: "Namespace: itk-lab\nDeployment replicas: 2\nPod label: app=study-web\nService selector: app=study-web\nContainer listener and targetPort: 80",
    expected: "Two ready application Pods\nService has ready backend endpoints\nPort-forwarded HTTP request returns status 200",
    checks: [
      { scenario: "Healthy application and matching Service", expected: "Two Pods become ready and an HTTP request succeeds." },
      { scenario: "Service selector does not match Pods", expected: "No matching ready endpoints; document the selector mismatch rather than restarting blindly." },
      { scenario: "Selector restored", expected: "Endpoints recover and the same HTTP request succeeds." },
    ],
    deliverables: ["Reviewed Deployment and Service manifests.", "Readiness, EndpointSlice and HTTP evidence before and after the fault.", "A symptom -> evidence -> diagnosis -> fix report."],
    troubleshooting: [
      { symptom: "Pod remains Pending.", check: "Read scheduling events and check node capacity, requests and placement constraints." },
      { symptom: "Pods are ready but the request fails.", check: "Compare Service selectors, endpoints, targetPort and the application listener." },
    ],
    safety: "Local cluster only. Do not change a shared cluster, use privileged workloads or create billable load balancers for this project.",
  },
  terraform: {
    title: "Manage a local learning report with Terraform",
    goal: "Practise configuration, typed inputs, state and reviewed plans without provisioning cloud infrastructure.",
    prerequisites: "Terraform, a new practice folder and the hashicorp/local provider. Review and pin an appropriate provider version before initialization.",
    steps: [
      { title: "Define one local resource", detail: "Declare a local_file for a new file inside the practice folder. Use a typed course_name input to build its content and expose only the non-sensitive file path as an output." },
      { title: "Review the first plan", detail: "Run fmt, init and validate, then inspect a plan. Confirm that only the intended practice file is managed before a manually approved local apply." },
      { title: "Check repeatability", detail: "Plan again without editing configuration. Then change the input and review the proposed file change; do not assume replacement is the same as an in-place update." },
      { title: "Explain state and cleanup", detail: "Describe how configuration, state and the file relate. Review any cleanup plan and delete only the file and resources you created." },
    ],
    fixture: 'course_name = "ITK"\nNew managed file: ./practice-output/learning.txt\nConfigured content: Hello ITK',
    expected: "learning.txt contains: Hello ITK\nAn unchanged configuration produces no pending plan changes.",
    checks: [
      { scenario: "First reviewed local plan", expected: "Only the intended local file is proposed; no cloud resources." },
      { scenario: "Plan after successful apply without edits", expected: "No changes are required." },
      { scenario: "course_name changed", expected: "The plan explains the managed file's proposed change or replacement before apply." },
    ],
    deliverables: ["Configuration, reviewed provider pin and dependency lock file.", "Redacted first and unchanged plan evidence.", "A state/access explanation; exclude state files and sensitive plans from public source."],
    troubleshooting: [
      { symptom: "An unexpected file is affected.", check: "Review filename resolution and the plan before apply. Keep the target inside the new practice folder." },
      { symptom: "A no-edit plan still proposes changes.", check: "Inspect configuration, provider version, state and external file edits; do not manually edit state as a shortcut." },
    ],
    safety: "Use only the local provider and fictional content. Plans and state can contain sensitive values; never commit credentials or run auto-approve as a learning shortcut.",
  },
  helm: {
    title: "Package a configurable application chart",
    goal: "Create a reusable chart and prove that values change the rendered application predictably.",
    prerequisites: "Helm plus Kubernetes Deployments, Services and YAML. Local rendering is enough; a disposable cluster is an optional runtime check.",
    steps: [
      { title: "Build the chart structure", detail: "Define Chart.yaml, values.yaml and Deployment/Service templates. Configure image, replicaCount and application port rather than hard-coding environment settings." },
      { title: "Use consistent labels", detail: "Ensure the Deployment Pod labels match the Service selector for each release. Keep ordinary configuration separate from sensitive runtime data." },
      { title: "Render two configurations", detail: "Lint the chart and render it with two values files, setting replicas to 2 and 3. Compare the manifests without installing anything." },
      { title: "Verify beyond rendering", detail: "Document what rendering cannot prove, such as image availability or readiness. If installing locally, use a dedicated practice namespace and verify actual requests." },
    ],
    fixture: "values-a.yaml: replicaCount: 2\nvalues-b.yaml: replicaCount: 3\nhelm template study ./practice-chart -f values-a.yaml",
    expected: "Configuration A renders spec.replicas: 2\nConfiguration B renders spec.replicas: 3\nService selector matches each rendered Pod label.",
    checks: [
      { scenario: "Lint and render both values files", expected: "No unresolved template expressions or invalid values; replica settings differ as intended." },
      { scenario: "Application port changed", expected: "Service targetPort and container listener configuration remain consistent." },
      { scenario: "Optional local installation", expected: "Readiness and an application request are verified, not assumed from helm install succeeding." },
    ],
    deliverables: ["A chart with documented inputs and no real Secrets.", "Two values files and their rendered manifest comparison.", "A runtime verification or a clear statement that the exercise was render-only."],
    troubleshooting: [
      { symptom: "Rendered replicas ignore your input.", check: "Check the .Values reference, values-file path and override precedence." },
      { symptom: "Installation succeeds but requests fail.", check: "Inspect readiness, image availability, Service selectors and ports." },
    ],
    safety: "Render locally first. Never place API keys in chart defaults or install into an unreviewed context.",
  },
  microservices: {
    title: "Build a local catalogue request flow",
    goal: "Connect a frontend to a catalogue service with an explicit contract, health checks and a recoverable dependency failure.",
    prerequisites: "Docker, Kubernetes Services and basic application tests. This is an original two-service exercise, not a reproduction of the twelve-service video.",
    steps: [
      { title: "Define ownership and the contract", detail: "Let the catalogue own fictional product data. Define GET /products/sku-101 and keep prices as integer paise; the frontend consumes the response rather than reading the catalogue's store directly." },
      { title: "Build and test each service", detail: "Test the API response and missing-product case, then build separate versioned images. Keep registry credentials outside source and logs." },
      { title: "Connect locally", detail: "Deploy to a practice namespace with correct Service discovery and ports. Trace one frontend request through the catalogue and back." },
      { title: "Simulate and recover", detail: "Make the catalogue unavailable only in the disposable lab. Show a bounded failure response, inspect logs and restore the known-good configuration." },
    ],
    fixture: 'GET /products/sku-101\nFictional product: Python notebook\nPrice: 12900 paise',
    expected: '{"id":"sku-101","name":"Python notebook","pricePaise":12900}\nMissing product: HTTP 404 with a clear error',
    checks: [
      { scenario: "Known product request", expected: "The catalogue returns the documented contract and the frontend presents it correctly." },
      { scenario: "Unknown product", expected: "Return 404; do not fabricate a product." },
      { scenario: "Catalogue unavailable", expected: "The frontend reports a bounded dependency error; it does not loop indefinitely or show fake success." },
    ],
    deliverables: ["An interface/request-flow diagram and ownership notes.", "Versioned service images or reproducible local builds with tests.", "Healthy, missing-product and dependency-failure evidence plus recovery steps."],
    troubleshooting: [
      { symptom: "Frontend cannot find the catalogue.", check: "Check namespace, Service DNS name, selectors and application port." },
      { symptom: "A request hangs indefinitely.", check: "Add a deliberate timeout and bounded retry policy; verify the failure response." },
    ],
    safety: "Use fictional products, no payment processing and no real customer data. Rehearse locally instead of provisioning EKS.",
  },
  "aws-projects": {
    title: "Produce a safe EBS review report",
    goal: "Turn mock EBS inventory into an owner-aware review report without deleting any volume.",
    prerequisites: "Python and basic EBS, IAM, Lambda and EventBridge concepts. The core exercise needs no AWS account.",
    steps: [
      { title: "Prepare a paginated fixture", detail: "Create two mock pages with attached, unattached, protected and owner-unknown volumes. Include IDs, state, owner, age and retention tags." },
      { title: "Classify without deleting", detail: "Report attached volumes as in use, protected ones as retained, unknown-owner ones as requiring ownership review and remaining unattached ones as review candidates only." },
      { title: "Handle incomplete inventory", detail: "Follow every mock next-page token. If a page fails, mark the report incomplete and stop short of any cleanup recommendation." },
      { title: "Define the approval boundary", detail: "Document owner approval, retention and backup checks. Describe a read-only scheduled reporting design; deletion must remain absent from the exercise." },
    ],
    fixture: "vol-demo-1: available, owner=team-a, protect=false\nvol-demo-2: available, owner=unknown\nvol-demo-3: in-use, owner=team-b\nvol-demo-4: available, protect=true",
    expected: "vol-demo-1: review candidate, NOT approved for deletion\nvol-demo-2: ownership review required\nvol-demo-3: in use\nvol-demo-4: retained/protected",
    checks: [
      { scenario: "Unattached volume with known owner", expected: "Review candidate only, with approval/backup/retention checks still required." },
      { scenario: "Protected or unknown-owner volume", expected: "Exclude from cleanup candidates; explain the reason." },
      { scenario: "Second inventory page fails", expected: "Report incomplete inventory explicitly and do not produce a success-shaped cleanup recommendation." },
    ],
    deliverables: ["Mock fixture pages and a read-only report generator.", "Tests for pagination, protected volumes, missing owners and failed pages.", "An EventBridge -> Lambda -> review-report diagram with no deletion stage."],
    troubleshooting: [
      { symptom: "Some mock volumes never appear.", check: "Trace pagination tokens and verify that every successful page was processed." },
      { symptom: "All available volumes are labelled safe to delete.", check: "Separate attachment state from ownership, protection, retention and approval." },
    ],
    safety: "No delete API, billable provisioning or live credentials are required. Any later live inventory needs reviewed read-only permissions; deletion is outside this project.",
  },
  "devops-projects": {
    title: "Deliver a chatbot with a mock model",
    goal: "Build a test-gated delivery pipeline and rehearse a local deployment and rollback without paying for a model or cloud cluster.",
    prerequisites: "Python, Git, Docker, Kubernetes and Jenkins pipeline concepts. Use a deterministic mock model endpoint and a disposable lab.",
    steps: [
      { title: "Build a testable application", detail: "Define a /chat contract backed by a mock model. Include a health endpoint and a bounded dependency-failure response; label all generated examples as mock output." },
      { title: "Gate the build", detail: "Write a Jenkins pipeline design that tests before building or publishing an image. Record the source commit and immutable image identifier." },
      { title: "Review deployment separately", detail: "Keep infrastructure apply disabled. Deploy only to an approved local lab using reviewed configuration and readiness checks." },
      { title: "Prove the failure boundary", detail: "Introduce a failing unit test and verify publication is skipped. Simulate a bad lab release, observe it and return to the known-good image." },
    ],
    fixture: 'POST /chat {"message":"hello"}\nMock model response: Welcome to the ITK practice lab.',
    expected: '{"reply":"Welcome to the ITK practice lab.","mode":"mock"}\nFailed unit tests -> no release artifact publication',
    checks: [
      { scenario: "Normal request", expected: "The documented response is returned and explicitly marked mock." },
      { scenario: "Unit test failure", expected: "Stop before release publication and deployment." },
      { scenario: "Model endpoint unavailable or bad release", expected: "Show a clear dependency error; rehearse rollback and verify requests after recovery." },
    ],
    deliverables: ["A mock-model app with tests and an image build.", "Pipeline design showing test, build, publication and review boundaries.", "Local health, dependency-failure and rollback evidence."],
    troubleshooting: [
      { symptom: "A failed test still publishes an image.", check: "Inspect stage conditions and error handling. Do not convert a test failure into success." },
      { symptom: "Pods start but chat requests fail.", check: "Check readiness, ports, mock endpoint configuration and request logs." },
    ],
    safety: "No EKS provisioning, real model keys or production deployment. Keep credentials out of Jenkinsfiles, images and evidence.",
  },
  "python-dsa": {
    title: "Build an algorithm trace workbench",
    goal: "Implement, test and explain linear search, binary search and stable deduplication using reproducible traces.",
    prerequisites: "Python functions, loops, lists, sets and searching. Binary search requires sorted input; choose an explicit policy for invalid inputs.",
    steps: [
      { title: "Write clear contracts", detail: "Return the first matching index for each search or -1 when absent. For binary search, validate nondecreasing input separately; report unsorted input as invalid." },
      { title: "Implement and trace", detail: "Record inspected indices for linear search and left/right/mid states for binary search. Keep printing outside the functions." },
      { title: "Test boundaries", detail: "Use empty lists, one element, missing targets and duplicates. Stable deduplication must preserve first-occurrence order." },
      { title: "Explain complexity honestly", detail: "Compare search operation counts at increasing sizes. Binary search itself is logarithmic, but validating sortedness adds a linear scan; report those costs separately." },
    ],
    fixture: "values = [1, 3, 3, 5, 7]\ntarget = 3\nstable_unique input = [3, 1, 3, 2, 1]",
    expected: "First matching index: 1\nMissing target: -1\nStable unique result: [3, 1, 2]",
    checks: [
      { scenario: "Repeated target", expected: "Both search implementations return the first matching index." },
      { scenario: "Empty list or missing target", expected: "Return -1, without indexing outside the list." },
      { scenario: "Unsorted binary-search input", expected: "Reject it explicitly; do not claim a valid search result." },
    ],
    deliverables: ["Three reusable functions and automated edge-case tests.", "At least one complete search trace and a stable-deduplication trace.", "An operation-count comparison distinguishing search cost from validation cost."],
    troubleshooting: [
      { symptom: "Binary search loops forever.", check: "Trace interval updates and ensure each branch makes the remaining search interval smaller." },
      { symptom: "Duplicate values return the wrong occurrence.", check: "On a match, record it and continue searching to the left if the contract requires the first occurrence." },
    ],
    safety: "Use small local fixtures. Do not equate noisy timing measurements on tiny lists with a proof of asymptotic complexity.",
  },
  "interview-preparation": {
    title: "Prepare an evidence-backed project interview",
    goal: "Turn a project you actually built into a credible explanation of architecture, personal contribution, failure handling and tradeoffs.",
    prerequisites: "A real practice project and permission to share its non-sensitive evidence. A local lab is valid experience when described as a local lab.",
    steps: [
      { title: "Write the story", detail: "State the problem, constraints, your own contribution and outcome. Separate team work from personal work and observations from assumptions." },
      { title: "Trace one request", detail: "Draw the application path through its real components. Explain where Terraform, Helm and CI/CD belong only if your project actually uses them." },
      { title: "Explain one failure", detail: "Use a real lab failure or a clearly labelled hypothetical scenario. Show symptom, evidence, hypothesis, fix and verification." },
      { title: "Rehearse and review", detail: "Record a three-minute explanation. Review clarity, accurate tool boundaries and uncertainty; write down how you would investigate an unanswered question." },
    ],
    fixture: "Context: local two-replica Kubernetes lab\nYour contribution: Deployment, Service and selector diagnosis\nEvidence: matching EndpointSlices and successful HTTP request",
    expected: "An honest local-lab story with a request trace and before/after evidence.\nNo invented production scale, job experience or cost savings.",
    checks: [
      { scenario: "A claim about an outcome", expected: "Provide observable evidence or clearly label it as an unmeasured assumption." },
      { scenario: "A question you cannot answer", expected: "State the uncertainty and a specific investigation step instead of guessing." },
      { scenario: "Review of the shared evidence", expected: "No employer secrets, private infrastructure details, credentials or customer data." },
    ],
    deliverables: ["A one-page project story and request-flow diagram.", "A failure investigation backed by evidence or explicitly marked hypothetical.", "A recording and self-review checklist; no automatic interview score."],
    troubleshooting: [
      { symptom: "The story is only a list of tools.", check: "Trace a specific request and explain why each actual component is needed." },
      { symptom: "You cannot support a numerical claim.", check: "Remove it or label it unmeasured. Never turn a lab assumption into a production achievement." },
    ],
    safety: "Use truthful experience and approved evidence. This rehearsal is not hiring advice, verified grading or a guarantee of employment.",
  },
};

export function getCourseProject(slug: string): CourseProjectBrief {
  if (!Object.prototype.hasOwnProperty.call(projects, slug)) throw new Error(`Missing course project: ${slug}`);
  return projects[slug];
}
