/**
 * Turkish names, audiences, descriptions and outcomes for each site skeleton.
 * Shared by the Turkish skeleton index and the Turkish skeleton detail page so
 * the copy lives in one place.
 */
export const skeletonTr: Record<
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
