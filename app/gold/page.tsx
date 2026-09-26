import { redirect } from "next/navigation";

export default function GoldPage() {
  redirect("/dashboard?tab=gold");
}
