import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Resource ID is required." },
      { status: 400 },
    );
  }

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
    .select("paid")
    .eq("id", user.id)
    .single();

  if (!profile?.paid) {
    return NextResponse.json(
      { error: "Paid access required" },
      { status: 403 },
    );
  }

  const admin = createAdminClient();

  const { data: resource, error } = await admin
    .from("vault_resources")
    .select("*")
    .eq("id", id)
    .eq("published", true)
    .single();

  if (error || !resource) {
    return NextResponse.json(
      { error: "Resource not found." },
      { status: 404 },
    );
  }

  if (resource.external_url && !resource.storage_path) {
    return NextResponse.json({
      url: resource.external_url,
      external: true,
    });
  }

  const { data: signed, error: signedError } =
    await admin.storage
      .from("resource-vault")
      .createSignedUrl(resource.storage_path, 60);

  if (signedError || !signed?.signedUrl) {
    return NextResponse.json(
      { error: signedError?.message ?? "Unable to create download." },
      { status: 500 },
    );
  }

  await admin.rpc("increment_resource_download", {
    resource_id: resource.id,
  });

  return NextResponse.json({
    url: signed.signedUrl,
    filename: resource.filename,
    external: false,
  });
}