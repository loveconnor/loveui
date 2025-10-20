import { Sections } from "./components/blocks";
import { CallToAction } from "./components/call-to-action";
import { Features } from "./components/components";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { Snippets } from "./components/patterns";
import { BaseComponents } from "./components/primitives";

const Home = () => (
  <div className="mt-[var(--fd-nav-height)] grid w-full gap-16 p-4 sm:gap-24">
    <Hero />
    <BaseComponents />
    <Features />
    <Sections />
    <Snippets />
    <CallToAction />
    <Footer />
  </div>
);

export default Home;
