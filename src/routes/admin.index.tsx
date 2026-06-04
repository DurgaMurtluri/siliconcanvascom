import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FileText, MessageSquare, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Overview,
});

function Overview() {
  const articles = useQuery({
    queryKey: ["admin-articles-count"],
    queryFn: async () => {
      const { count } = await supabase.from("articles").select("*", { count: "exact", head: true });
      const { count: published } = await supabase.from("articles").select("*", { count: "exact", head: true }).eq("published", true);
      return { total: count ?? 0, published: published ?? 0 };
    },
  });
  const questions = useQuery({
    queryKey: ["admin-questions-count"],
    queryFn: async () => {
      const { count } = await supabase.from("interview_questions").select("*", { count: "exact", head: true });
      const { count: published } = await supabase.from("interview_questions").select("*", { count: "exact", head: true }).eq("published", true);
      return { total: count ?? 0, published: published ?? 0 };
    },
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-bold mb-2">Content Overview</h1>
      <p className="text-silver mb-8">Manage everything that appears on Silicon Canvas.</p>

      <div className="grid sm:grid-cols-2 gap-5">
        <Card
          icon={<FileText className="size-5" />}
          title="Articles"
          total={articles.data?.total ?? 0}
          published={articles.data?.published ?? 0}
          to="/admin/articles"
          desc="Blog posts, tutorials, UVM/DFT/Protocols deep-dives."
        />
        <Card
          icon={<MessageSquare className="size-5" />}
          title="Interview Questions"
          total={questions.data?.total ?? 0}
          published={questions.data?.published ?? 0}
          to="/admin/questions"
          desc="Q&A bank by section: SystemVerilog, UVM, DFT, Protocols."
        />
      </div>

      <div className="mt-10 bg-silicon-900 border border-white/10 rounded-2xl p-6">
        <h2 className="font-display text-lg font-bold mb-3">Quick tips</h2>
        <ul className="space-y-2 text-sm text-silver list-disc list-inside">
          <li>Each article belongs to a <strong className="text-white">section</strong> — pick the right one so it appears under the matching page (UVM, DFT, etc).</li>
          <li>Toggle <strong className="text-white">Published</strong> when ready. Drafts are only visible to admins/editors.</li>
          <li>Use the rich editor toolbar for headings, code blocks, lists, links and images.</li>
        </ul>
      </div>
    </div>
  );
}

function Card({ icon, title, total, published, to, desc }: any) {
  return (
    <Link to={to} className="block bg-silicon-900 border border-white/10 rounded-2xl p-6 hover:border-electric-blue/40 transition">
      <div className="flex items-center justify-between mb-4">
        <div className="size-10 rounded-lg bg-electric-blue/10 text-electric-blue flex items-center justify-center">{icon}</div>
        <Plus className="size-4 text-silver" />
      </div>
      <h3 className="font-display text-lg font-bold mb-1">{title}</h3>
      <p className="text-sm text-silver mb-4">{desc}</p>
      <div className="flex items-center gap-4 text-sm">
        <span><span className="text-white font-bold">{total}</span> <span className="text-silver">total</span></span>
        <span><span className="text-electric-blue font-bold">{published}</span> <span className="text-silver">published</span></span>
      </div>
    </Link>
  );
}
