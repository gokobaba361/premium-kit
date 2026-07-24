import Link from "next/link";

/**
 * Demo content for the assembled editorial flow at /demo/content.
 *
 * One article model feeds every block in the flow: the index filter, the
 * featured grid, the search island and the reading page. That is the point of
 * the demo — the blocks are presentational, so a single content shape drives
 * all of them without a per-block adapter.
 *
 * The publication is fictional and so is its staff. Nothing here claims a real
 * customer, metric or endorsement.
 */

export type DemoArticle = {
  slug: string;
  title: string;
  /** One sentence. Used by the index, the grid and search. */
  excerpt: string;
  /** Longer deck shown above the article body. */
  standfirst: string;
  category: string;
  /** Machine-readable ISO date. */
  date: string;
  readingTime: string;
  author: { name: string; role: string };
  cover: { src: string; alt: string };
  tags: string[];
  body: React.ReactNode;
};

export const DEMO_LOCALE = "en-GB";

export const demoCategories = ["Craft", "Typography", "Materials", "Field notes"];

export function articleHref(slug: string) {
  return `/demo/content/${slug}`;
}

export const demoArticles: DemoArticle[] = [
  {
    slug: "measure-before-you-decorate",
    title: "Measure before you decorate",
    excerpt:
      "Line length decides whether a page is read. Everything else is a second-order concern.",
    standfirst:
      "A reading column is the one typographic decision that survives every redesign. Get it wrong and no amount of type scale, colour or motion will rescue the page.",
    category: "Typography",
    date: "2026-06-18",
    readingTime: "7 minute read",
    author: { name: "Deniz Arslan", role: "Type editor" },
    cover: {
      src: "https://picsum.photos/seed/kesit-measure/1200/675",
      alt: "A printed page held against a ruler",
    },
    tags: ["measure", "reading", "type scale"],
    body: (
      <>
        <p>
          Ask a designer what makes long-form text readable and you will usually hear about
          the typeface. Ask a typesetter and you will hear about the measure — the width of
          the column, counted in characters rather than pixels. The typesetter is right, and
          the order matters: measure first, then everything else.
        </p>
        <p>
          The reason is mechanical. A reader&rsquo;s eye makes a return sweep at the end of
          every line. Too long a line and the sweep loses its place, so the reader re-reads a
          line they have already finished. Too short and the sweep happens so often that the
          rhythm of the sentence never establishes itself.
        </p>

        <h2>What the range actually is</h2>
        <p>
          The usual advice is 45 to 75 characters, and the usual advice is close enough. In
          practice the comfortable band for body text on a screen is narrower than the print
          band, because screens are read at a greater distance and under worse contrast:
        </p>
        <ul>
          <li>
            <strong>55&ndash;65 characters</strong> for continuous prose. This is where an
            article body belongs.
          </li>
          <li>
            <strong>40&ndash;50 characters</strong> for a standfirst or a pull quote, which
            are read in one pass rather than continuously.
          </li>
          <li>
            <strong>75+ characters</strong> only for reference material that is scanned, not
            read — a changelog, a spec table, an API list.
          </li>
        </ul>

        <blockquote>
          <p>
            A column that is too wide is not a style problem. It is a comprehension problem
            that looks like a style problem.
          </p>
        </blockquote>

        <h2>Set it in characters, not pixels</h2>
        <p>
          The mistake that outlives most redesigns is setting the column in pixels. A{" "}
          <code>max-width: 720px</code> column is 62 characters at one font size and 88 at
          another, so the moment someone adjusts the type scale the measure silently breaks.
          Set the constraint in the unit the constraint is actually about:
        </p>
        <pre>
          <code>{`.article-body {
  max-width: 62ch;
  margin-inline: auto;
}`}</code>
        </pre>
        <p>
          Now the column is tied to the font, so a later change to size or family carries the
          measure with it. This is why the reading layout in this kit ships a{" "}
          <code>ch</code>-based measure rather than a fixed width, and why the{" "}
          <Link href="/demo/content">index page</Link> uses a wider column than the article:
          an index is scanned, an article is read.
        </p>

        <h2>The test</h2>
        <p>
          There is a cheap check that needs no tooling. Read one full screen of your own body
          copy at arm&rsquo;s length. If you lose your place on a return sweep even once, the
          column is too wide. If the text feels like it is being spoken in short breaths, it
          is too narrow. Adjust, then leave it alone — the measure is not the part of the
          page that should be expressing brand personality.
        </p>
      </>
    ),
  },
  {
    slug: "the-second-life-of-a-jig",
    title: "The second life of a jig",
    excerpt:
      "The tool you build to make the work is usually worth more than the work itself.",
    standfirst:
      "In a workshop, a jig is a throwaway fixture that guarantees a repeatable cut. In practice it outlives the job it was built for — and quietly sets the ceiling on everything made afterwards.",
    category: "Craft",
    date: "2026-05-29",
    readingTime: "6 minute read",
    author: { name: "Meral Yücel", role: "Workshop correspondent" },
    cover: {
      src: "https://picsum.photos/seed/kesit-jig/1200/675",
      alt: "A plywood cutting jig clamped to a bench",
    },
    tags: ["process", "tools", "repeatability"],
    body: (
      <>
        <p>
          A jig is the least glamorous object in a workshop. It is usually made of scrap, it
          is rarely finished, and it exists only to hold a piece of work in one exact
          position while something irreversible happens to it. Nobody photographs the jig.
        </p>
        <p>
          And yet the jig is the reason the tenth piece looks like the first. Skill gets you
          a good result once. A jig gets you the same result three hundred times, on a bad
          day, by someone who was not there when the first one was made.
        </p>

        <h2>Why the second job is the real test</h2>
        <p>
          The first time you build a jig, it costs more than doing the work by hand. The
          arithmetic only turns in your favour on the second job — which is exactly why so
          many jigs are never built. The decision is made under the pressure of a single
          deadline, where hand-fitting is genuinely faster.
        </p>
        <ul>
          <li>One-off work: the jig is overhead.</li>
          <li>Second identical job: the jig breaks even.</li>
          <li>Everything after: the jig is the only reason the work is affordable.</li>
        </ul>

        <blockquote>
          <p>
            You do not build a jig to make this piece. You build it to make the piece after
            the one you can already picture.
          </p>
        </blockquote>

        <h2>The failure mode</h2>
        <p>
          Jigs go wrong when they encode a mistake. A fixture that holds the stock two
          millimetres off will hold it two millimetres off every single time, with perfect
          consistency, which is worse than a hand-cut error because nobody re-checks a jig
          once it has been trusted. The discipline is to measure the jig itself on a schedule,
          not just the parts that come off it.
        </p>
      </>
    ),
  },
  {
    slug: "oak-moves-and-so-should-your-joint",
    title: "Oak moves, and so should your joint",
    excerpt:
      "Seasonal movement is not a defect to be designed out. It is a load to be planned for.",
    standfirst:
      "Wood takes on and gives up moisture for as long as it exists. Every joint either accommodates that movement or eventually loses to it.",
    category: "Materials",
    date: "2026-05-11",
    readingTime: "5 minute read",
    author: { name: "Tomas Beck", role: "Materials desk" },
    cover: {
      src: "https://picsum.photos/seed/kesit-oak/1200/675",
      alt: "End grain of a wide oak board",
    },
    tags: ["wood", "tolerance", "joinery"],
    body: (
      <>
        <p>
          A wide oak board can change its width measurably between a damp spring and a dry
          winter, while barely changing its length at all. That asymmetry — large movement
          across the grain, negligible movement along it — is the single fact that explains
          most furniture failures.
        </p>

        <h2>Where it goes wrong</h2>
        <p>
          Glue a solid panel rigidly into a frame on all four sides and you have built a
          machine for splitting the panel. The panel wants to get narrower in winter; the
          frame will not let it; something has to give, and it is always the panel.
        </p>
        <ul>
          <li>Fix the panel at its centre, so movement is shared to both edges.</li>
          <li>Leave the edges floating in a groove, dry, with room to travel.</li>
          <li>Run fasteners in slots when a solid top meets a rigid base.</li>
        </ul>

        <blockquote>
          <p>The joint is not there to stop the wood moving. It is there to survive it.</p>
        </blockquote>

        <p>
          The same logic applies to anything built from a material that changes dimension
          under conditions you do not control. Design the tolerance in deliberately, or the
          material will find its own — usually along the line you least wanted.
        </p>
      </>
    ),
  },
  {
    slug: "notes-from-a-two-week-bindery",
    title: "Notes from a two-week bindery",
    excerpt:
      "Fourteen days of case binding, and the surprise was how little of it was about glue.",
    standfirst:
      "A short residency in a working bindery, and what a production floor teaches that a manual cannot: sequencing, drying time and the cost of a rushed decision.",
    category: "Field notes",
    date: "2026-04-22",
    readingTime: "8 minute read",
    author: { name: "Ada Kraus", role: "Contributing editor" },
    cover: {
      src: "https://picsum.photos/seed/kesit-bindery/1200/675",
      alt: "Book blocks stacked under weights in a bindery",
    },
    tags: ["bookbinding", "residency", "sequencing"],
    body: (
      <>
        <p>
          I arrived expecting to learn adhesives and left having learned scheduling. In a
          bindery, almost every step is gated by something drying, and drying is the one part
          of the process that refuses to be hurried.
        </p>

        <h2>The floor runs on waiting</h2>
        <p>
          A case-bound book passes through folding, sewing, gluing, rounding, casing-in and
          pressing. Only two of those are limited by the binder&rsquo;s hands. The rest are
          limited by time under weight, which means the skill on display is not dexterity but
          sequencing — knowing what to start now so that the press is never empty.
        </p>
        <ul>
          <li>Start the slowest-drying component first, always.</li>
          <li>Never open a press early to check; the check is what ruins it.</li>
          <li>Batch by drying time, not by title.</li>
        </ul>

        <blockquote>
          <p>
            Everything that went wrong in two weeks went wrong because someone wanted to see
            the result sooner.
          </p>
        </blockquote>

        <h2>What transfers</h2>
        <p>
          Very little of this is specific to books. Any process with an irreversible step and
          a fixed cure time has the same shape, and the same failure: the rushed inspection
          that destroys the thing being inspected. The bindery&rsquo;s answer is a written
          sequence pinned above the press, and no exceptions for urgent work.
        </p>
      </>
    ),
  },
  {
    slug: "a-serif-is-a-decision-not-a-mood",
    title: "A serif is a decision, not a mood",
    excerpt:
      "Choosing a serif because it feels trustworthy is how you end up with a page that reads like every other page.",
    standfirst:
      "Type selection collapses quickly into vibes. The alternative is to state the constraints first and let the shortlist be short.",
    category: "Typography",
    date: "2026-04-03",
    readingTime: "6 minute read",
    author: { name: "Deniz Arslan", role: "Type editor" },
    cover: {
      src: "https://picsum.photos/seed/kesit-serif/1200/675",
      alt: "Metal type sorts arranged in a case",
    },
    tags: ["type selection", "constraints", "hierarchy"],
    body: (
      <>
        <p>
          &ldquo;It feels editorial&rdquo; is not a specification. It is a description of a
          result, offered as though it were a reason, and it is why so many type decisions
          cannot survive a second opinion.
        </p>

        <h2>State the constraints first</h2>
        <p>
          A serif for a display line and a serif for a body column are answering different
          questions. Before opening a specimen, write down what the face has to survive:
        </p>
        <ul>
          <li>The smallest size it will be set at, in the worst rendering environment.</li>
          <li>Whether it needs a full set of Turkish diacritics, and a real italic.</li>
          <li>How many weights the hierarchy genuinely uses — usually two, rarely four.</li>
          <li>Whether it will ever be set over an image.</li>
        </ul>
        <p>
          Four honest constraints will usually eliminate ninety per cent of a shortlist before
          taste is consulted at all. What remains is a small set of faces that all work, and
          at that point choosing on feel is legitimate — because every remaining option is
          already correct.
        </p>

        <blockquote>
          <p>Taste is a good tiebreaker and a terrible filter.</p>
        </blockquote>
      </>
    ),
  },
  {
    slug: "the-shop-that-refuses-to-scale",
    title: "The shop that refuses to scale",
    excerpt:
      "Some workshops stay small on purpose. The reasoning is more rigorous than it first sounds.",
    standfirst:
      "Growth is treated as the default direction. A visit to a deliberately capped studio, and the trade-offs its owners can name out loud.",
    category: "Field notes",
    date: "2026-03-14",
    readingTime: "7 minute read",
    author: { name: "Ada Kraus", role: "Contributing editor" },
    cover: {
      src: "https://picsum.photos/seed/kesit-shop/1200/675",
      alt: "A small workshop interior with hand tools on the wall",
    },
    tags: ["studio", "capacity", "trade-offs"],
    body: (
      <>
        <p>
          The studio has four benches and has had four benches for eleven years. This is not
          an accident of demand, and the owners are unusually specific about why.
        </p>

        <h2>What capping buys</h2>
        <p>
          Beyond a certain size, they argue, the person who makes the work stops making the
          work and starts scheduling other people who make the work. That is a legitimate
          business, but it is a different business, and it is the one they did not want.
        </p>
        <ul>
          <li>Every piece is still touched by someone whose name is on the door.</li>
          <li>Quoting is honest, because the queue is visible.</li>
          <li>A bad month is survivable, because fixed costs stayed small.</li>
        </ul>

        <h2>What it costs</h2>
        <p>
          They are equally direct about the price: they turn down work they would enjoy, they
          cannot absorb a large order, and an injury to one person is a material event rather
          than an inconvenience. None of this is framed as noble. It is framed as a chosen
          set of trade-offs, reviewed annually, with the option to change their minds.
        </p>

        <blockquote>
          <p>
            We are not against growing. We are against growing by default, without anyone
            deciding to.
          </p>
        </blockquote>
      </>
    ),
  },
];

export function articleBySlug(slug: string) {
  return demoArticles.find((article) => article.slug === slug);
}
