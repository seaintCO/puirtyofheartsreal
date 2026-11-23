"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AuraMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-aura-reveal]"));

    if (!reduce && "IntersectionObserver" in window) {
      document.documentElement.classList.add("aura-motion-ready");
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("aura-in");
            observer.unobserve(entry.target);
          });
        },
        { threshold: .08, rootMargin: "0px 0px -30px 0px" },
      );
      items.forEach(item => observer.observe(item));

      const magnets = Array.from(document.querySelectorAll<HTMLElement>("[data-aura-magnet]"));
      const cleanups: Array<() => void> = [];
      magnets.forEach(el => {
        const move = (event: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = event.clientX - rect.left - rect.width / 2;
          const y = event.clientY - rect.top - rect.height / 2;
          el.style.transform = "translate(" + (x * .08) + "px," + (y * .10) + "px)";
        };
        const leave = () => { el.style.transform = ""; };
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
        });
      });

      return () => {
        observer.disconnect();
        cleanups.forEach(fn => fn());
        document.documentElement.classList.remove("aura-motion-ready");
      };
    }

    items.forEach(item => item.classList.add("aura-in"));
  }, [pathname]);

  return null;
}
