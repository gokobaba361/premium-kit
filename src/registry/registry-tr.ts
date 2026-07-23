import { categories, registry, type RegistryItem } from "./registry";

const text: Record<string, { name: string; description: string }> = {
  "premium-kit-base": {
    name: "Premium Kit temeli",
    description: "Tüm Premium Kit parçaları için ortak tokenlar, global stiller ve yerleşim yardımcıları.",
  },
  "motion-foundation": {
    name: "Hareket temeli",
    description: "Azaltılmış hareket tercihine duyarlı ortak reveal ve motion scope yardımcıları.",
  },
  marquee: {
    name: "Kayan şerit",
    description: "Logo, etiket veya yetenekler için kesintisiz yatay akış.",
  },
  "number-ticker": {
    name: "Sayı sayacı",
    description: "Görünür alana girdiğinde hedef değere doğru sayar.",
  },
  "spotlight-card": {
    name: "Işık takipli kart",
    description: "İmleci izleyen yüzey ve kenarlık vurgusu.",
  },
  "tilt-card": {
    name: "Eğilen kart",
    description: "İmlece doğru kontrollü biçimde üç boyutlu eğilir.",
  },
  "text-reveal": {
    name: "Metin açılışı",
    description: "Tek bir ifade için kelime kelime giriş hareketi.",
  },
  "aurora-background": {
    name: "Aurora arka plan",
    description: "Tema renklerinden üretilen yavaş hareketli bölüm ışığı.",
  },
  button: {
    name: "Düğme",
    description: "Altı varyant, üç boyut, yükleniyor ve devre dışı durumları.",
  },
  form: {
    name: "Form kontrolleri",
    description: "Alan, input, metin alanı, seçim, checkbox, radio ve switch.",
  },
  overlay: {
    name: "Diyaloglar ve menüler",
    description: "Diyalog, ipucu, açılır menü, popover ve bağlam menüsü.",
  },
  feedback: {
    name: "Geri bildirim durumları",
    description: "Uyarı, iskelet, boş durum, hata durumu ve ilerleme.",
  },
  toast: {
    name: "Geçici bildirim",
    description: "Provider ve hook ile kısa süreli işlem onayları.",
  },
  data: {
    name: "Veri gösterimi",
    description: "Tablo, istatistik, avatar, etiket, breadcrumb ve sayfalama.",
  },
  controls: {
    name: "Kaydırıcı ve segmentli kontrol",
    description: "Aralık seçimi ve iki ila dört seçenekli segmentli kontrol.",
  },
  accordion: {
    name: "Akordeon",
    description: "İçinde bileşen taşıyabilen Radix akordeon panelleri.",
  },
  tabs: {
    name: "Sekmeler",
    description: "Klavye odağı destekleyen alt çizgili sekmeler.",
  },
  "command-palette": {
    name: "Komut paleti",
    description: "Gruplanmış sayfa ve işlemlerde klavyeyle açılan arama.",
  },
  "advanced-form": {
    name: "Gelişmiş form alanları",
    description: "Native tarih, saat, tek kullanımlık kod ve dosya yükleme alanları.",
  },
  combobox: {
    name: "Aranabilir seçim",
    description: "Klavye navigasyonu ve boş durum içeren aranabilir seçenek listesi.",
  },
  "locale-selectors": {
    name: "Dil ve para birimi seçicileri",
    description: "Erişilebilir select temeliyle açık ve bağımsız yerel ayar kontrolleri.",
  },
  "search-results": {
    name: "Arama sonucu durumları",
    description: "Sonuç listesi, sonuç bulunamadı yönlendirmesi ve son aramalar.",
  },
  "hero-split": {
    name: "İkiye bölünmüş hero",
    description: "Solda metin, sağda görsel bulunan asimetrik açılış.",
  },
  "hero-editorial": {
    name: "Editoryal hero",
    description: "Güçlü ifade ve kat çizgisinin altında geniş görsel.",
  },
  "feature-bento": {
    name: "Bento özellik alanı",
    description: "Farklı genişliklerde hücrelerden oluşan özellik ızgarası.",
  },
  "pricing-duo": {
    name: "İkili fiyatlandırma",
    description: "Biri öne çıkan iki plan ve kontrollü özellik listeleri.",
  },
  "contact-form": {
    name: "İletişim formu",
    description: "Etiketli alanlar, satır içi hata, gönderim ve başarı durumları.",
  },
  "site-nav": {
    name: "Site navigasyonu",
    description: "Tek satırlı sabit üst menü ve mobil çekmece.",
  },
  "announcement-bar": {
    name: "Duyuru çubuğu",
    description: "Navigasyonun üstünde kapatılabilir tek satırlık bildirim.",
  },
  "page-header": {
    name: "Sayfa başlığı",
    description: "İç sayfalar için breadcrumb, başlık ve giriş metni.",
  },
  "logo-wall": {
    name: "Logo şeridi",
    description: "Müşteri veya iş ortağı logoları için sakin güven alanı.",
  },
  "features-split": {
    name: "Bölünmüş özellikler",
    description: "En fazla iki satırlık dönüşümlü görsel ve metin düzeni.",
  },
  "steps-flow": {
    name: "Adım akışı",
    description: "Numaralı rozet kullanmadan üç veya dört bağlantılı eylem.",
  },
  "spec-grouped": {
    name: "Gruplu özellikler",
    description: "Pratik ayrıntıları üç okunabilir kümede gösterir.",
  },
  "gallery-strip": {
    name: "Galeri şeridi",
    description: "İsteğe bağlı tam genişlikte üç görsellik atmosfer alanı.",
  },
  "stats-band": {
    name: "İstatistik bandı",
    description: "Kaynak belirtilen üç veri ve bölüm tanıtımı.",
  },
  timeline: {
    name: "Zaman çizelgesi",
    description: "Gerçek dönem etiketleri kullanan dikey geçmiş.",
  },
  "team-grid": {
    name: "Ekip ızgarası",
    description: "Portre, isim ve role odaklanan insan düzeni.",
  },
  "blog-grid": {
    name: "Yazı ızgarası",
    description: "Kategori, tarih ve okuma süresi bulunan editoryal kartlar.",
  },
  "proof-quote": {
    name: "Referans alıntısı",
    description: "İsteğe bağlı portreyle tek ve kaynaklı müşteri sözü.",
  },
  "faq-accordion": {
    name: "SSS akordeonu",
    description: "JavaScript olmadan çalışan native details tabanlı sorular.",
  },
  "newsletter-signup": {
    name: "Bülten kaydı",
    description: "Doğrulama ve başarı durumları bulunan tek alanlı kayıt.",
  },
  "cta-band": {
    name: "Aksiyon bandı",
    description: "Sayfanın ana niyetini tekrarlayan kapanış çağrısı.",
  },
  "site-footer": {
    name: "Site alt alanı",
    description: "Marka özeti ve üç kompakt bağlantı grubu.",
  },
  "hero-centered": {
    name: "Merkez hero",
    description: "İki aksiyon ve bir kanıt satırı bulunan ortalanmış açılış.",
  },
  "testimonial-grid": {
    name: "Referans ızgarası",
    description: "Tam kaynak bilgili ve eşit ağırlıklı üç müşteri sözü.",
  },
  "integration-grid": {
    name: "Entegrasyon ızgarası",
    description: "Altı ila on iki ürün bağlantısından oluşan dizin.",
  },
  "comparison-table": {
    name: "Plan karşılaştırması",
    description: "İki veya üç plan için özellik düzeyinde karşılaştırma.",
  },
  "floating-nav": {
    name: "Yüzen navigasyon",
    description: "Odaklı lansman sayfaları için yuvarlatılmış yüzen üst menü.",
  },
  "mega-nav": {
    name: "Mega menü",
    description: "Ürün, hizmet ve kaynaklar için çok sütunlu keşif navigasyonu.",
  },
  "app-showcase-hero": {
    name: "Uygulama tanıtım hero'su",
    description: "Ürün vaadinin altında çerçevelenmiş gerçek arayüz ekranı.",
  },
  "case-study-grid": {
    name: "Vaka çalışması ızgarası",
    description: "Stüdyo ve hizmet şirketleri için sonuç odaklı proje kartları.",
  },
  "product-grid": {
    name: "Ürün ızgarası",
    description: "Fiyat ve kısa not içeren iki veya dört sütunlu ürün koleksiyonu.",
  },
  "dashboard-shell": {
    name: "Dashboard iskeleti",
    description: "Navigasyon, başlık ve araç alanı bulunan responsive uygulama çerçevesi.",
  },
  "filter-toolbar": {
    name: "Filtre araç çubuğu",
    description: "GET formu içinde arama ve en fazla üç native filtre.",
  },
  "metrics-overview": {
    name: "Metrik özeti",
    description: "İsteğe bağlı değişim bağlamı bulunan dört kompakt dashboard metriği.",
  },
  "auth-split": {
    name: "Bölünmüş giriş ekranı",
    description: "Form alanı ve isteğe bağlı ürün kanıtı bulunan kimlik doğrulama çerçevesi.",
  },
  "docs-sidebar": {
    name: "Dokümantasyon kenar menüsü",
    description: "Makale alanının yanında gruplanmış dokümantasyon navigasyonu.",
  },
  "event-schedule": {
    name: "Etkinlik programı",
    description: "Saat, oturum, konuşmacı ve kategori içeren iki günlük program.",
  },
  "location-grid": {
    name: "Lokasyon ızgarası",
    description: "Çok lokasyonlu hizmetler ve mağazalar için adres kartları.",
  },
  "changelog-list": {
    name: "Değişiklik günlüğü",
    description: "Tarih, sürüm ve somut değişikliklerle düzenlenen ürün güncellemeleri.",
  },
  tokens: {
    name: "Token sözleşmesi",
    description: "Kütüphanedeki tüm bileşenlerin okuduğu değişkenler.",
  },
  themes: {
    name: "Sektör temaları",
    description: "Her sektör için eksiksiz on iki token seti.",
  },
  "theme-runtime": {
    name: "Çalışma zamanı tema seçimi",
    description: "Ziyaretçi seçimi için provider, parlamasız script ve tema seçici.",
  },
  "product-detail": {
    name: "Ürün detayı",
    description: "Galeri, varyant seçimi, adet ve sepete ekleme; gerçek durumlarıyla.",
  },
  "cart-drawer": {
    name: "Sepet çekmecesi",
    description: "Satır kalemleri, adet, ara toplam ve boş durumla açılır sepet.",
  },
  "checkout-form": {
    name: "Ödeme formu",
    description: "İletişim ve teslimat alanları, sipariş özeti ve eksiksiz durumlar.",
  },
  "order-confirmation": {
    name: "Sipariş onayı",
    description: "Sipariş numarası, kalem dökümü ve sonraki adımla başarı durumu.",
  },
  "cart-store": {
    name: "Sepet deposu",
    description: "useCart kancasıyla paylaşılan sepet; ticaret blokları canlı durumu paylaşır.",
  },
  "onboarding-flow": {
    name: "Karşılama akışı",
    description: "İlerleme çubuğu, geri/devam ve tamamlanma durumuyla çok adımlı kurulum.",
  },
  "settings-form": {
    name: "Ayarlar formu",
    description: "Tek kaydet düğmesi ve gerçek kaydedildi durumuyla sekmeli ayarlar.",
  },
  "content-index": {
    name: "İçerik dizini",
    description: "Sonuç sayısı ve eksiksiz boş durumuyla filtrelenebilir editoryal dizin.",
  },
  "article-layout": {
    name: "Makale düzeni",
    description: "Yazar künyesi ve prose tipografisiyle uzun içerik okuma düzeni.",
  },
};

export const registryTr: RegistryItem[] = registry.map((item) => ({
  ...item,
  name: text[item.slug]?.name ?? item.name,
  description: text[item.slug]?.description ?? item.description,
}));

const categoryText = {
  theme: {
    label: "Tema",
    blurb: "Tüm parçaların kullandığı token sözleşmesi ve on iki sektör paleti.",
  },
  primitive: {
    label: "Temel bileşenler",
    blurb: "Düğmeler, formlar, katmanlar, durumlar ve veri gösterimi.",
  },
  block: {
    label: "Bloklar",
    blurb: "İçeriği prop olarak alan tam sayfa bölümleri.",
  },
  motion: {
    label: "Hareket",
    blurb: "Azaltılmış hareket tercihinde kullanılabilirliğini koruyan animasyonlu parçalar.",
  },
};

export const categoriesTr = categories.map((category) => ({
  ...category,
  ...categoryText[category.id],
}));

export function itemBySlugTr(slug: string) {
  return registryTr.find((item) => item.slug === slug);
}
