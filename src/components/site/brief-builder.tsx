"use client";

import { useMemo, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";
import {
  buildSitePrompt,
  siteTypeOptions,
  visualDirectionOptions,
  type PlanningLanguage,
  type SiteBriefInput,
} from "@/registry/site-planning";

const initialBrief: SiteBriefInput = {
  projectName: "",
  summary: "",
  audience: "",
  siteType: "saas-launch",
  primaryGoal: "",
  visualDirection: "obsidian",
  motion: "medium",
  pages: "",
};

const inputClass =
  "w-full rounded-pk-sm border border-strong bg-elevated px-3.5 py-2.5 text-[0.9375rem] text-fg transition-colors placeholder:text-faint hover:border-fg";

export function BriefBuilder({ language }: { language: PlanningLanguage }) {
  const tr = language === "tr";
  const [brief, setBrief] = useState(initialBrief);
  const [copied, setCopied] = useState(false);
  const prompt = useMemo(() => buildSitePrompt(brief, language), [brief, language]);

  function update<K extends keyof SiteBriefInput>(key: K, value: SiteBriefInput[K]) {
    setBrief((current) => ({ ...current, [key]: value }));
    setCopied(false);
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid overflow-hidden rounded-pk border border-line bg-elevated lg:grid-cols-[0.78fr_1.22fr]">
      <form className="grid content-start gap-5 border-b border-line p-5 md:p-7 lg:border-b-0 lg:border-r">
        <div>
          <p className="font-mono text-xs text-accent">{tr ? "01 / BRIEF" : "01 / BRIEF"}</p>
          <h2 className="mt-2 display-3">{tr ? "Projeyi tanımla" : "Define the project"}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {tr
              ? "Kritik bağlamı gir; sistem seçilen iskelet ve temayla AI komutunu kurar."
              : "Add the critical context; the system combines it with a proven skeleton and theme."}
          </p>
        </div>

        <label className="grid gap-2 text-sm font-medium" htmlFor="brief-project">
          {tr ? "Proje adı" : "Project name"}
          <input
            id="brief-project"
            className={inputClass}
            value={brief.projectName}
            onChange={(event) => update("projectName", event.target.value)}
            placeholder={tr ? "Örn. Kuzey Diş Kliniği" : "e.g. North Dental Clinic"}
          />
        </label>

        <label className="grid gap-2 text-sm font-medium" htmlFor="brief-summary">
          {tr ? "İşletme veya ürün" : "Business or product"}
          <textarea
            id="brief-summary"
            className={`${inputClass} min-h-24 resize-y leading-relaxed`}
            value={brief.summary}
            onChange={(event) => update("summary", event.target.value)}
            placeholder={
              tr
                ? "Ne sunuyor, neden farklı ve hangi güven kanıtları var?"
                : "What does it offer, why is it different and what proof exists?"
            }
          />
        </label>

        <label className="grid gap-2 text-sm font-medium" htmlFor="brief-audience">
          {tr ? "Hedef kitle" : "Audience"}
          <input
            id="brief-audience"
            className={inputClass}
            value={brief.audience}
            onChange={(event) => update("audience", event.target.value)}
            placeholder={tr ? "Kim, hangi ihtiyacıyla geliyor?" : "Who arrives, and with what need?"}
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium" htmlFor="brief-type">
            {tr ? "Site türü" : "Site type"}
            <select
              id="brief-type"
              className={inputClass}
              value={brief.siteType}
              onChange={(event) => update("siteType", event.target.value)}
            >
              {siteTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {tr ? option.labelTr : option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium" htmlFor="brief-theme">
            {tr ? "Görsel yön" : "Visual direction"}
            <select
              id="brief-theme"
              className={inputClass}
              value={brief.visualDirection}
              onChange={(event) => update("visualDirection", event.target.value)}
            >
              {visualDirectionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="grid gap-2 text-sm font-medium" htmlFor="brief-goal">
          {tr ? "Ana hedef" : "Primary outcome"}
          <input
            id="brief-goal"
            className={inputClass}
            value={brief.primaryGoal}
            onChange={(event) => update("primaryGoal", event.target.value)}
            placeholder={tr ? "Örn. randevu talebi" : "e.g. appointment request"}
          />
        </label>

        <label className="grid gap-2 text-sm font-medium" htmlFor="brief-pages">
          {tr ? "Gerekli sayfalar" : "Required pages"}
          <input
            id="brief-pages"
            className={inputClass}
            value={brief.pages}
            onChange={(event) => update("pages", event.target.value)}
            placeholder={tr ? "Ana sayfa, hizmetler, ekip, iletişim" : "Home, services, team, contact"}
          />
        </label>

        <label className="grid gap-2 text-sm font-medium" htmlFor="brief-motion">
          {tr ? "Hareket seviyesi" : "Motion level"}
          <select
            id="brief-motion"
            className={inputClass}
            value={brief.motion}
            onChange={(event) => update("motion", event.target.value as SiteBriefInput["motion"])}
          >
            <option value="low">{tr ? "Düşük — sakin ve işlevsel" : "Low — calm and functional"}</option>
            <option value="medium">{tr ? "Orta — kontrollü vurgu" : "Medium — controlled emphasis"}</option>
            <option value="high">{tr ? "Yüksek — markaya bağlı hareket" : "High — brand-led motion"}</option>
          </select>
        </label>
      </form>

      <section className="flex min-w-0 flex-col bg-subtle p-5 md:p-7" aria-labelledby="prompt-title">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-accent">02 / AI PROMPT</p>
            <h2 id="prompt-title" className="mt-2 display-3">
              {tr ? "Üretime hazır komut" : "Production-ready prompt"}
            </h2>
          </div>
          <button
            type="button"
            onClick={copyPrompt}
            className="inline-flex h-10 items-center gap-2 rounded-pk-sm border border-strong bg-elevated px-3.5 text-sm font-medium transition-colors hover:border-fg"
          >
            {copied ? <Check size={16} weight="bold" aria-hidden /> : <Copy size={16} aria-hidden />}
            {copied ? (tr ? "Kopyalandı" : "Copied") : tr ? "Komutu kopyala" : "Copy prompt"}
          </button>
        </div>

        <textarea
          readOnly
          value={prompt}
          aria-label={tr ? "Oluşturulan AI komutu" : "Generated AI prompt"}
          className="mt-5 min-h-[46rem] w-full flex-1 resize-y rounded-pk-sm border border-line bg-bg p-4 font-mono text-xs leading-6 text-fg"
        />

        <p className="mt-4 text-sm leading-relaxed text-muted">
          {tr
            ? "Bunu Codex, Claude, Cursor veya registry okuyabilen başka bir kodlama aracına verebilirsin."
            : "Give this to Codex, Claude, Cursor or another coding agent that can read the registry."}
        </p>
      </section>
    </div>
  );
}
