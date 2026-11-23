import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function AuraPhotoBand({
  image,
  alt,
  eyebrow,
  title,
  body,
  href,
  linkLabel,
  reverse = false,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  reverse?: boolean;
}) {
  return (
    <section className={"aura-photo-band" + (reverse ? " reverse" : "")} data-aura-reveal>
      <div className="aura-photo-frame">
        <img src={image} alt={alt} loading="lazy" />
        <div className="aura-photo-vignette" aria-hidden="true"/>
        <span className="aura-photo-index">PURPOSE · PEOPLE · PRACTICE</span>
      </div>
      <div className="aura-photo-copy">
        <span className="aura-outline-pill">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{body}</p>
        <Link href={href} className="aura-photo-link">{linkLabel}<ArrowUpRight size={15}/></Link>
      </div>
    </section>
  );
}
