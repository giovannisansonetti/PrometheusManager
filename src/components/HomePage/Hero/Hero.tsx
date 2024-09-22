import { Button } from "@nextui-org/react";
import CardComponent from "~/components/Cards/Card";

const Hero = () => {
  return (
    <div className="py-20 text-center text-white sm:py-32">
      <h1 className="mb-6 text-3xl font-extrabold sm:text-5xl">
        Welcome to Prometheus Manager
      </h1>
      <p className="mx-auto mb-12 max-w-xl text-lg font-light sm:max-w-2xl sm:text-xl">
        Securely manage your passwords, notes, and credit cards with our
        open-source and user-friendly solution.
      </p>

      <div className="mt-8">
        <Button color="primary" size="lg" className="">
          Get Started
        </Button>
        <Button
          variant="bordered"
          color="primary"
          size="lg"
          className="ml-4 text-lg font-medium"
        >
          Dashboard
        </Button>
      </div>

      <div className="mt-16 grid w-full max-w-6xl grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
        <CardComponent
          header="Password manager"
          content="Generate, save and retrieve your passwords securely"
        />
        <CardComponent
          header="Secure notes"
          content="Encrypt and store private and important notes safely, accessible only by you"
        />
        <CardComponent
          header="Credit Card"
          content="Securely store your credit card details with encryption for fast and safe access."
        />
      </div>
    </div>
  );
};

export default Hero;
