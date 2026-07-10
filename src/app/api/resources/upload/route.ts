import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

function cleanFilename(filename: string) {
  return filename
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 },
      );
    }

    const formData = await request.formData();

    const title = String(formData.get("title") ?? "").trim();
    const description = String(
      formData.get("description") ?? "",
    ).trim();
    const category = String(
      formData.get("category") ?? "Business",
    ).trim();
    const resourceType = String(
      formData.get("resourceType") ?? "pdf",
    ).trim();
    const externalUrl = String(
      formData.get("externalUrl") ?? "",
    ).trim();
    const duration = String(
      formData.get("duration") ?? "",
    ).trim();
    const featured =
      String(formData.get("featured") ?? "false") === "true";
    const file = formData.get("file");

    if (!title) {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 },
      );
    }

    if (
      (!file || !(file instanceof File) || file.size === 0) &&
      !externalUrl
    ) {
      return NextResponse.json(
        { error: "Add either a file or an external video URL." },
        { status: 400 },
      );
    }

    if (file instanceof File && file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Maximum file size is 50 MB." },
        { status: 400 },
      );
    }

    const admin = createAdminClient();

    let storagePath: string | null = null;
    let filename: string | null = null;
    let mimeType: string | null = null;
    let fileSize: number | null = null;

    if (file instanceof File && file.size > 0) {
      filename = cleanFilename(file.name);
      mimeType = file.type || "application/octet-stream";
      fileSize = file.size;

      storagePath =
        `${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}/` +
        `${crypto.randomUUID()}-${filename}`;

      const bytes = Buffer.from(await file.arrayBuffer());

      const { error: uploadError } = await admin.storage
        .from("resource-vault")
        .upload(storagePath, bytes, {
          contentType: mimeType,
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }
    }

    const { data, error } = await admin
      .from("vault_resources")
      .insert({
        title,
        description,
        category,
        resource_type: resourceType,
        storage_path: storagePath,
        external_url: externalUrl || null,
        filename,
        mime_type: mimeType,
        file_size: fileSize,
        duration: duration || null,
        featured,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) {
      if (storagePath) {
        await admin.storage
          .from("resource-vault")
          .remove([storagePath]);
      }

      throw error;
    }

    return NextResponse.json({
      resource: data,
    });
  } catch (error) {
    console.error("Resource upload error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to upload resource.",
      },
      { status: 500 },
    );
  }
}