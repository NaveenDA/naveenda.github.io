import type { Metadata } from "next";
import BackHome from "@/components/back-home";
import AntSimulation from "./ant-simulation";

export const metadata: Metadata = {
  title: "Ant Colony Simulation - Rust + WebAssembly",
  description:
    "Thousands of ants finding the shortest path to food through pheromone trails, simulated in Rust and compiled to WebAssembly for zero-copy, high-performance rendering in the browser.",
  openGraph: {
    title: "Ant Colony Simulation - Rust + WebAssembly",
    description:
      "Watch an emergent shortest-path algorithm unfold as thousands of ants lay and follow pheromone trails, powered by a Rust/WASM simulation core.",
    url: "https://naveenda.github.io/games/ant-colony",
    images: [
      {
        url: "https://naveenda.github.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ant Colony Simulation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ant Colony Simulation - Rust + WebAssembly",
    description:
      "Watch an emergent shortest-path algorithm unfold as thousands of ants lay and follow pheromone trails, powered by a Rust/WASM simulation core.",
  },
  keywords: [
    "Ant Colony Optimization",
    "Rust",
    "WebAssembly",
    "WASM",
    "Emergent Behavior",
    "Pheromone Trail",
    "Swarm Intelligence",
    "Simulation",
    "Canvas",
    "Interactive Demo",
  ],
};

const AntColonyPage = () => {
  return (
    <>
      <BackHome />
      <AntSimulation />
    </>
  );
};

export default AntColonyPage;
