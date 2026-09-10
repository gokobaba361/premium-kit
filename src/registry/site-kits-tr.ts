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
  "agency-studio": {
    name: "Ajans ve yaratıcı stüdyo",
    sector: "Tasarım, marka ve dijital stüdyolar",
    description:
      "İşi göstermeden önce bakış açısını görünür kılan, ardından gelen talebi niteleyerek ilk görüşmenin doğru müşteriyle yapılmasını sağlayan bir stüdyo sitesi.",
    outcome: "Nitelikli proje talebi",
  },
  "freelancer-portfolio": {
    name: "Serbest çalışan ve portfolyo",
    sector: "Bağımsız tasarımcılar, geliştiriciler ve yazarlar",
    description:
      "İşi hızla kanıtlayan, kişinin neye açık olduğunu söyleyen ve işe almayı tek bir bariz adıma indiren tek kişilik site.",
    outcome: "Doğrudan iş talebi",
  },
  "professional-service": {
    name: "Danışmanlık ve profesyonel hizmet",
    sector: "Danışmanlar, mali müşavirler, avukatlar ve uzmanlar",
    description:
      "Soyut bir hizmeti anlaşılır kılan danışmanlık sitesi: ne yapıyorsun, süreç nasıl işliyor, başlamak ne tutuyor ve ilk görüşme nasıl alınıyor.",
    outcome: "Alınmış görüşme",
  },
  "publication-newsletter": {
    name: "Blog, yayın ve bülten",
    sector: "Editoryal markalar, araştırma ve bağımsız yazarlar",
    description:
      "En yeni içeriği öne koyan, arşivi gerçekten gezilebilir kılan ve okuyucuyu açılır pencere olmadan aboneye dönüştüren bir yayın.",
    outcome: "İçerik okuma ve abonelik",
  },
  "developer-docs": {
    name: "Dokümantasyon ve geliştirici portalı",
    sector: "Geliştirici araçları, API'ler ve ürün kılavuzları",
    description:
      "Yönlendirmenin, navigasyonun ve sürüm geçmişinin teknik içerikle yarışmadan erişilebilir kaldığı bir dokümantasyon sitesi.",
    outcome: "Başarılı uygulama",
  },
  "event-conference": {
    name: "Etkinlik ve konferans",
    sector: "Konferanslar, festivaller ve profesyonel buluşmalar",
    description:
      "Etkinlik vaadini kuran, programı taranabilir yapan, mekân bilgisini kayda yakın tutan ve bileti siteden çıkmadan satan bir etkinlik sitesi.",
    outcome: "Tamamlanmış kayıt",
  },
  "dashboard-internal": {
    name: "Panel ve iç kullanım aracı",
    sector: "İç operasyon, yönetim panelleri ve back-office araçları",
    description:
      "İşi yürüten ekip için bir araç: oturum açılmış bir çerçeve, filtrelenebilir bir liste, gerçek bir oluştur-düzenle-sil döngüsü ve kimin neyi değiştirdiğini yanıtlayabilen bir denetim kaydı. Kamuya açık bir pazarlama yüzeyi yok ve bu, içindeki neredeyse her kararı değiştiriyor.",
    outcome: "Denetim kaydıyla tamamlanmış iş",
  },
  "education-course": {
    name: "Eğitim ve online kurs",
    sector: "Kurs üreticileri, akademiler ve eğitim sağlayıcıları",
    description:
      "Saat sayısını değil sonucu satan, müfredatı fiyattan önce gösteren ve ardından asıl zor işi yapan bir kurs sitesi: kayıt olan kişiyi kursu bitiren kişiye dönüştürmek.",
    outcome: "Kayıt ve tamamlanmış kurs",
  },
  "nonprofit-donation": {
    name: "Sivil toplum ve bağış",
    sector: "Dernekler, vakıflar ve kampanyalar",
    description:
      "Para istemeden önce güven kuran bir site: kurumun ne yaptığı, bunun neye mal olduğu, hesapları kimin denetlediği — ve ardından aylık bağışı gerçekten bir taahhüt gibi ele alan bir bağış akışı.",
    outcome: "Bağış, tercihen düzenli bağış",
  },
};
