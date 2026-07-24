"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function turkishPath(pathname: string) {
  if (pathname === "/") return "/tr";
  if (pathname === "/components") return "/tr/bilesenler";
  if (pathname.startsWith("/components/")) {
    return pathname.replace("/components/", "/tr/bilesenler/");
  }
  if (pathname === "/blocks") return "/tr/bloklar";
  if (pathname === "/skeletons") return "/tr/iskeletler";
  if (pathname.startsWith("/skeletons/")) {
    return pathname.replace("/skeletons/", "/tr/iskeletler/");
  }
  if (pathname === "/kits") return "/tr/kitler";
  if (pathname.startsWith("/kits/")) return pathname.replace("/kits/", "/tr/kitler/");
  if (pathname === "/sources") return "/tr/kaynaklar";
  if (pathname === "/ai") return "/tr/yapay-zeka";
  return "/tr";
}

function englishPath(pathname: string) {
  if (pathname === "/tr") return "/";
  if (pathname === "/tr/bilesenler") return "/components";
  if (pathname.startsWith("/tr/bilesenler/")) {
    return pathname.replace("/tr/bilesenler/", "/components/");
  }
  if (pathname === "/tr/bloklar") return "/blocks";
  if (pathname === "/tr/iskeletler") return "/skeletons";
  if (pathname.startsWith("/tr/iskeletler/")) {
    return pathname.replace("/tr/iskeletler/", "/skeletons/");
  }
  if (pathname === "/tr/kitler") return "/kits";
  if (pathname.startsWith("/tr/kitler/")) return pathname.replace("/tr/kitler/", "/kits/");
  if (pathname === "/tr/kaynaklar") return "/sources";
  if (pathname === "/tr/yapay-zeka") return "/ai";
  return "/";
}

export function LanguageSwitch() {
  const pathname = usePathname();

  /* Preview documents are rendered inside the catalogue's own iframe. Catalogue
     chrome must not appear in them: what is on screen has to be the block and
     nothing else. */
  if (pathname.startsWith("/preview/")) return null;

  const turkish = pathname === "/tr" || pathname.startsWith("/tr/");

  return (
    <nav
      aria-label={turkish ? "Dil seçimi" : "Language selection"}
      className="fixed right-4 top-4 z-[100] flex rounded-pk-pill border border-line bg-elevated/95 p-1 shadow-pk backdrop-blur"
    >
      <Link
        href={englishPath(pathname)}
        hrefLang="en"
        aria-current={turkish ? undefined : "page"}
        className={[
          "rounded-pk-pill px-2.5 py-1 text-xs transition-colors",
          turkish ? "text-muted hover:text-fg" : "bg-accent text-accent-fg",
        ].join(" ")}
      >
        EN
      </Link>
      <Link
        href={turkishPath(pathname)}
        hrefLang="tr"
        aria-current={turkish ? "page" : undefined}
        className={[
          "rounded-pk-pill px-2.5 py-1 text-xs transition-colors",
          turkish ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
        ].join(" ")}
      >
        TR
      </Link>
    </nav>
  );
}
