export const NAVIGATION_CONTRACT = {
    headerDesktopHeightPx: 70,
    headerMobileHeightPx: 68,
    mobileMenuPanelWidthPx: 202,
    menuButtonPaddingPx: 8,
    menuButtonRadiusPx: 20,
    overlayBlurPx: 2,
    scrollbarWidthPx: 6,
    scrollbarThumbColorRgb: "rgb(42, 53, 80)",
    bodyOverflowAfterClose: "hidden auto",
} as const;

export const MOBILE_MENU_TELEMETRY_EVENT = "eco:mobile-menu";

export type MobileMenuTelemetryAction = "open" | "close";

export type MobileMenuTelemetryReason =
    | "open-button"
    | "close-button"
    | "overlay"
    | "escape"
    | "nav-link"
    | "swipe";

export interface MobileMenuTelemetryDetail {
    action: MobileMenuTelemetryAction;
    reason: MobileMenuTelemetryReason;
    timestamp: number;
}

export function emitMobileMenuTelemetry(
    action: MobileMenuTelemetryAction,
    reason: MobileMenuTelemetryReason,
): void {
    if (typeof window === "undefined") {
        return;
    }

    const detail: MobileMenuTelemetryDetail = {
        action,
        reason,
        timestamp: Date.now(),
    };

    window.dispatchEvent(
        new CustomEvent<MobileMenuTelemetryDetail>(MOBILE_MENU_TELEMETRY_EVENT, {
            detail,
        }),
    );
}
