import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

function BlogsPage() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["public-articles", "blog"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Field Notes"
        title="Stories from the verification trenches."
        subtitle="Practical career advice, deep-dive tutorials and real engineering perspective."
      />
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          {isLoading ? (
            <p className="text-silver text-center">Loading…</p>
          ) : !posts || posts.length === 0 ? (
            <div className="bg-silicon-900 border border-white/10 rounded-2xl p-12 text-center">
              <p className="text-silver">No articles published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {posts.map((p: any) => (
                <Link
                  key={p.id}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group bg-silicon-900 border border-white/10 rounded-2xl p-6 hover:border-electric-blue/40 transition-all block"
                >
                  <div className="flex items-center gap-3 mb-4 text-xs font-mono">
                    <span className="text-electric-blue uppercase tracking-wider">{p.section}</span>
                    <span className="text-silver/40">·</span>
                    <span className="text-silver/60">{new Date(p.created_at).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white leading-snug group-hover:text-electric-blue transition-colors mb-2">
                    {p.title}
                  </h3>
                  {p.excerpt && <p className="text-sm text-silver leading-relaxed">{p.excerpt}</p>}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
