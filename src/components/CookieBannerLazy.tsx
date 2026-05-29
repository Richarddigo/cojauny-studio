"use client";

import dynamic from "next/dynamic";

// Deferred client-only mount: removes CookieBanner hydration cost from the
// critical path. The banner only appears after hydration when consent is unknown.
const CookieBanner = dynamic(() => import("./CookieBanner"), {
    ssr: false,
    loading: () => null,
});

export default function CookieBannerLazy() {
    return <CookieBanner />;
}
