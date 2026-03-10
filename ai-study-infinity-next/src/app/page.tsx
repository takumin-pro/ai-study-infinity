import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import Comparison from "./components/Comparison";
import Flow from "./components/Flow";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Solution />
      <Comparison />
      <Flow />
      <FAQ />
      <Contact />
    </main>
  );
}
