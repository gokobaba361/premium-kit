/**
 * Turkish names, sectors, descriptions and outcomes for each site kit.
 * Shared by the Turkish kit index and the Turkish kit detail page, so the copy
 * lives in one place. Route-level copy stays English in v1; the route paths
 * themselves are already Turkish where the sector is a Turkish-market build.
 */
export const siteKitTr: Record<
  string,
  { name: string; sector: string; description: string; outcome: string }
> = {
  "saas-product": {
    name: "SaaS ve yapay zekâ ürünü",
    sector: "Yazılım ürünleri",
    description:
      "Yazılımı anlatan, çalıştığını kanıtlayan, fiyatı açıkça veren ve nitelikli ziyaretçiyi denemeye taşıyan bir ürün sitesi; ardından ürünün ihtiyaç duyduğu dokümantasyon ve uygulama çerçevesi.",
    outcome: "Deneme veya demo talebi",
  },
  "clinic-healthcare": {
    name: "Klinik ve sağlık",
    sector: "Klinikler, diş hekimleri ve uzmanlar",
    description:
      "Kaygılı bir ziyaretçiyi hızla yönlendiren, süreci ve ekibi anlaşılır kılan ve telefon gerekmeden randevu alan bir klinik sitesi.",
    outcome: "Alınmış randevu",
  },
  "ecommerce-store": {
    name: "E-ticaret mağazası",
    sector: "Ürün koleksiyonları ve doğrudan tüketici markaları",
    description:
      "Ziyaretçiyi koleksiyondan ürün güvenine, oradan tamamlanmış siparişe taşıyan; mesafeli satışın gerektirdiği yasal yüzeyleri eksiksiz kuran bir mağaza.",
    outcome: "Tamamlanmış sipariş",
  },
  "restaurant-hospitality": {
    name: "Restoran ve ağırlama",
    sector: "Restoranlar, kafeler ve barlar",
    description:
      "İnsanların gerçekten sorduğu dört soruyu yanıtlayan bir mekân sitesi: yemek ne, neredesiniz, ne zaman açıksınız ve masa bulabilir miyim.",
    outcome: "Rezervasyon veya ziyaret",
  },
};
