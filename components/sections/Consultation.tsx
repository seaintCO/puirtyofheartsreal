import PremiumButton from "../PremiumButton";

export default function Consultation() {
  return (
    <section id="consultation" className="bg-white py-24 lg:py-40">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">Let's Build Something That Lasts.</h2>
        <p className="mx-auto mt-6 max-w-xl text-base font-light leading-7 text-neutral-500">
          For partnerships, advisory, acquisitions, or strategic opportunities, connect with .
        </p>

        <div className="mt-10">
          <PremiumButton href="mailto:contact@seaint.com">Request Availability</PremiumButton>
        </div>
      </div>
    </section>
  );
}



