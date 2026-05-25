import { redirect } from "next/navigation";

// Fallback: middleware handles locale detection, but this catches any case
// where the next-intl middleware hasn't redirected / to /[locale] yet.
export default function RootPage() {
    redirect("/en");
}
