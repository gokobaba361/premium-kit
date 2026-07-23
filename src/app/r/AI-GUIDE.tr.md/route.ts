import { qualityGatesTr } from "@/registry/site-planning";

export const dynamic = "force-static";

export function GET() {
  const body = `# Premium Kit AI Rehberi

Premium Kit; kaynak kodu kullanıcıya ait bileşen, blok, tema ve site reçetesi registry'sidir.

## Zorunlu çalışma akışı

1. \`/r/ai-manifest.json\` dosyasını oku.
2. İş isteğini hedef kitleye, ana hedefe ve site haritasına dönüştür.
3. \`/r/site-recipes.json\` dosyasını oku ve amaca en yakın reçeteyi seç.
4. Manifestten eksiksiz bir görsel yön seç.
5. Kullanım, kaçınma, rendering ve uyumluluğu karşılaştırmak için \`/r/catalog.json\` dosyasını oku.
6. \`/r/registry.json\` içinden uygun parçaları kur; benzerlerini sıfırdan üretme.
7. Reçeteyi gerçek içeriğe ve kullanıcı akışına göre uyarla.
8. Teslimden önce bütün kalite kapılarını çalıştır.

## Kalite kapıları

${qualityGatesTr.map((gate) => `- ${gate}`).join("\n")}

## İçerik kuralları

- Müşteri adı, logo, sertifika, metrik veya referans sözü uydurma.
- Lorem ipsum kullanma.
- Her sayfanın tek bir ana hedefi olsun.
- Başlıklar genel vaat değil, somut değer anlatsın.
- Her görsel ürün kanıtı, atmosfer, kimlik veya açıklama görevlerinden birini taşısın.

## Teslim sözleşmesi

Düzenlenebilir kaynak kodu teslim et; varsayımları, dış bağımlılıkları ve tamamlanan kontrolleri açıkça listele.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
