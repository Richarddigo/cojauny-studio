"use client";
import { useSyncExternalStore } from "react";

type ConsentState = "unknown" | "accepted" | "rejected";
const STORAGE_KEY = "cojauny-studio-consent";
const CHANGE_EVENT = "cojauny-studio:consent";
let tabConsent: ConsentState = "unknown";
let failedWriteOverride: ConsentState | null = null;
function snapshot(): ConsentState {
    if (failedWriteOverride !== null) return failedWriteOverride;
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        const current =
            stored === "accepted" || stored === "rejected" ? stored : "unknown";
        // A readable absent/invalid decision retires any older volatile choice.
        tabConsent = current;
        return current;
    } catch {
        // Only an actual storage exception permits this tab's explicit/observed choice.
        return tabConsent;
    }
}
function subscribe(notify: () => void) {
    const changed = (event: StorageEvent) => {
        if (event.key === STORAGE_KEY || event.key === null) {
            tabConsent = "unknown";
            failedWriteOverride = null;
            notify();
        }
    };
    window.addEventListener("storage", changed);
    window.addEventListener(CHANGE_EVENT, notify);
    return () => {
        window.removeEventListener("storage", changed);
        window.removeEventListener(CHANGE_EVENT, notify);
    };
}
function choose(value: ConsentState) {
    tabConsent = value;
    try {
        if (value === "unknown") window.localStorage.removeItem(STORAGE_KEY);
        else window.localStorage.setItem(STORAGE_KEY, value);
        failedWriteOverride = null;
    } catch {
        // Readable stale storage must never undo a failed revocation/write.
        failedWriteOverride = value;
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
}
export function hasAnalyticsConsent() {
    return typeof window !== "undefined" && snapshot() === "accepted";
}
const serverSnapshot = (): ConsentState => "unknown";
export function useConsent() {
    const consent = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
    return {
        consent,
        accept: () => choose("accepted"),
        reject: () => choose("rejected"),
        reset: () => choose("unknown"),
    };
}
