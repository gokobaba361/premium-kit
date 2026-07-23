import { presets } from "@/design/presets";
import { skeletons } from "@/registry/skeletons";
import { registry } from "@/registry/registry";

export type PlanningLanguage = "en" | "tr";

export type SiteBriefInput = {
  projectName: string;
  summary: string;
  audience: string;
  siteType: string;
  primaryGoal: string;
  visualDirection: string;
  motion: "low" | "medium" | "high";
  pages: string;
};

const siteTypeTranslations: Record<string, { name: string; audience: string }> = {
  "saas-launch": { name: "SaaS lansmanı", audience: "Yazılım ürünleri" },
  "product-story": { name: "Ürün hikâyesi", audience: "Ticaret ve tasarım ürünleri" },
  "studio-portfolio": { name: "Stüdyo portfolyosu", audience: "Ajanslar ve bağımsız stüdyolar" },
  "service-business": { name: "Hizmet işletmesi", audience: "Klinikler, danışmanlar ve yerel hizmetler" },
  publication: { name: "Yayın", audience: "Bloglar, araştırma ve editoryal markalar" },
  "company-profile": { name: "Şirket profili", audience: "Kurumsal ve kurumsal ölçekli siteler" },
  "commerce-store": { name: "E-ticaret mağazası", audience: "Ürün koleksiyonları ve DTC markaları" },
  "application-dashboard": { name: "Uygulama paneli", audience: "SaaS ürünleri ve iç araçlar" },
  "documentation-hub": { name: "Dokümantasyon merkezi", audience: "Geliştirici araçları ve ürün kılavuzları" },
  "event-conference": { name: "Etkinlik ve konferans", audience: "Konferanslar, festivaller ve buluşmalar" },
};

export const siteTypeOptions = skeletons.map((skeleton) => ({
  value: skeleton.slug,
  label: skeleton.name,
  labelTr: siteTypeTranslations[skeleton.slug]?.name ?? skeleton.name,
  audience: skeleton.audience,
  audienceTr: siteTypeTranslations[skeleton.slug]?.audience ?? skeleton.audience,
  outcome: skeleton.outcome,
}));

export const visualDirectionOptions = presets.map((preset) => ({
  value: preset.id,
  label: preset.name,
  description: preset.read,
  sectors: preset.sectors,
  motion: preset.motion,
  density: preset.density,
}));

export const qualityGates = [
  "Use semantic HTML and familiar interaction patterns.",
  "Meet WCAG AA contrast and support keyboard navigation.",
  "Respect prefers-reduced-motion and keep essential content reachable without animation.",
  "Prefer Server Components; add client JavaScript only for necessary interaction.",
  "Design mobile-first and verify narrow, medium and wide layouts.",
  "Use real content structure; never invent customer logos, metrics or testimonials.",
  "Provide loading, empty, error and success states for every data-driven flow.",
  "Add page-specific metadata and the appropriate structured data type.",
  "Keep all colours, type, spacing, radii and motion tied to the selected design tokens.",
] as const;

export const qualityGatesTr = [
  "Semantik HTML ve kullanıcıların bildiği etkileşim kalıplarını kullan.",
  "WCAG AA kontrastını ve klavye navigasyonunu sağla.",
  "Azaltılmış hareket tercihini destekle; temel içeriği animasyona bağlama.",
  "Server Component yaklaşımını koru; yalnız gerekli etkileşim için istemci JavaScript’i ekle.",
  "Mobil öncelikli tasarla; dar, orta ve geniş ekranları doğrula.",
  "Gerçek içerik yapısı kullan; müşteri logosu, metrik veya referans sözü uydurma.",
  "Veriye bağlı her akış için loading, empty, error ve success durumlarını hazırla.",
  "Her sayfaya özel metadata ve uygun yapılandırılmış veri türünü ekle.",
  "Renk, tipografi, boşluk, köşe ve hareket kararlarını seçilen tasarım token’larına bağla.",
] as const;

export const buildPhases = [
  "Brief and audience",
  "Sitemap and user flow",
  "Visual direction",
  "Skeleton and block selection",
  "Content and implementation",
  "Quality review",
] as const;

export function buildSitePrompt(input: SiteBriefInput, language: PlanningLanguage) {
  const skeleton = skeletons.find((item) => item.slug === input.siteType) ?? skeletons[0];
  const theme = presets.find((item) => item.id === input.visualDirection) ?? presets[0];
  const localizedType = siteTypeTranslations[skeleton.slug];
  const sections = skeleton.sections
    .map((section, index) => `${index + 1}. ${section.slug} — ${section.purpose}`)
    .join("\n");
  const gates = (language === "tr" ? qualityGatesTr : qualityGates)
    .map((gate) => `- ${gate}`)
    .join("\n");

  if (language === "tr") {
    return `Premium Kit registry'sini kullanan kıdemli bir tasarım mühendisi gibi çalış.

PROJE
- Ad: ${input.projectName || "[Proje adı]"}
- İş: ${input.summary || "[İşletme veya ürünün kısa açıklaması]"}
- Hedef kitle: ${input.audience || localizedType?.audience || skeleton.audience}
- Site türü: ${localizedType?.name || skeleton.name}
- Ana hedef: ${input.primaryGoal || skeleton.outcome}
- Planlanan sayfalar: ${input.pages || "[Gerekli sayfaları brief'e göre belirle]"}

ÖNCE PLANLA
Kod yazmadan önce hedef kitleyi, ana dönüşüm hedefini, gerekli sayfaları ve kullanıcı akışını özetle. Eksik kritik bilgi varsa kısa sorular sor. Ardından sayfa haritasını ve her sayfanın görevini çıkar.

ÖNERİLEN ANA SAYFA İSKELETİ
${sections}

GÖRSEL SİSTEM
- Yön: ${theme.name}
- Tasarım okuması: ${theme.read}
- Tipografi: ${theme.display.name} — ${theme.display.why}
- Yoğunluk: ${theme.density}/10
- Hareket seviyesi: ${input.motion}
- Tema kimliği yalnız renk değişimi olmamalı; tipografi, grid, yüzey, köşe, görsel kullanım ve hareket karakterini birlikte uygula.

UYGULAMA
- Önce /r/ai-manifest.json, /r/catalog.json ve /r/site-recipes.json dosyalarını oku.
- Uygun parçaları /r/registry.json içinden seç; bileşenleri sıfırdan benzeterek yazma.
- Blok sırasını içeriğe göre gerekçeli biçimde değiştirmen serbesttir.
- Metinleri hedef kitleye ve dönüşüm amacına göre yaz; lorem ipsum kullanma.
- Kaynak kod kullanıcıya ait, düzenlenebilir ve bağımlılıkları açık olmalı.

KALİTE KAPILARI
${gates}

TESLİM
Önce kısa planı ve kullanacağın registry parçalarını göster. Sonra eksiksiz sayfaları uygula, kalite kontrollerini çalıştır ve kalan varsayımları açıkça listele.`;
  }

  return `Work as a senior design engineer using the Premium Kit registry.

PROJECT
- Name: ${input.projectName || "[Project name]"}
- Business: ${input.summary || "[Short description of the business or product]"}
- Audience: ${input.audience || skeleton.audience}
- Site type: ${skeleton.name}
- Primary outcome: ${input.primaryGoal || skeleton.outcome}
- Planned pages: ${input.pages || "[Derive the required pages from the brief]"}

PLAN FIRST
Before writing code, summarize the audience, conversion goal, required pages and user flow. Ask concise questions only for missing critical information. Then produce a sitemap and state the job of every page.

RECOMMENDED HOMEPAGE SKELETON
${sections}

VISUAL SYSTEM
- Direction: ${theme.name}
- Design read: ${theme.read}
- Display type: ${theme.display.name} — ${theme.display.why}
- Density: ${theme.density}/10
- Motion level: ${input.motion}
- A theme is not a colour swap. Apply its typography, grid, surfaces, radii, image treatment and motion character together.

IMPLEMENTATION
- Read /r/ai-manifest.json, /r/catalog.json and /r/site-recipes.json first.
- Select suitable items from /r/registry.json instead of recreating approximations.
- You may change the block order when the content gives you a clear reason.
- Write audience-specific copy; do not use lorem ipsum.
- Keep the delivered source editable, owned by the user and explicit about dependencies.

QUALITY GATES
${gates}

DELIVERY
Show the short plan and selected registry items first. Then implement complete pages, run the quality checks and list any remaining assumptions.`;
}

/**
 * A complete, downloadable project recipe built from a finished brief.
 *
 * This is the machine-shaped sibling of the copyable prompt: a single JSON
 * object an agent (or a person) can hand straight to a coding tool. It resolves
 * the chosen skeleton and theme, marks which sections map to an installable
 * registry item, lists the exact install order and endpoints, and embeds the
 * prompt and quality gates. Nothing is invented here; every value is derived
 * from the brief plus the registry, skeletons and presets that ship.
 */
export function buildProjectRecipe(input: SiteBriefInput, language: PlanningLanguage) {
  const skeleton = skeletons.find((item) => item.slug === input.siteType) ?? skeletons[0];
  const theme = presets.find((item) => item.id === input.visualDirection) ?? presets[0];
  const installable = new Set(registry.map((item) => item.slug));

  const sections = skeleton.sections.map((section, index) => {
    const inRegistry = installable.has(section.slug);
    return {
      order: index + 1,
      slug: section.slug,
      label: section.label,
      purpose: section.purpose,
      installable: inRegistry,
      installUrl: inRegistry ? `/r/${section.slug}.json` : null,
    };
  });

  // Install order: registry-backed sections, de-duplicated, in first-seen order.
  const seen = new Set<string>();
  const install = sections
    .filter((section) => section.installable && !seen.has(section.slug) && seen.add(section.slug))
    .map((section) => ({ name: section.slug, installUrl: `/r/${section.slug}.json` }));

  return {
    $schema: "https://premium-kit.dev/schema/project-recipe.json",
    generatedBy: "premium-kit",
    version: 1,
    language,
    brief: {
      projectName: input.projectName || null,
      summary: input.summary || null,
      audience: input.audience || skeleton.audience,
      primaryGoal: input.primaryGoal || skeleton.outcome,
      pages: input.pages || null,
      motion: input.motion,
    },
    sitemap: {
      homepageSkeleton: {
        slug: skeleton.slug,
        name: skeleton.name,
        outcome: skeleton.outcome,
      },
      sections,
    },
    visualSystem: {
      theme: theme.id,
      name: theme.name,
      designRead: theme.read,
      scheme: theme.scheme,
      displayFont: theme.display.name,
      dials: { variance: theme.variance, motion: theme.motion, density: theme.density },
      designSpec: `/r/design/${theme.id}.md`,
    },
    install,
    endpoints: {
      manifest: "/r/ai-manifest.json",
      catalog: "/r/catalog.json",
      recipes: "/r/site-recipes.json",
      registry: "/r/registry.json",
      designIndex: "/r/design.json",
      guide: language === "tr" ? "/r/AI-GUIDE.tr.md" : "/r/AI-GUIDE.md",
    },
    qualityGates: [...(language === "tr" ? qualityGatesTr : qualityGates)],
    prompt: buildSitePrompt(input, language),
  };
}

/** A filesystem-safe filename for the downloaded recipe. */
export function recipeFileName(input: SiteBriefInput) {
  const base = (input.projectName || input.siteType || "premium-kit")
    .toLowerCase()
    .normalize("NFKD")
    // Drop combining marks so "köşe" becomes "kose", not "ko-s-e".
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\w]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return `${base || "premium-kit"}-recipe.json`;
}

export function buildBriefTemplate(language: PlanningLanguage) {
  const tr = language === "tr";

  return `# ${tr ? "Site Brief’i" : "Site Brief"}

## ${tr ? "İş ve hedef" : "Business and outcome"}
- ${tr ? "Proje adı" : "Project name"}:
- ${tr ? "İşletme veya ürün" : "Business or product"}:
- ${tr ? "Ana dönüşüm hedefi" : "Primary conversion goal"}:
- ${tr ? "Başarı nasıl ölçülecek" : "How success will be measured"}:

## ${tr ? "Kullanıcı" : "Audience"}
- ${tr ? "Birincil hedef kitle" : "Primary audience"}:
- ${tr ? "Kullanıcının ana ihtiyacı" : "Main user need"}:
- ${tr ? "Karar vermeden önceki itirazları" : "Objections before deciding"}:

## ${tr ? "İçerik ve sayfalar" : "Content and pages"}
- ${tr ? "Gerekli sayfalar" : "Required pages"}:
- ${tr ? "Mevcut içerikler" : "Available content"}:
- ${tr ? "Gerçek kanıtlar ve kaynaklar" : "Real proof and sources"}:
- ${tr ? "Gerekli formlar veya işlemler" : "Required forms or transactions"}:

## ${tr ? "Görsel yön" : "Visual direction"}
- ${tr ? "Seçilen Premium Kit teması" : "Selected Premium Kit theme"}:
- ${tr ? "Marka kişiliği" : "Brand personality"}:
- ${tr ? "Görsel kaynaklar" : "Image sources"}:
- ${tr ? "Kaçınılacak kalıplar" : "Patterns to avoid"}:

## ${tr ? "Teknik gereksinimler" : "Technical requirements"}
- ${tr ? "Diller" : "Languages"}:
- ${tr ? "Entegrasyonlar" : "Integrations"}:
- ${tr ? "SEO / yapılandırılmış veri türü" : "SEO / structured data type"}:
- ${tr ? "Erişilebilirlik veya performans gereksinimleri" : "Accessibility or performance requirements"}:
`;
}
