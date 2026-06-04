import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Blog — Silicon Canvas" },
      { name: "description", content: "VLSI career advice, interview prep deep-dives, UVM tutorials and stories from real verification engineers." },
      { property: "og:url", content: "/blogs" },
    ],
    links: [{ rel: "canonical", href: "/blogs" }],
  }),
  component: BlogsPage,
});

const posts = [
  { t: "How to Start Your Career in VLSI Verification", r: "8 min", c: "Career" },
  { t: "The 2026 Design Verification Roadmap", r: "12 min", c: "Roadmap" },
  { t: "Cracking the UVM Interview — A Practical Guide", r: "15 min", c: "Interview" },
  { t: "5 Common Interview Mistakes Verification Engineers Make", r: "6 min", c: "Interview" },
  { t: "Preparing for AMD, Intel and NVIDIA Verification Loops", r: "14 min", c: "Interview" },
  { t: "How to Actually Learn UVM (Without Drowning)", r: "10 min", c: "UVM" },
  { t: "The Beginner's Roadmap to DFT", r: "9 min", c: "DFT" },
  { t: "A Day in the Life of a Verification Engineer", r: "7 min", c: "Career" },
];

function BlogsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Field Notes"
        title="Stories from the verification trenches."
        subtitle="Practical career advice, deep-dive tutorials and real engineering perspective."
      />
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-5">
          {posts.map((p) => (
            <article key={p.t} className="group bg-silicon-900 border border-white/10 rounded-2xl p-6 hover:border-electric-blue/40 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-4 text-xs font-mono">
                <span className="text-electric-blue uppercase tracking-wider">{p.c}</span>
                <span className="text-silver/40">·</span>
                <span className="text-silver/60">{p.r} read</span>
              </div>
              <h3 className="font-display text-xl font-bold text-white leading-snug group-hover:text-electric-blue transition-colors">
                {p.t}
              </h3>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
