import Features from "./Features/Features";
import Hero from "./Hero/Hero";

const Home = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Hero />
      <Features />
    </div>
  );
};

export default Home;
