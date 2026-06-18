"use client";

import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef, useState } from "react";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import AnimateIn from "@/components/ui/AnimateIn";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

type FormData = {
    name: string;
    email: string;
    type: string;
    message: string;
    company?: string;
    cfTurnstileResponse?: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
    const t = useTranslations("contact");
    const locale = useLocale();
    const [status, setStatus] = useState<Status>("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [turnstileToken, setTurnstileToken] = useState("");
    const turnstileRef = useRef<TurnstileInstance>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(
            z.object({
                name: z.string().min(1, t("validation.name_required")),
                email: z.string().min(1, t("validation.email_required")).email(t("validation.email_invalid")),
                type: z.string().min(1, t("validation.type_required")),
                message: z.string().min(20, t("validation.message_min")),
                company: z.string().max(0).optional(),
            })
        ),
        defaultValues: { company: "" },
    });

    async function onSubmit(data: FormData) {
        setStatus("loading");
        setErrorMsg("");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, locale, cfTurnstileResponse: turnstileToken }),
            });
            if (!res.ok) throw new Error("server error");
            setStatus("success");
            reset();
            turnstileRef.current?.reset();
            setTurnstileToken("");
        } catch {
            setStatus("error");
            setErrorMsg(t("form.error"));
            turnstileRef.current?.reset();
            setTurnstileToken("");
        }
    }

    const inputBase =
        "w-full bg-surface border border-[var(--border)] rounded-[var(--radius-sm)] px-4 py-3 text-sm text-text placeholder:text-faint transition-all duration-200 focus:outline-none focus:border-accent focus:ring-2 focus:ring-[var(--accent-glow)]";
    const labelBase = "block text-sm font-medium text-muted mb-1.5";
    const errorClass = "mt-1.5 text-xs text-error";
    const errorProps = { role: "alert" as const, "aria-live": "polite" as const };

    if (status === "success") {
        return (
            <AnimateIn>
                <div className="card-dark p-10 text-center">
                    <div className="w-12 h-12 rounded-full bg-success/10 border border-success/20 flex items-center justify-center mx-auto mb-5">
                        <Icon name="check-success" size={20} className="text-success" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-2">{t("form.success_title")}</h3>
                    <p className="text-muted text-sm">{t("form.success_body")}</p>
                    <button
                        onClick={() => setStatus("idle")}
                        className="mt-6 text-xs text-accent-light hover:text-accent-dim transition-colors underline focus-ring rounded"
                    >
                        {t("form.send_another")}
                    </button>
                </div>
            </AnimateIn>
        );
    }

    return (
        <form onSubmit={(e) => { void handleSubmit(onSubmit)(e); }} noValidate className="space-y-5">
            {/* Honeypot — hidden from real users, bots will fill it. */}
            <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] w-px h-px overflow-hidden">
                <label htmlFor="company">Company</label>
                <input
                    id="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("company")}
                />
            </div>

            {/* Name */}
            <div>
                <label htmlFor="name" className={labelBase}>{t("form.name")}</label>
                <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder={t("form.name_placeholder")}
                    className={`${inputBase} ${errors.name ? "border-error" : ""}`}
                    {...register("name")}
                />
                {errors.name && <p className={errorClass} {...errorProps}>{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
                <label htmlFor="email" className={labelBase}>{t("form.email")}</label>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={t("form.email_placeholder")}
                    className={`${inputBase} ${errors.email ? "border-error" : ""}`}
                    {...register("email")}
                />
                {errors.email && <p className={errorClass} {...errorProps}>{errors.email.message}</p>}
            </div>

            {/* Type */}
            <div>
                <label htmlFor="type" className={labelBase}>{t("form.type")}</label>
                <select
                    id="type"
                    className={`${inputBase} cursor-pointer ${errors.type ? "border-error" : ""}`}
                    {...register("type")}
                >
                    <option value="" disabled>{t("form.type_placeholder")}</option>
                    <option value="app">{t("form.type_app")}</option>
                    <option value="web">{t("form.type_web")}</option>
                    <option value="consulting">{t("form.type_consulting")}</option>
                    <option value="other">{t("form.type_other")}</option>
                </select>
                {errors.type && <p className={errorClass} {...errorProps}>{errors.type.message}</p>}
            </div>

            {/* Message */}
            <div>
                <label htmlFor="message" className={labelBase}>{t("form.message")}</label>
                <textarea
                    id="message"
                    rows={5}
                    placeholder={t("form.message_placeholder")}
                    className={`${inputBase} resize-none ${errors.message ? "border-error" : ""}`}
                    {...register("message")}
                />
                {errors.message && <p className={errorClass} {...errorProps}>{errors.message.message}</p>}
            </div>

            {status === "error" && (
                <p
                    role="alert"
                    aria-live="assertive"
                    className="text-sm text-error bg-error/8 border border-error/20 rounded-[var(--radius-sm)] px-4 py-3"
                >
                    {errorMsg}
                </p>
            )}

            {TURNSTILE_SITE_KEY && (
                <Turnstile
                    ref={turnstileRef}
                    siteKey={TURNSTILE_SITE_KEY}
                    onSuccess={setTurnstileToken}
                    onExpire={() => setTurnstileToken("")}
                    onError={() => setTurnstileToken("")}
                    options={{ theme: "dark", size: "normal" }}
                />
            )}

            <Button
                as="button"
                type="submit"
                size="lg"
                className="w-full justify-center"
                loading={status === "loading"}
                disabled={TURNSTILE_SITE_KEY !== "" && turnstileToken === ""}
            >
                {status === "loading" ? t("form.sending") : t("form.submit")}
            </Button>
        </form>
    );
}
