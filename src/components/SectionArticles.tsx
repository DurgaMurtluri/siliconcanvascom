import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  section: string;
  heading?: string;
}

export function SectionArticles({ section, heading = "Latest articles" }: Props) {
  const { data } = useQuery({
    queryKey: ["section-articles", section],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id, title, slug, excerpt, created_at, section")
        .eq("section", section as any)
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data;
    },
  });

  if (!data || data.length === 0) return null;

  return (
    <section className="py-16 border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-display text-2xl font-bold text-white mb-6">{heading}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {data.map((p: any) => (
            <Link
              key={p.id}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group bg-silicon-900 border border-white/10 rounded-xl p-5 hover:border-electric-blue/40 transition block"
            >
              <div className="text-xs font-mono text-silver/60 mb-2">
                {new Date(p.created_at).toLocaleDateString()}
              </div>
              <h3 className="font-display font-bold text-white group-hover:text-electric-blue transition mb-1">
                {p.title}
              </h3>
              {p.excerpt && <p className="text-sm text-silver leading-relaxed line-clamp-2">{p.excerpt}</p>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
