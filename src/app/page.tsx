import { redirect } from "next/navigation";

// Redirect root "/" to the default locale.
// next-intl middleware handles locale detection, but this is a fallback.
export default function RootPage() {
  redirect("/en");
}
