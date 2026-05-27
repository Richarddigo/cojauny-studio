"use client";

import { useEffect, useMemo } from "react";

/**
 * Creates a dedicated DOM element appended to <body> for portaling modal content.
 * Allows toggling `inert` on body siblings without affecting the modal itself.
 */
export function useMenuPortal(id = "__menu_portal") {
    const portalEl = useMemo(() => {
        if (typeof document === "undefined") {
            return null;
        }

        const el = document.createElement("div");
        el.setAttribute("id", id);
        return el;
    }, [id]);

    useEffect(() => {
        if (!portalEl || typeof document === "undefined") {
            return;
        }

        document.body.appendChild(portalEl);

        return () => {
            if (portalEl.parentElement) {
                portalEl.parentElement.removeChild(portalEl);
            }
        };
    }, [portalEl]);

    return portalEl;
}
