"use client";

import { FormEvent, useState } from "react";
import {
  CheckCircle2,
  FileUp,
  Link2,
  LoaderCircle,
} from "lucide-react";

const categories = [
  "Business",
  "Startups",
  "Finance",
  "Marketing",
  "Strategy",
  "Leadership",
  "Operations",
  "Templates",
];

const types = [
  "video",
  "pdf",
  "template",
  "worksheet",
  "tool",
  "replay",
];

export default function ResourceUploader() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploading(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.set(
      "featured",
      formData.get("featured") ? "true" : "false",
    );

    try {
      const response = await fetch("/api/resources/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Upload failed.");
      }

      setMessage("Resource uploaded successfully.");
      form.reset();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Upload failed.",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
    >
      <div className="mb-7">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
          Admin Resource Manager
        </p>

        <h2 className="mt-3 text-2xl font-semibold">
          Add Resource
        </h2>

        <p className="mt-2 text-sm text-white/40">
          Upload a protected file or add an external YouTube link.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="title"
          required
          placeholder="Resource title"
          className="rounded-2xl border border-white/10 bg-[#181818] px-5 py-4 text-sm text-white outline-none focus:border-[#C9A75D]"
        />

        <select
          name="category"
          className="rounded-2xl border border-white/10 bg-[#181818] px-5 py-4 text-sm text-white outline-none"
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>

        <select
          name="resourceType"
          className="rounded-2xl border border-white/10 bg-[#181818] px-5 py-4 text-sm text-white outline-none"
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          name="duration"
          placeholder="Duration, such as 12:30"
          className="rounded-2xl border border-white/10 bg-[#181818] px-5 py-4 text-sm text-white outline-none focus:border-[#C9A75D]"
        />
      </div>

      <textarea
        name="description"
        placeholder="Resource description"
        className="mt-4 min-h-28 w-full resize-none rounded-2xl border border-white/10 bg-[#181818] px-5 py-4 text-sm text-white outline-none focus:border-[#C9A75D]"
      />

      <div className="mt-4 rounded-2xl border border-white/10 bg-[#181818] p-5">
        <div className="flex items-center gap-2">
          <FileUp className="text-[#C9A75D]" size={19} />
          <p className="text-sm font-medium">Upload protected file</p>
        </div>

        <input
          type="file"
          name="file"
          accept=".pdf,.zip,.docx,.xlsx,.png,.jpg,.jpeg"
          className="mt-4 block w-full text-sm text-white/55 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-5 file:py-2.5 file:text-sm file:font-medium file:text-[#111]"
        />
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-[#181818] p-5">
        <div className="flex items-center gap-2">
          <Link2 className="text-[#C9A75D]" size={19} />
          <p className="text-sm font-medium">
            Or add an external video URL
          </p>
        </div>

        <input
          name="externalUrl"
          type="url"
          placeholder="https://youtu.be/..."
          className="mt-4 w-full rounded-2xl border border-white/10 bg-[#111] px-5 py-4 text-sm text-white outline-none focus:border-[#C9A75D]"
        />
      </div>

      <label className="mt-5 flex items-center gap-3 text-sm text-white/55">
        <input name="featured" type="checkbox" />
        Feature this resource
      </label>

      <button
        disabled={uploading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#C9A75D] px-7 py-4 text-sm font-medium text-white disabled:opacity-50"
      >
        {uploading ? (
          <LoaderCircle className="animate-spin" size={18} />
        ) : (
          <FileUp size={18} />
        )}

        {uploading ? "Uploading..." : "Add to Resource Vault"}
      </button>

      {message && (
        <div className="mt-5 flex items-center gap-2 rounded-2xl bg-white/[0.05] p-4 text-sm text-white/65">
          <CheckCircle2 className="text-[#C9A75D]" size={17} />
          {message}
        </div>
      )}
    </form>
  );
}