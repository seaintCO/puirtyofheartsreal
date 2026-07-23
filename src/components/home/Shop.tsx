import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { shopProducts } from "@/data/shop-products";

export default function Shop() {
  return (
    <section className="bg-white px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a6b31]">
              Purity Luma · Coming soon
            </p>
            <h2 className="mt-6 max-w-3xl text-[clamp(2.8rem,6vw,5.2rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-[#111]">
              Light, thoughtfully designed.
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#84652e] transition hover:text-black"
          >
            Preview the collection <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {shopProducts.map((product) => (
            <Link
              href="/shop"
              key={product.slug}
              className="group"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#f5f5f7]">
                <Image
                  src={product.image}
                  alt={`${product.name} product concept`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.035]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#745a2c] backdrop-blur-xl">
                  Coming soon
                </span>
              </div>
              <div className="px-1 pt-5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#a88643]">
                  {product.eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
                  {product.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
