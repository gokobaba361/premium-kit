"use client";

import { useMemo, useState } from "react";
import {
  NoSearchResults,
  SearchResults,
  type SearchResultItem,
} from "@/components/primitives/search-results";
import { Field, Input } from "@/components/primitives/form";
import { Container } from "@/components/primitives/layout";
import { articleHref, demoArticles } from "./content-demo-data";

/**
 * Search island for the content demo.
 *
 * Filtering runs on the client against the same article model the index and the
 * reading pages use, so the surrounding page stays a static Server Component.
 * A real publication would move this to a search route with a `q` parameter —
 * which is a request-time API and would opt the page into dynamic rendering.
 */
export function ContentDemoSearch() {
  const [query, setQuery] = useState("");
  const trimmed = query.trim();

  const results = useMemo<SearchResultItem[]>(() => {
    if (!trimmed) return [];
    const needle = trimmed.toLocaleLowerCase("en-GB");
    return demoArticles
      .filter((article) =>
        [article.title, article.excerpt, article.category, ...article.tags]
          .join(" ")
          .toLocaleLowerCase("en-GB")
          .includes(needle),
      )
      .map((article) => ({
        title: article.title,
        description: article.excerpt,
        href: articleHref(article.slug),
        category: article.category,
        meta: article.readingTime,
      }));
  }, [trimmed]);

  return (
    <section className="bg-subtle py-section">
      <Container className="max-w-3xl">
        <h2 className="display-2 text-balance">Search the archive</h2>
        <p className="measure mt-4 text-base leading-relaxed text-muted">
          Every article, searchable by title, category or tag.
        </p>

        <form role="search" className="mt-8" onSubmit={(event) => event.preventDefault()}>
          <Field label="Search articles" helper="Try “measure”, “oak” or “field notes”.">
            <Input
              type="search"
              name="q"
              value={query}
              placeholder="Search"
              autoComplete="off"
              onChange={(event) => setQuery(event.target.value)}
            />
          </Field>
        </form>

        {trimmed ? (
          <div className="mt-10">
            {results.length > 0 ? (
              <SearchResults
                query={trimmed}
                results={results}
                resultsLabel={(count) => (count === 1 ? "article" : "articles")}
              />
            ) : (
              <NoSearchResults
                query={trimmed}
                browseLabel="Browse every article"
                browseHref="/demo/content#index"
              />
            )}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
