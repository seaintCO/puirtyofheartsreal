import Image from "next/image";
import { FlaskConical, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WaitlistForm from "@/components/shop/WaitlistForm";
import { shopProducts } from "@/data/shop-products";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#f6efe7]">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-20 pt-24 sm:pt-32">
        <div className="absolute left-1/2 top-[-10%] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-[#d9b964]/18 blur-[150px]" />
        <div className="relative mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#9b7939]/15 bg-white/55 px-4 py-2 text-xs font-medium text-[#8b6d33] backdrop-blur-xl">
            <Sparkles size={14} />
            Product concepts · launching soon
          </div>
          <h1 className="mx-auto mt-7 max-w-4xl font-serif text-6xl leading-[0.98] tracking-tight text-[#1f1f1f] sm:text-8xl">
            The future of your
            <span className="block italic text-[#a88643]">wellness ritual.</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#1f1f1f]/55">
            Purity Luma is an upcoming collection of refined red-light wellness
            concepts for face, neck, and at-home routines. Join the list to hear
            when product details and availability are confirmed.
          </p>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-7xl space-y-8">
          {shopProducts.map((product, index) => (
            <article
              key={product.slug}
              className="grid overflow-hidden rounded-[2.4rem] border border-white/75 bg-white/55 shadow-[0_30px_100px_rgba(63,43,15,.09)] backdrop-blur-2xl lg:grid-cols-2"
            >
              <div
                className={`relative min-h-[380px] overflow-hidden lg:min-h-[620px] ${
                  index % 2 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={product.image}
                  alt={`${product.name} product concept`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 hover:scale-[1.025]"
                />
                <div className="absolute left-5 top-5 rounded-full border border-white/45 bg-white/65 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#745a2c] backdrop-blur-xl">
                  Coming soon
                </div>
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a88643]">
                  {product.eyebrow}
                </p>
                <h2 className="mt-5 font-serif text-4xl tracking-tight text-[#1f1f1f] sm:text-6xl">
                  {product.name}
                </h2>
                <p className="mt-5 max-w-lg text-base leading-7 text-[#1f1f1f]/55">
                  {product.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  <span className="rounded-full border border-[#1f1f1f]/10 bg-white/60 px-4 py-2 text-xs text-[#1f1f1f]/55">
                    {product.category}
                  </span>
                  <span className="rounded-full border border-[#1f1f1f]/10 bg-white/60 px-4 py-2 text-xs text-[#1f1f1f]/55">
                    Product concept
                  </span>
                </div>
                <div className="mt-9 max-w-lg">
                  <WaitlistForm productSlug={product.slug} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#1f1f1f]/7 bg-white/35 px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {[
            [
              FlaskConical,
              "Details before claims",
              "Specifications, testing, pricing, and final product claims will be published only when confirmed.",
            ],
            [
              ShieldCheck,
              "Wellness, not treatment",
              "These concepts are not presented as medical devices and are not intended to diagnose or treat disease.",
            ],
            [
              Sparkles,
              "Early access",
              "Waitlist members will be first to receive launch details and availability updates.",
            ],
          ].map(([Icon, title, text]: any) => (
            <article
              key={title}
              className="rounded-[1.8rem] border border-white/70 bg-white/55 p-7 backdrop-blur-xl"
            >
              <Icon size={22} className="text-[#a88643]" />
              <h3 className="mt-5 text-lg font-medium">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#1f1f1f]/48">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
