import Image from "next/image";
import PasswordOverview from "~/../public/password overview.png";
import NotesOverview from "~/../public/notesoverview.png";
import CreditCardsOverview from "~/../public/creditcardsoverview.png";

const Features = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="w-full max-w-7xl">
        <div className="flex flex-col gap-32 sm:flex-row">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold">Password Manager</h2>
            <p className="mt-8">
              Safeguard your passwords in one secure vault. Generate, store, and
              retrieve your passwords with ease, ensuring only you have access.
            </p>
          </div>
          <Image
            src={PasswordOverview}
            width={600}
            height={400}
            alt="Password Manager Overview"
            unoptimized={true}
          />
        </div>

        <div className="mt-12 flex flex-col gap-32 sm:flex-row">
          <Image
            src={NotesOverview}
            width={600}
            height={400}
            alt="Notes Overview"
            unoptimized={true}
          />
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold">Secure Notes</h2>
            <p className="mt-8">
              Safely store important notes and personal information with robust
              encryption. Your private notes are accessible only by you,
              anytime, anywhere.
            </p>
          </div>
        </div>

        <div className="mb-5 mt-16 flex flex-col gap-32 sm:flex-row">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold">Credit Card Manager</h2>
            <p className="mt-8">
              No more fumbling for your physical card when making online
              purchases. Securely save your credit card details and access them
              quickly and safely when needed.
            </p>
          </div>
          <Image
            src={CreditCardsOverview}
            width={600}
            height={400}
            alt="Credit Card Manager Overview"
            unoptimized={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
