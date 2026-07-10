"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Download,
  ExternalLink,
  FileText,
  LoaderCircle,
  PlayCircle,
  Search,
  Star,
} from "lucide-react";

type Resource = {
  id: string;
  title: string;
  description: string;
  category: string;
  resource_type: string;
  storage_path: string | null;
  external_url: string | null;
  filename: string | null;
  duration: string | null;
  featured: boolean;
  download_count: number;
};

function getEmbedUrl(url: string | null) {
  if (!url) return "";

  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.replace("/", "");

      return id
        ? `https://www.youtube.com/embed/${id}`
        : "";
    }

    if (
      parsed.hostname.includes("youtube.com") &&
      parsed.pathname.includes("/embed/")
    ) {
      return url;
    }

    const id = parsed.searchParams.get("v");

    return id
      ? `https://www.youtube.com/embed/${id}`
      : "";
  } catch {
    return "";
  }
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedVideo, setSelectedVideo] =
    useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadResources() {
      const response = await fetch("/api/resources", {
        cache: "no-store",
      });

      const result = await response.json();

      if (response.ok) {
        setResources(result.resources ?? []);
      }

      setLoading(false);
    }

    loadResources();
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(resources.map((resource) => resource.category)),
      ),
    ];
  }, [resources]);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();

    return resources.filter((resource) => {
      const matchesCategory =
        category === "All" || resource.category === category;

      const matchesQuery =
        !normalized ||
        resource.title.toLowerCase().includes(normalized) ||
        resource.description.toLowerCase().includes(normalized) ||
        resource.category.toLowerCase().includes(normalized);

      return matchesCategory && matchesQuery;
    });
  }, [category, query, resources]);

  async function openResource(resource: Resource) {
    if (
      resource.resource_type === "video" ||
      resource.resource_type === "replay"
    ) {
      setSelectedVideo(resource);
      return;
    }

    setDownloading(resource.id);

    const response = await fetch(
      `/api/resources/download?id=${resource.id}`,
    );

    const result = await response.json();

    if (response.ok && result.url) {
      window.open(result.url, "_blank", "noopener,noreferrer");
    }

    setDownloading(null);
  }

  return (
    <section>
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
          Bonus Learning Library
        </span>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Resource Vault
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/45">
          Protected videos, PDFs, templates, worksheets, and business
          tools. These resources are separate from the official course.
        </p>
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
        <Search size={18} className="text-white/30" />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search resources..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
        />
      </div>

      <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium ${
              category === item
                ? "bg-[#C9A75D] text-[#111]"
                : "border border-white/10 bg-white/[0.04] text-white/55"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex min-h-64 items-center justify-center">
          <LoaderCircle
            className="animate-spin text-[#C9A75D]"
            size={34}
          />
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((resource) => (
            <article
              key={resource.id}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-[#C9A75D]/30"
            >
              <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-[#292929] to-[#151515] text-[#C9A75D]">
                {resource.featured && (
                  <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-[#C9A75D] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#111]">
                    <Star size={11} fill="currentColor" />
                    Featured
                  </span>
                )}

                {resource.resource_type === "video" ||
                resource.resource_type === "replay" ? (
                  <PlayCircle size={46} />
                ) : (
                  <FileText size={46} />
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                    {resource.category}
                  </p>

                  {resource.duration && (
                    <p className="text-xs text-white/35">
                      {resource.duration}
                    </p>
                  )}
                </div>

                <h2 className="mt-3 text-xl font-semibold">
                  {resource.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-white/45">
                  {resource.description}
                </p>

                <button
                  onClick={() => openResource(resource)}
                  disabled={downloading === resource.id}
                  className="mt-6 flex items-center gap-2 rounded-full bg-[#C9A75D] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
                >
                  {downloading === resource.id ? (
                    <LoaderCircle
                      className="animate-spin"
                      size={16}
                    />
                  ) : resource.resource_type === "video" ||
                    resource.resource_type === "replay" ? (
                    <PlayCircle size={16} />
                  ) : (
                    <Download size={16} />
                  )}

                  {resource.resource_type === "video" ||
                  resource.resource_type === "replay"
                    ? "Watch Resource"
                    : "Download Resource"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-5 backdrop-blur"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="w-full max-w-5xl rounded-[2rem] border border-white/10 bg-[#151515] p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="aspect-video overflow-hidden rounded-[1.5rem] bg-black">
              <iframe
                src={getEmbedUrl(selectedVideo.external_url)}
                title={selectedVideo.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
                  Resource Vault
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  {selectedVideo.title}
                </h2>
              </div>

              <div className="flex gap-3">
                <a
                  href={selectedVideo.external_url ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/60"
                >
                  <ExternalLink size={15} />
                  YouTube
                </a>

                <button
                  onClick={() => setSelectedVideo(null)}
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#111]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}