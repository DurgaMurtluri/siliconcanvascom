import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <SiteLayout><div className="max-w-3xl mx-auto px-6 py-20 text-silver">Loading…</div></SiteLayout>;
  }

  if (!data) {
    return (
      <SiteLayout>
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-white mb-3">Article not found</h1>
          <Link to="/blogs" className="text-electric-blue">← Back to all articles</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-silver hover:text-electric-blue mb-8">
          <ArrowLeft className="size-4" /> All articles
        </Link>
        <div className="flex items-center gap-3 mb-4 text-xs font-mono">
          <span className="text-electric-blue uppercase tracking-wider">{data.section}</span>
          <span className="text-silver/40">·</span>
          <span className="text-silver">{new Date(data.created_at).toLocaleDateString()}</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{data.title}</h1>
        {data.excerpt && <p className="text-lg text-silver mb-8 leading-relaxed">{data.excerpt}</p>}
        {data.cover_url && (
          <img src={data.cover_url} alt={data.title} className="w-full rounded-2xl mb-10" />
        )}
        <div
          className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-silver prose-li:text-silver prose-strong:text-white prose-code:text-cyan-glow prose-a:text-electric-blue prose-pre:bg-silicon-900 prose-blockquote:border-electric-blue"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </article>
    </SiteLayout>
  );
}
