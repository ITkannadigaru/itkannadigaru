import playlists from "@/data/playlists.json";

function dayNumber(title: string) {
  const match = title.match(/\bday[\s-]*(\d+)/i);
  if (!match) throw new Error(`Missing CKA day number: ${title}`);
  return Number(match[1]);
}

export const catalog = [
  { slug: "ai-engineering", title: "AI Engineering", desc: "Explore AI fundamentals, LLMs and modern applications.", label: "AI & GEN AI", ...playlists["ai-engineering"] },
  { slug: "kubernetes-cka", title: "Kubernetes & CKA", desc: "Learn Kubernetes from the ground up in Kannada.", label: "DEVOPS", ...playlists["kubernetes-cka"], videos: [...playlists["kubernetes-cka"].videos].sort((a, b) => dayNumber(a.title) - dayNumber(b.title)) },
  { slug: "terraform", title: "Terraform Zero to Hero", desc: "Build your infrastructure-as-code foundation.", label: "CLOUD", ...playlists.terraform },
  { slug: "helm", title: "Helm Charts", desc: "Learn to package and deploy Kubernetes applications.", label: "DEVOPS", ...playlists.helm },
  { slug: "microservices", title: "MicroService-Ecommerce", desc: "Explore a microservices deployment with Kubernetes and GitOps.", label: "PROJECT", ...playlists.microservices },
  { slug: "aws-projects", title: "AWS Projects", desc: "Explore practical AWS automation and cost optimization.", label: "CLOUD", ...playlists["aws-projects"] },
  { slug: "devops-projects", title: "DevOps Projects", desc: "Explore the DevOps project video series.", label: "PROJECT", ...playlists["devops-projects"] },
  { slug: "python-dsa", title: "Python + DSA", desc: "Explore the Python and data structures playlist.", label: "PYTHON", ...playlists["python-dsa"] },
  { slug: "interview-preparation", title: "Interview Preparation", desc: "Browse the interview preparation playlist.", label: "CAREER", ...playlists["interview-preparation"] },
];
