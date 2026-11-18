import { test } from "node:test";
import assert from "node:assert/strict";
import { hasAnalyticsConsent } from "../src/hooks/useConsent.ts";
const values = new Map();
globalThis.window = {
    localStorage: { getItem: (key) => values.get(key) ?? null },
};
test("current consent rejects missing, revoked and malformed data without reviving old acceptance", () => {
    assert.equal(hasAnalyticsConsent(), false);
    values.set("cojauny-studio-consent", "accepted");
    assert.equal(hasAnalyticsConsent(), true);
    values.delete("cojauny-studio-consent");
    assert.equal(hasAnalyticsConsent(), false);
    values.set("cojauny-studio-consent", "accepted");
    assert.equal(hasAnalyticsConsent(), true);
    values.set("cojauny-studio-consent", "{invalid}");
    assert.equal(hasAnalyticsConsent(), false);
    values.set("cojauny-studio-consent", "rejected");
    assert.equal(hasAnalyticsConsent(), false);
});
test("unreadable storage grants no initial consent or resurrected invalid decision", () => {
    window.localStorage.getItem = () => {
        throw new Error("Storage denied");
    };
    assert.equal(hasAnalyticsConsent(), false);
});
