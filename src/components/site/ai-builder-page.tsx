import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { BriefBuilder } from "@/components/site/brief-builder";
import { Container } from "@/components/primitives/layout";
import { Badge, Rule } from "@/components/primitives/surface";
import { buildPhases, type PlanningLanguage } from "@/registry/site-planning";

const copy = {
  en: {
    eyebrow: "AI SITE WORKFLOW",
    title: "Give the agent a system, not a vague request.",
    body: "Turn a business brief into a sitemap, visual direction, block recipe and quality contract. The result points directly to installable Premium Kit resources.",
    phases: ["Brief", "Sitemap", "Direction", "Skeleton", "Build", "Review"],
    phaseBody: [
      "Define the business, audience, proof and one primary outcome.",
      "Decide which pages exist and what job each page performs.",
      "Choose typography, density, image treatment and motion as one system.",
      "Start from a proven section order, then adapt it to the content.",
      "Install owned source from the registry and write concrete copy.",
      "Check accessibility, responsive behaviour, SEO and performance.",
    ],
    resourcesTitle: "Files an agent can understand",
    resourcesBody:
      "The same system is published as plain JSON and Markdown. An AI can discover the library without scraping the visual catalogue.",
    resources: [
      { href: "/r/ai-manifest.json", label: "AI manifest", detail: "Workflow, themes, quality gates and endpoints" },
      { href: "/r/catalog.json", label: "Metadata v2", detail: "Use cases, cautions, rendering cost and compatibility" },
      { href: "/r/site-recipes.json", label: "Site recipes", detail: "All skeletons with ordered registry blocks" },
      { href: "/r/registry.json", label: "Component registry", detail: "Installable blocks, dependencies and source" },
      { href: "/r/AI-GUIDE.md", label: "AI guide", detail: "Portable human-readable build contract" },
      { href: "/r/SITE-BRIEF.md", label: "Brief template", detail: "Questions to answer before design begins" },
    ],
  },
  tr: {
    eyebrow: "AI SİTE AKIŞI",
    title: "Yapay zekâya belirsiz bir istek değil, çalışan bir sistem ver.",
    body: "İş brief’ini site haritasına, görsel yöne, blok reçetesine ve kalite sözleşmesine dönüştür. Üretilen komut doğrudan kurulabilir Premium Kit kaynaklarını gösterir.",
    phases: ["Brief", "Site haritası", "Görsel yön", "İskelet", "Uygulama", "Kontrol"],
    phaseBody: [
      "İşi, hedef kitleyi, gerçek kanıtları ve tek ana hedefi tanımla.",
      "Hangi sayfaların bulunacağını ve her sayfanın görevini belirle.",
      "Tipografi, yoğunluk, görsel kullanımı ve hareketi tek sistem olarak seç.",
      "Kanıtlanmış bölüm sırasından başla, içeriğe göre bilinçli biçimde uyarla.",
      "Registry’den sahip olunan kaynak kodu kur ve somut metinler yaz.",
      "Erişilebilirlik, responsive davranış, SEO ve performansı denetle.",
    ],
    resourcesTitle: "Yapay zekânın anlayabileceği dosyalar",
    resourcesBody:
      "Aynı sistem düz JSON ve Markdown olarak da yayınlanır. AI, görsel kataloğu taramadan bütün kütüphaneyi keşfedebilir.",
    resources: [
      { href: "/r/ai-manifest.json", label: "AI manifesti", detail: "Akış, temalar, kalite kapıları ve uçlar" },
      { href: "/r/catalog.json", label: "Metadata v2", detail: "Kullanım, kaçınma, render maliyeti ve uyumluluk" },
      { href: "/r/site-recipes.json", label: "Site reçeteleri", detail: "Sıralı registry bloklarıyla bütün iskeletler" },
      { href: "/r/registry.json", label: "Bileşen registry’si", detail: "Kurulabilir bloklar, bağımlılıklar ve kaynak" },
      { href: "/r/AI-GUIDE.tr.md", label: "Türkçe AI rehberi", detail: "Taşınabilir, okunabilir yapım sözleşmesi" },
      { href: "/r/SITE-BRIEF.tr.md", label: "Türkçe brief şablonu", detail: "Tasarımdan önce cevaplanacak sorular" },
    ],
  },
} as const;

export function AiBuilderPage({ language }: { language: PlanningLanguage }) {
  const text = copy[language];

  return (
    <main lang={language} className="py-20 md:py-28">
      <Container>
        <header className="max-w-4xl">
          <Badge>{text.eyebrow}</Badge>
          <h1 className="mt-6 display-1 max-w-[17ch] text-balance">{text.title}</h1>
          <p className="measure mt-6 text-lg leading-relaxed text-muted">{text.body}</p>
        </header>

        <ol className="mt-12 grid border-y border-line md:grid-cols-3 xl:grid-cols-6">
          {buildPhases.map((phase, index) => (
            <li
              key={phase}
              className="border-b border-line p-4 last:border-b-0 md:border-b md:[&:nth-last-child(-n+3)]:border-b-0 md:[&:not(:nth-child(3n))]:border-r xl:border-b-0 xl:[&:not(:last-child)]:border-r"
            >
              <span className="font-mono text-xs text-faint">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-3 text-sm font-medium">{text.phases[index]}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">{text.phaseBody[index]}</p>
            </li>
          ))}
        </ol>

        <section className="mt-16" aria-label={language === "tr" ? "Site brief oluşturucu" : "Site brief builder"}>
          <BriefBuilder language={language} />
        </section>

        <Rule className="mt-20" />

        <section className="mt-16 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="font-mono text-xs text-accent">MACHINE READABLE</p>
            <h2 className="mt-3 display-2 max-w-[14ch]">{text.resourcesTitle}</h2>
            <p className="measure mt-4 text-[0.9375rem] leading-relaxed text-muted">
              {text.resourcesBody}
            </p>
          </div>

          <ul className="divide-y divide-line border-y border-line">
            {text.resources.map((resource) => (
              <li key={resource.href}>
                <Link
                  href={resource.href}
                  className="group grid gap-2 py-5 transition-colors hover:text-accent sm:grid-cols-[0.7fr_1.3fr_auto] sm:items-center"
                >
                  <span className="font-medium">{resource.label}</span>
                  <span className="text-sm text-muted">{resource.detail}</span>
                  <ArrowUpRight
                    size={16}
                    weight="bold"
                    aria-hidden
                    className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </main>
  );
}
