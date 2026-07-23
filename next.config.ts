import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Registry item routes read the canonical source at request time so they can
  // emit dependency URLs for the actual deployment origin. Keep those source
  // files in the server trace without widening the bundle to the whole repo.
  outputFileTracingIncludes: {
    "/r/*": [
      "src/components/blocks/**/*",
      "src/components/motion/**/*",
      "src/components/primitives/**/*",
      "src/design/*.css",
      "src/lib/cn.ts",
      "src/lib/premium-kit/**/*",
    ],
  },
  images: {
    remotePatterns: [
      // Placeholder photography for template pages. Swap for real assets per project.
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
