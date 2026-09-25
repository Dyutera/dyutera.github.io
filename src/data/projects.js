// These are illustrative portfolio placeholders, not delivered products or client work.
// Add category: 'client-project' only for real, approved client work.
// Only add githubUrl with an explicitly shareable public repository.
export const projectFilters = [
  { id: "all", label: "All projects" },
  { id: "our-project", label: "Our projects" },
  { id: "client-project", label: "Client projects" },
];
export const projects = [
  {
    id: "orbit",
    title: "Orbit",
    subtitle: "A clearer view of your business.",
    category: "our-project",
    type: "Business dashboard",
    status: "Illustrative concept",
    preview: "dashboard",
    image: "/images/orbit.svg",
    screenshots: ["/images/orbit.svg"],
    description:
      "A concept dashboard that brings business activity, insights, and everyday decisions into one clear view.",
    problem:
      "Business information can be scattered across tools, making it difficult to see priorities at a glance.",
    solution:
      "This illustrative concept explores a unified workspace with focused analytics, activity summaries, and simple navigation. It demonstrates a possible product direction, not a completed application.",
    features: [
      "At-a-glance analytics",
      "Activity overview",
      "Responsive workspace",
    ],
    technologies: ["React", "Node.js", "PostgreSQL"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    id: "forma",
    title: "Forma",
    subtitle: "Good design. A better shopping experience.",
    category: "our-project",
    type: "E-commerce experience",
    status: "Illustrative concept",
    preview: "store",
    image: "/images/forma.svg",
    screenshots: ["/images/forma.svg"],
    description:
      "A considered storefront concept with thoughtful product discovery and an uncomplicated shopping experience.",
    problem:
      "Cluttered storefronts can distract from products and make it hard for shoppers to find the right fit.",
    solution:
      "This placeholder explores a calm, product-led layout, clear categories, and accessible shopping interactions. It is a visual concept, not a functioning store or client delivery.",
    features: [
      "Product discovery",
      "Collection browsing",
      "Mobile-first design",
    ],
    technologies: ["React", "Tailwind CSS", "Spring Boot"],
    demoUrl: "",
    githubUrl: "",
  },
  {
    id: "flow",
    title: "Flow AI",
    subtitle: "Less busywork. More possibility.",
    category: "our-project",
    type: "AI & workflow automation",
    status: "Illustrative concept",
    preview: "automation",
    image: "/images/flow.svg",
    screenshots: ["/images/flow.svg"],
    description:
      "An automation workspace concept connecting everyday tools through simple, intelligent workflows.",
    problem:
      "Repetitive tasks across disconnected applications take attention away from more meaningful work.",
    solution:
      "This illustrative concept explores a visual workflow builder with clear triggers, AI steps, and human review. No live integrations or production AI capabilities are claimed.",
    features: [
      "Visual workflow design",
      "AI-assisted task steps",
      "Human review checkpoints",
    ],
    technologies: ["React", "Python", "AI integration"],
    demoUrl: "",
    githubUrl: "",
  },
];
