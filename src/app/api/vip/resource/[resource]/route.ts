import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const resources = {
  playbook: {
    file: "the-playbook-overview.pptx",
    name: "The Playbook Overview.pptx",
    type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
  coach: {
    file: "how-to-be-a-great-coach.pdf",
    name: "How to Be a Great Coach Guide.pdf",
    type: "application/pdf",
  },
} as const;

export async function GET(_: Request, { params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  const entry = resources[resource as keyof typeof resources];
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, vip_access")
    .eq("id", user.id)
    .single();
  if (!profile || (!profile.vip_access && profile.role !== "admin")) {
    return NextResponse.json({ error: "VIP access required" }, { status: 403 });
  }

  const filePath = path.join(process.cwd(), "src", "private-assets", entry.file);
  const buffer = await readFile(filePath);
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": entry.type,
      "Content-Disposition": `attachment; filename="${entry.name}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
