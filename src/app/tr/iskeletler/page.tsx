import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/blocks/page-header";
import { ButtonLink } from "@/components/primitives/button";
import { Container } from "@/components/primitives/layout";
import { skeletons } from "@/registry/skeletons";
import { itemBySlugTr } from "@/registry/registry-tr";

export const metadata: Metadata = {
  title: "Site iskeletleri",
  description: "Pazarlama, e-ticaret, uygulama, dokümantasyon, etkinlik ve kurumsal siteler için bölüm sıraları.",
};

const text: Record<
  string,
  { name: string; audience: string; description: string; outcome: string }
> = {
  "saas-launch": {
    name: "SaaS lansmanı",
    audience: "Yazılım ürünleri",
    description: "Ürünü açıkla, güven oluştur ve nitelikli ziyaretçiyi denemeye yönlendir.",
    outcome: "Deneme veya demo talebi",
  },
  "product-story": {
    name: "Ürün hikâyesi",
    audience: "E-ticaret ve zanaat ürünleri",
    description: "Önce arzu oluştur, ardından malzeme ayrıntısı ve kanıtla satın almayı destekle.",
    outcome: "Ürün satın alma",
  },
  "studio-portfolio": {
    name: "Stüdyo portfolyosu",
    audience: "Ajanslar ve bağımsız stüdyolar",
    description: "Yetenekleri ve seçilmiş işleri göstermeden önce bakış açısını görünür kıl.",
    outcome: "Nitelikli proje talebi",
  },
  "service-business": {
    name: "Hizmet işletmesi",
    audience: "Klinikler, danışmanlar ve yerel hizmetler",
    description: "Süreci anlaşılır kıl ve iletişim öncesindeki belirsizliği azalt.",
    outcome: "Randevu veya görüşme",
  },
  publication: {
    name: "Yayın",
    audience: "Bloglar, araştırma ve editoryal markalar",
    description: "Yeni içerikleri öne çıkarırken konu ve abonelik yollarını kolay bulunur tut.",
    outcome: "İçerik okuma ve abonelik",
  },
  "company-profile": {
    name: "Şirket profili",
    audience: "Kurumsal ve kurumsal ölçekli siteler",
    description: "Teklifi; kanıt, geçmiş ve sorumluluk sahibi ekip ile dengeli biçimde anlat.",
    outcome: "Ortaklık veya satın alma görüşmesi",
  },
  "commerce-store": {
    name: "E-ticaret mağazası",
    audience: "Ürün koleksiyonları ve doğrudan tüketici markaları",
    description: "Sayfayı promosyon duvarına çevirmeden koleksiyon keşfinden ürün güvenine ilerle.",
    outcome: "Koleksiyon inceleme ve satın alma",
  },
  "application-dashboard": {
    name: "Uygulama dashboard'u",
    audience: "SaaS ürünleri ve iç araçlar",
    description: "Özel iş akışlarından önce sabit çerçeve, güncel metrikler ve paylaşılabilir filtreler sun.",
    outcome: "Görev tamamlama ve izleme",
  },
  "documentation-hub": {
    name: "Dokümantasyon merkezi",
    audience: "Geliştirici araçları, API'ler ve ürün kılavuzları",
    description: "Teknik içerikle yarışmadan yönlendirme, navigasyon ve sürüm geçmişini erişilebilir tut.",
    outcome: "Başarılı uygulama",
  },
  "event-conference": {
    name: "Etkinlik ve konferans",
    audience: "Konferanslar, festivaller ve profesyonel buluşmalar",
    description: "Etkinlik vaadini kur, programı taranabilir yap ve mekân bilgisini kayda yakın tut.",
    outcome: "Kayıt",
  },
};

export default function TurkishSkeletonsPage() {
  return (
    <div lang="tr">
      <PageHeader
        title="Site iskeletleri"
        intro="Blok kütüphanesinden oluşturulmuş on kanıtlanmış sayfa yapısı. Önce hiyerarşiyi seç, sonra blokları ve temayı değiştir."
        trail={[
          { label: "Kütüphane", href: "/tr" },
          { label: "İskeletler", href: "/tr/iskeletler" },
        ]}
      />

      <main className="py-14">
        <Container>
          <aside className="mb-12 flex flex-col items-start justify-between gap-5 rounded-pk border border-line bg-subtle p-5 sm:flex-row sm:items-center md:p-6">
            <div>
              <p className="font-mono text-xs text-accent">BRIEF İLE BAŞLA</p>
              <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
                İskeleti ve görsel sistemi seç; kodlama aracına vereceğin eksiksiz üretim
                komutunu oluştur.
              </p>
            </div>
            <ButtonLink href="/tr/yapay-zeka" variant="secondary">
              AI komutu oluştur
            </ButtonLink>
          </aside>

          <div className="grid gap-5 lg:grid-cols-2">
            {skeletons.map((skeleton) => {
              const localized = text[skeleton.slug];
              return (
                <article
                  key={skeleton.slug}
                  className="rounded-pk border border-line bg-elevated p-6"
                >
                  <p className="font-mono text-xs text-accent">{localized.audience}</p>
                  <h2 className="mt-2 display-3">{localized.name}</h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {localized.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-y border-line py-3 text-sm">
                    <span className="text-faint">Ana hedef</span>
                    <span>{localized.outcome}</span>
                  </div>

                  <ol className="mt-5 grid gap-2 sm:grid-cols-2">
                    {skeleton.sections.map((section, index) => (
                      <li key={`${skeleton.slug}-${section.slug}`}>
                        <Link
                          href={`/tr/bilesenler/${section.slug}`}
                          className="group flex items-center gap-3 rounded-pk-sm border border-line p-3 transition-colors hover:border-strong"
                        >
                          <span className="font-mono text-xs text-faint">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-sm">
                            {itemBySlugTr(section.slug)?.name ?? section.label}
                          </span>
                          <ArrowRight
                            size={13}
                            weight="bold"
                            aria-hidden
                            className="text-faint transition-transform group-hover:translate-x-0.5"
                          />
                        </Link>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {skeleton.themes.map((theme) => (
                      <span
                        key={theme}
                        className="rounded-pk-pill border border-line px-2.5 py-1 text-xs text-muted"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </main>
    </div>
  );
}
