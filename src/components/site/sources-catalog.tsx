import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/blocks/page-header";
import { Container } from "@/components/primitives/layout";
import { optionBacklog, researchSources } from "@/registry/research-sources";

const sourceTextTr: Record<
  string,
  { focus: string; fit: string; patterns: string[] }
> = {
  "Radix Primitives": {
    focus: "Yönetilen odak ve klavye davranışına sahip, stilsiz ve erişilebilir React temelleri.",
    fit: "Overlay, menü, seçici ve diğer bileşik kontroller için etkileşim temeli.",
    patterns: ["Popover", "Bağlam menüsü", "Select ve odak yönetimi"],
  },
  "Launch UI": {
    focus: "Next.js 16, React 19 ve Tailwind v4 tabanlı landing page bileşenleri.",
    fit: "Modern hero, navigasyon ve ürün gösterimi varyantları için en yakın teknik eşleşme.",
    patterns: ["Yüzen navigasyon", "Uygulama tanıtım hero'su", "Ürün ekranı çerçevesi"],
  },
  "Shadcn Space": {
    focus: "Bileşenler, pazarlama blokları, şablonlar ve dashboard düzenleri.",
    fit: "Kategori kapsamı ve CLI dağıtım modeli için geniş bir referans.",
    patterns: ["Hero varyantları", "Referans düzenleri", "Dashboard iskeletleri"],
  },
  "Origin UI": {
    focus: "Yüzlerce kopyala-yapıştır uygulama arayüzü bileşeni.",
    fit: "Form, input, navigasyon ve yoğun uygulama durumları için güçlü kaynak.",
    patterns: ["Komut paleti", "Gelişmiş filtreler", "Tarih ve saat alanları"],
  },
  "Magic UI": {
    focus: "Tasarım geliştiricileri için hareketli React ve Tailwind bileşenleri.",
    fit: "Yalnız hareket referansı; efektler azaltılıp tema tokenlarına bağlanmalı.",
    patterns: ["Video hero diyaloğu", "Avatar güven grubu", "Dönen metin"],
  },
  "Page UI": {
    focus: "React ve Next.js için temalanabilir landing page bileşenleri ve şablonları.",
    fit: "Tailwind v3 kodunun uyarlanması gereken güçlü bir dönüşüm akışı referansı.",
    patterns: ["Karşılaştırma tablosu", "Entegrasyon ızgarası", "Vaka çalışması kartları"],
  },
  TailGrids: {
    focus: "Pazarlama, e-ticaret, dashboard ve iç araçlar için React bileşenleri.",
    fit: "Pazarlama sayfalarının ötesindeki boşlukları görmek için geniş kategori referansı.",
    patterns: ["E-ticaret ızgaraları", "Hesap sayfaları", "Dashboard widget'ları"],
  },
  TailAdmin: {
    focus: "Next.js 16, React 19 ve Tailwind v4 tabanlı yönetim paneli şablonu.",
    fit: "Gelecekteki uygulama ve dashboard iskelet ailesi için güçlü başlangıç.",
    patterns: ["Kenar menülü iskelet", "Analitik özeti", "Ayar sayfaları"],
  },
};

const backlogTextTr: Record<string, string> = {
  Navigation: "Navigasyon",
  Hero: "Hero",
  Proof: "Güven",
  Product: "Ürün",
  Pricing: "Fiyatlandırma",
  Commerce: "E-ticaret",
  Application: "Uygulama",
  Overlay: "Overlay",
  Content: "İçerik",
  Event: "Etkinlik",
  Service: "Hizmet",
  Form: "Form",
  "Floating navigation": "Yüzen navigasyon",
  "Mega menu navigation": "Mega menü navigasyonu",
  "Centered launch hero": "Merkez lansman hero'su",
  "Product video hero": "Ürün videolu hero",
  "Mobile app showcase": "Mobil uygulama tanıtımı",
  "Testimonial grid": "Referans ızgarası",
  "Case-study cards": "Vaka çalışması kartları",
  "Integration directory": "Entegrasyon dizini",
  "Plan comparison table": "Plan karşılaştırma tablosu",
  "Product collection grid": "Ürün koleksiyonu ızgarası",
  "Dashboard shell": "Dashboard iskeleti",
  "Authentication flow": "Kimlik doğrulama akışı",
  "Command palette": "Komut paleti",
  "Search result states": "Arama sonucu durumları",
  "Filter toolbar": "Filtre araç çubuğu",
  "Popover and context menu": "Popover ve bağlam menüsü",
  "Combobox and autocomplete": "Combobox ve otomatik tamamlama",
  "Language and currency selectors": "Dil ve para birimi seçicileri",
  "Documentation sidebar": "Dokümantasyon kenar menüsü",
  "Changelog list": "Değişiklik günlüğü",
  "Two-day schedule": "İki günlük program",
  "Location directory": "Lokasyon dizini",
  "Date, time and one-time-code inputs": "Tarih, saat ve tek kullanımlık kod alanları",
  "Native file upload": "Native dosya yükleme",
};

export function SourcesCatalog({ language }: { language: "en" | "tr" }) {
  const tr = language === "tr";

  return (
    <div lang={language}>
      <PageHeader
        title={tr ? "Açık kaynak araştırması" : "Open-source research"}
        intro={
          tr
            ? "Yeni seçenekleri rastgele çoğaltmıyoruz. Uyumlu MIT kaynakları tarıyor, güçlü desenleri kendi token, erişilebilirlik ve performans kurallarımıza göre yeniden tasarlıyoruz."
            : "We do not multiply options at random. We study compatible MIT sources, then redesign useful patterns around our own tokens, accessibility and performance rules."
        }
        trail={[
          { label: tr ? "Kütüphane" : "Kit", href: tr ? "/tr" : "/" },
          { label: tr ? "Kaynaklar" : "Sources", href: tr ? "/tr/kaynaklar" : "/sources" },
        ]}
      />

      <main className="py-14">
        <Container className="flex flex-col gap-16">
          <section className="grid gap-5 md:grid-cols-2">
            {researchSources.map((source) => (
              <article
                key={source.name}
                className="flex flex-col rounded-pk border border-line bg-elevated p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="display-3">{source.name}</h2>
                    <p className="mt-1 font-mono text-xs text-accent">{source.license}</p>
                  </div>
                  <a
                    href={source.repository}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${source.name} GitHub`}
                    className="rounded-pk-sm border border-line p-2 text-muted transition-colors hover:border-strong hover:text-fg"
                  >
                    <ArrowUpRight size={16} weight="bold" aria-hidden />
                  </a>
                </div>

                <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
                  {tr ? sourceTextTr[source.name].focus : source.focus}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-faint">
                  {tr ? sourceTextTr[source.name].fit : source.fit}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {(tr ? sourceTextTr[source.name].patterns : source.patterns).map((pattern) => (
                    <li
                      key={pattern}
                      className="rounded-pk-pill border border-line px-2.5 py-1 text-xs text-muted"
                    >
                      {pattern}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          <section className="flex flex-col gap-6">
            <div>
              <p className="font-mono text-xs text-accent">
                {tr ? "SIRADAKİ SEÇENEKLER" : "OPTION BACKLOG"}
              </p>
              <h2 className="mt-2 display-2">
                {tr ? "Kataloğa eklenecek aileler" : "Families to add next"}
              </h2>
              <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-muted">
                {tr
                  ? "Her desen kaynak projeden birebir kopyalanmak yerine mevcut tema sözleşmemize uyarlanacak."
                  : "Each pattern will be adapted to the existing theme contract rather than copied verbatim."}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[38rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-strong">
                    <th className="pb-3 pr-5 text-sm font-medium text-muted">
                      {tr ? "Aile" : "Family"}
                    </th>
                    <th className="pb-3 pr-5 text-sm font-medium text-muted">
                      {tr ? "Yeni seçenek" : "New option"}
                    </th>
                    <th className="pb-3 text-sm font-medium text-muted">
                      {tr ? "Referans" : "Reference"}
                    </th>
                    <th className="pb-3 text-right text-sm font-medium text-muted">
                      {tr ? "Durum" : "Status"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {optionBacklog.map((item) => (
                    <tr
                      key={`${item.family}-${item.option}`}
                      className="border-b border-line last:border-0"
                    >
                      <td className="py-3.5 pr-5 text-sm text-faint">
                        {tr ? backlogTextTr[item.family] : item.family}
                      </td>
                      <td className="py-3.5 pr-5 text-[0.9375rem]">
                        {tr ? backlogTextTr[item.option] : item.option}
                      </td>
                      <td className="py-3.5 text-sm text-muted">{item.source}</td>
                      <td className="py-3.5 text-right">
                        <span
                          className={[
                            "rounded-pk-pill border px-2.5 py-1 text-xs",
                            item.status === "ready"
                              ? "border-accent text-accent"
                              : "border-line text-faint",
                          ].join(" ")}
                        >
                          {item.status === "ready"
                            ? tr
                              ? "hazır"
                              : "ready"
                            : tr
                              ? "planlandı"
                              : "planned"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Container>
      </main>
    </div>
  );
}
