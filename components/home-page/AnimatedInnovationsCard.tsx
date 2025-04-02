import { AnimatedInnovations } from "@/components/ui/animated-innovations";

export function AnimatedInnovationsCard() {
  const innovations = [
    {
      "quote": "The AI-powered automation tool has revolutionized how we handle repetitive tasks. Our efficiency has skyrocketed.",
      "name": "John Carter",
      "designation": "Founder at InnovateX",
      "src": "/innovation-1.jpg",
    },
    {
      "quote": "Integrating our system with this no-code development platform was seamless. Now, launching new features is faster than ever.",
      "name": "Sophia Lee",
      "designation": "Product Manager at BuildFast",
      "src": "/innovation-2.jpg",
    },
    {
      "quote": "The machine learning insights provided by this tool have given us a huge competitive edge. We can now predict trends with accuracy.",
      "name": "Daniel Martins",
      "designation": "Lead Data Scientist at TrendAI",
      "src": "/innovation-3.jpg",
    },
    {
      "quote": "With real-time collaboration and cloud storage, our team can work from anywhere without delays or disruptions.",
      "name": "Elena Vasquez",
      "designation": "CTO at RemoteSync",
      "src": "/innovation-4.jpg",
    },
    {
      "quote": "The innovation dashboard provides real-time analytics, helping us make data-driven decisions faster than ever.",
      "name": "Michael O'Neill",
      "designation": "CEO at FutureVision",
      "src": "/innovation-5.jpg",
    },
  ];
  return <AnimatedInnovations innovations={innovations} />;
}
