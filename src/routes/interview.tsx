import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const Route = createFileRoute("/interview")({
  head: () => ({
    meta: [
      { title: "Verification Interview Preparation — Silicon Canvas" },
      { name: "description", content: "UVM, SystemVerilog, Assertions, DFT, Timing, Protocols and scenario-based debugging interview questions for VLSI verification roles." },
      { property: "og:url", content: "/interview" },
    ],
    links: [{ rel: "canonical", href: "/interview" }],
  }),
  component: InterviewPage,
});

const categories = [
  { t: "UVM", c: "uvm", d: "Phases, factory, ConfigDB, sequences and override scenarios." },
  { t: "SystemVerilog", c: "systemverilog", d: "OOP, randomization, constraint solving, clocking and coverage." },
  { t: "DFT", c: "dft", d: "Scan, ATPG, JTAG, MBIST and at-speed test." },
  { t: "Protocols", c: "protocols", d: "AXI handshake, PCIe layers, DDR refresh, I2C arbitration." },
  { t: "General Interview", c: "interview", d: "Scenario-based debugging and verification fundamentals." },
];

function InterviewPage() {
  const [section, setSection] = useState<string | null>(null);

  const { data: questions } = useQuery({
    queryKey: ["public-questions", section],
    queryFn: async () => {
      let q = supabase.from("interview_questions").select("*").eq("published", true).order("created_at", { ascending: false });
      if (section) q = q.eq("section", section as any);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
  });

  const counts = useQuery({
    queryKey: ["question-counts"],
    queryFn: async () => {
      const { data } = await supabase.from("interview_questions").select("section").eq("published", true);
      const map: Record<string, number> = {};
      (data ?? []).forEach((r: any) => { map[r.section] = (map[r.section] ?? 0) + 1; });
      return map;
    },
  });

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Interview Hub"
        title="Walk into your verification interview prepared."
        subtitle="Real questions organized by category. Browse, study, and master the topics that matter."
      />
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            <button
              onClick={() => setSection(null)}
              className={`text-left bg-silicon-900 border rounded-2xl p-5 transition ${section === null ? "border-electric-blue" : "border-white/10 hover:border-electric-blue/40"}`}
            >
              <div className="font-mono text-xs text-electric-blue mb-2">ALL</div>
              <div className="font-display font-bold text-white">Everything</div>
            </button>
            {categories.map((c) => (
              <button
                key={c.c}
                onClick={() => setSection(c.c)}
                className={`text-left group bg-silicon-900 border rounded-2xl p-5 transition ${section === c.c ? "border-electric-blue" : "border-white/10 hover:border-electric-blue/40"}`}
              >
                <div className="font-mono text-xs text-electric-blue mb-2">{counts.data?.[c.c] ?? 0} Q</div>
                <div className="font-display font-bold text-white mb-1">{c.t}</div>
                <div className="text-xs text-silver leading-relaxed">{c.d}</div>
              </button>
            ))}
          </div>

          {(!questions || questions.length === 0) ? (
            <div className="bg-silicon-900 border border-white/10 rounded-2xl p-12 text-center">
              <p className="text-silver">No questions in this section yet. Check back soon — new content is added regularly.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {questions.map((q: any) => <QuestionItem key={q.id} q={q} />)}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function QuestionItem({ q }: { q: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-silicon-900 border border-white/10 rounded-xl overflow-hidden hover:border-electric-blue/30 transition">
      <button onClick={() => setOpen(!open)} className="w-full text-left p-5 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 text-xs font-mono">
            <span className="text-electric-blue uppercase">{q.section}</span>
            <span className="text-silver/40">·</span>
            <span className="text-silver">{q.difficulty}</span>
          </div>
          <h3 className="font-display font-bold text-white">{q.question}</h3>
        </div>
        <ChevronDown className={`size-5 text-silver shrink-0 mt-1 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && q.answer && (
        <div
          className="prose prose-invert max-w-none px-5 pb-5 border-t border-white/5 pt-4 prose-headings:font-display prose-headings:text-white prose-p:text-silver prose-strong:text-white prose-code:text-cyan-glow prose-a:text-electric-blue prose-pre:bg-silicon-950"
          dangerouslySetInnerHTML={{ __html: q.answer }}
        />
      )}
    </div>
  );
}
