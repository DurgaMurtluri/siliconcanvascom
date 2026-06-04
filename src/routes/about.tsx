import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Silicon Canvas" },
      { name: "description", content: "Silicon Canvas is a mentorship-driven VLSI verification learning platform built by engineers, for engineers." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About"
        title="A mentor in your pocket."
        subtitle="Silicon Canvas exists because most VLSI learning resources teach syntax — not the engineering judgment that gets you hired."
      />
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 space-y-8 text-silver leading-relaxed">
          <p>
            We built Silicon Canvas to be the resource we wished existed when we entered the
            semiconductor industry: a structured roadmap, real industry examples, practical
            debugging stories, and interview preparation grounded in what actually happens in
            verification teams at Tier-1 chip companies.
          </p>
          <p>
            Every topic page follows the same proven structure — overview, why it matters,
            architecture, example, verification approach, common bugs, assertions, functional
            coverage, interview questions, and a quiz. No fluff. No academic jargon. Just the
            mentorship a beginner deserves.
          </p>
          <p>
            Whether you're an ECE student, a software engineer pivoting into hardware, or an
            international graduate preparing for the semiconductor job market — Silicon Canvas
            is the roadmap that takes you from <em className="text-white not-italic font-semibold">"I know nothing about VLSI"</em> to{" "}
            <em className="text-white not-italic font-semibold">"I am interview ready."</em>
          </p>
          <div className="pt-6">
            <Link to="/roadmap" className="inline-block px-6 py-3 bg-electric-blue text-white rounded-lg text-sm font-semibold">
              Start the Roadmap →
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
