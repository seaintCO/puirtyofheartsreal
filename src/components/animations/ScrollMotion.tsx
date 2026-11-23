"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = document.querySelectorAll<HTMLElement>(".ph-site [data-ph-animate]");
    if (!elements.length) return;
    document.documentElement.classList.add("ph-motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("ph-animate-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );

    for (const element of elements) observer.observe(element);
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("ph-motion-ready");
    };
  }, [pathname]);

  return null;
}
