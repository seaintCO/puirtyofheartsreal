// Keep existing course enrollment links working with the unified subscription checkout.
import { redirect } from "next/navigation";
export default function EnrollPage() { redirect("/membership"); }
