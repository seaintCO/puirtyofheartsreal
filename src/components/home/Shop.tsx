import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { shopProducts } from "@/data/shop-products";

export default function Shop() {
  return (
    <section className="bg-[#f5eee5] px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b7939]">
              Purity Luma · Coming soon
            </p>
            <h2 className="mt-5 max-w-3xl font-serif text-5xl leading-[1.02] tracking-tight text-[#1f1f1f] sm:text-6xl">
              Wellness technology,
              <span className="italic text-[#a88643]"> beautifully considered.</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1f1f1f] px-6 py-3.5 text-sm font-medium text-white"
          >
            Preview the collection <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {shopProducts.map((product) => (
            <Link
              href="/shop"
              key={product.slug}
              className="group overflow-hidden rounded-[2rem] border border-white/75 bg-white/55 shadow-[0_24px_80px_rgba(70,45,10,.08)] backdrop-blur-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={product.image}
                  alt={`${product.name} product concept`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />
                <span className="absolute left-4 top-4 rounded-full border border-white/50 bg-white/65 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#745a2c] backdrop-blur-xl">
                  Coming soon
                </span>
              </div>
              <div className="p-6">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#a88643]">
                  {product.eyebrow}
                </p>
                <h3 className="mt-3 font-serif text-2xl">{product.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

