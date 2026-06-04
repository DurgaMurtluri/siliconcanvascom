import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RichEditor } from "@/components/RichEditor";
import { SECTIONS } from "@/lib/sections";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Eye, EyeOff, X } from "lucide-react";

export const Route = createFileRoute("/admin/questions")({
  component: QuestionsAdmin,
});

interface Q {
  id: string;
  section: string;
  question: string;
  answer: string;
  difficulty: string;
  tags: string[];
  published: boolean;
  created_at: string;
}

const DIFFICULTIES = ["easy", "medium", "hard"];

function QuestionsAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Q | null>(null);
  const [creating, setCreating] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const { data } = useQuery({
    queryKey: ["admin-questions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("interview_questions").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Q[];
    },
  });

  const filtered = data?.filter((q) => filter === "all" || q.section === filter) ?? [];

  async function togglePublish(q: Q) {
    const { error } = await supabase.from("interview_questions").update({ published: !q.published }).eq("id", q.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-questions"] });
  }
  async function remove(q: Q) {
    if (!confirm("Delete this question?")) return;
    const { error } = await supabase.from("interview_questions").delete().eq("id", q.id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["admin-questions"] });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Interview Q&A</h1>
          <p className="text-silver text-sm mt-1">{data?.length ?? 0} total</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2 bg-silicon-900 border border-white/10 rounded-lg text-sm">
            <option value="all">All sections</option>
            {SECTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <button onClick={() => setCreating(true)} className="px-4 py-2.5 bg-electric-blue hover:bg-blue-600 text-white rounded-lg font-semibold text-sm flex items-center gap-2">
            <Plus className="size-4" /> New Question
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-silicon-900 border border-white/10 rounded-2xl p-12 text-center">
          <p className="text-silver mb-4">No questions yet.</p>
          <button onClick={() => setCreating(true)} className="px-5 py-2.5 bg-electric-blue text-white rounded-lg font-semibold text-sm">Create question</button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((q) => (
            <div key={q.id} className="bg-silicon-900 border border-white/10 rounded-xl p-5 flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono">
                  <span className="text-electric-blue uppercase">{q.section}</span>
                  <span className="text-silver/50">·</span>
                  <span className="text-silver">{q.difficulty}</span>
                  <span className={`ml-2 px-2 py-0.5 rounded ${q.published ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                    {q.published ? "PUBLISHED" : "DRAFT"}
                  </span>
                </div>
                <h3 className="font-display font-bold text-white">{q.question}</h3>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => togglePublish(q)} className="p-2 text-silver hover:text-electric-blue">
                  {q.published ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
                <button onClick={() => setEditing(q)} className="p-2 text-silver hover:text-electric-blue"><Edit2 className="size-4" /></button>
                <button onClick={() => remove(q)} className="p-2 text-silver hover:text-red-400"><Trash2 className="size-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(creating || editing) && (
        <QEditor q={editing ?? undefined} onClose={() => { setEditing(null); setCreating(false); }} onSaved={() => { qc.invalidateQueries({ queryKey: ["admin-questions"] }); setEditing(null); setCreating(false); }} />
      )}
    </div>
  );
}

function QEditor({ q, onClose, onSaved }: { q?: Q; onClose: () => void; onSaved: () => void }) {
  const [question, setQuestion] = useState(q?.question ?? "");
  const [section, setSection] = useState(q?.section ?? "interview");
  const [difficulty, setDifficulty] = useState(q?.difficulty ?? "medium");
  const [tags, setTags] = useState((q?.tags ?? []).join(", "));
  const [answer, setAnswer] = useState(q?.answer ?? "");
  const [published, setPublished] = useState(q?.published ?? false);
  const [busy, setBusy] = useState(false);

  async function save() {
    if (!question.trim()) return toast.error("Question required");
    const payload = {
      question: question.trim(),
      section: section as any,
      difficulty,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      answer,
      published,
    };
    setBusy(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (q) {
        const { error } = await supabase.from("interview_questions").update(payload).eq("id", q.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("interview_questions").insert({ ...payload, author_id: user?.id });
        if (error) throw error;
      }
      toast.success("Saved");
      onSaved();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] overflow-y-auto">
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-3xl mx-auto bg-silicon-950 border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 bg-silicon-950 z-10">
            <h2 className="font-display text-xl font-bold">{q ? "Edit question" : "New question"}</h2>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-silver cursor-pointer">
                <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
                Published
              </label>
              <button onClick={save} disabled={busy} className="px-4 py-2 bg-electric-blue hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg text-sm font-semibold">
                {busy ? "Saving…" : "Save"}
              </button>
              <button onClick={onClose} className="p-2 text-silver hover:text-white"><X className="size-5" /></button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="text-xs font-mono text-silver uppercase tracking-wider block mb-1.5">Question</label>
              <textarea value={question} onChange={(e) => setQuestion(e.target.value)} rows={2} className="w-full px-4 py-2.5 bg-silicon-900 border border-white/10 rounded-lg text-white focus:border-electric-blue outline-none" />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-mono text-silver uppercase tracking-wider block mb-1.5">Section</label>
                <select value={section} onChange={(e) => setSection(e.target.value)} className="w-full px-4 py-2.5 bg-silicon-900 border border-white/10 rounded-lg text-white">
                  {SECTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-mono text-silver uppercase tracking-wider block mb-1.5">Difficulty</label>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full px-4 py-2.5 bg-silicon-900 border border-white/10 rounded-lg text-white">
                  {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-mono text-silver uppercase tracking-wider block mb-1.5">Tags</label>
                <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="uvm, factory" className="w-full px-4 py-2.5 bg-silicon-900 border border-white/10 rounded-lg text-white text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-mono text-silver uppercase tracking-wider block mb-1.5">Answer</label>
              <RichEditor value={answer} onChange={setAnswer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
