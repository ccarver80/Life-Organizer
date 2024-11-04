// importing necessary functions

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  // Check session from auth.ts and direct to dashboard if loged in
  if (session?.user) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
