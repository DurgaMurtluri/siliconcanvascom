import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RichEditor } from "@/components/RichEditor";
import { SECTIONS, slugify } from "@/lib/sections";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Eye, EyeOff, X } from "lucide-react";

export const Route = createFileRoute("/admin/articles")({
  component: ArticlesAdmin,
});

interface Article {
  id: string;
  section: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_url: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
}

function ArticlesAdmin() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Article | null>(null);
  const [creating, setCreating] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-articles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Article[];
    },
  });

  async function togglePublish(a: Article) {
    const { error } = await supabase.from("articles").update({ published: !a.published }).eq("id", a.id);
    if (error) return toast.error(error.message);
    toast.success(a.published ? "Unpublished" : "Published");
    qc.invalidateQueries({ queryKey: ["admin-articles"] });
  }
  async function remove(a: Article) {
    if (!confirm(`Delete "${a.title}"?`)) return;
    const { error } = await supabase.from("articles").delete().eq("id", a.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["admin-articles"] });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Articles</h1>
          <p className="text-silver text-sm mt-1">{data?.length ?? 0} total</p>
        </div>
        <button onClick={() => setCreating(true)} className="px-4 py-2.5 bg-electric-blue hover:bg-blue-600 text-white rounded-lg font-semibold text-sm flex items-center gap-2">
          <Plus className="size-4" /> New Article
        </button>
      </div>

      {isLoading ? (
        <p className="text-silver">Loading…</p>
      ) : data?.length === 0 ? (
        <div className="bg-silicon-900 border border-white/10 rounded-2xl p-12 text-center">
          <p className="text-silver mb-4">No articles yet. Write your first one.</p>
          <button onClick={() => setCreating(true)} className="px-5 py-2.5 bg-electric-blue text-white rounded-lg font-semibold text-sm">Create article</button>
        </div>
      ) : (
        <div className="bg-silicon-900 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-silicon-950/50 text-xs uppercase font-mono text-silver">
              <tr>
                <th className="text-left px-5 py-3">Title</th>
                <th className="text-left px-5 py-3 hidden md:table-cell">Section</th>
                <th className="text-left px-5 py-3 hidden lg:table-cell">Updated</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {data!.map((a) => (
                <tr key={a.id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="px-5 py-3 font-medium">{a.title}</td>
                  <td className="px-5 py-3 hidden md:table-cell text-silver">{a.section}</td>
                  <td className="px-5 py-3 hidden lg:table-cell text-silver text-xs">{new Date(a.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-mono px-2 py-1 rounded ${a.published ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"}`}>
                      {a.published ? "PUBLISHED" : "DRAFT"}
                    </span>
                  </td>
                  <td className="px-5 py-3 flex items-center gap-1 justify-end">
                    <button onClick={() => togglePublish(a)} className="p-2 text-silver hover:text-electric-blue" title={a.published ? "Unpublish" : "Publish"}>
                      {a.published ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                    <button onClick={() => setEditing(a)} className="p-2 text-silver hover:text-electric-blue" title="Edit"><Edit2 className="size-4" /></button>
                    <button onClick={() => remove(a)} className="p-2 text-silver hover:text-red-400" title="Delete"><Trash2 className="size-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(creating || editing) && (
        <ArticleEditor
          article={editing ?? undefined}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSaved={() => { qc.invalidateQueries({ queryKey: ["admin-articles"] }); setEditing(null); setCreating(false); }}
        />
      )}
    </div>
  );
}

function ArticleEditor({ article, onClose, onSaved }: { article?: Article; onClose: () => void; onSaved: () => void }) {
  const [title, setTitle] = useState(article?.title ?? "");
  const [section, setSection] = useState(article?.section ?? "blog");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [cover, setCover] = useState(article?.cover_url ?? "");
  const [tags, setTags] = useState((article?.tags ?? []).join(", "));
  const [content, setContent] = useState(article?.content ?? "");
  const [published, setPublished] = useState(article?.published ?? false);
  const [busy, setBusy] = useState(false);

  async function save() {
    if (!title.trim()) return toast.error("Title required");
    const finalSlug = (slug || slugify(title)).trim();
    const payload = {
      title: title.trim(),
      section: section as any,
      slug: finalSlug,
      excerpt: excerpt.trim() || null,
      cover_url: cover.trim() || null,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      content,
      published,
    };
    setBusy(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (article) {
        const { error } = await supabase.from("articles").update(payload).eq("id", article.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("articles").insert({ ...payload, author_id: user?.id });
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
        <div className="max-w-4xl mx-auto bg-silicon-950 border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 sticky top-0 bg-silicon-950 z-10">
            <h2 className="font-display text-xl font-bold">{article ? "Edit article" : "New article"}</h2>
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
            <Field label="Title">
              <input value={title} onChange={(e) => { setTitle(e.target.value); if (!article && !slug) setSlug(slugify(e.target.value)); }} className="w-full px-4 py-2.5 bg-silicon-900 border border-white/10 rounded-lg text-white focus:border-electric-blue outline-none" />
            </Field>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Section">
                <select value={section} onChange={(e) => setSection(e.target.value)} className="w-full px-4 py-2.5 bg-silicon-900 border border-white/10 rounded-lg text-white focus:border-electric-blue outline-none">
                  {SECTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </Field>
              <Field label="URL slug">
                <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-from-title" className="w-full px-4 py-2.5 bg-silicon-900 border border-white/10 rounded-lg text-white focus:border-electric-blue outline-none font-mono text-sm" />
              </Field>
            </div>
            <Field label="Excerpt (1–2 sentences shown in lists)">
              <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className="w-full px-4 py-2.5 bg-silicon-900 border border-white/10 rounded-lg text-white focus:border-electric-blue outline-none" />
            </Field>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Cover image URL (optional)">
                <input value={cover} onChange={(e) => setCover(e.target.value)} placeholder="https://…" className="w-full px-4 py-2.5 bg-silicon-900 border border-white/10 rounded-lg text-white focus:border-electric-blue outline-none text-sm" />
              </Field>
              <Field label="Tags (comma-separated)">
                <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="uvm, factory, beginners" className="w-full px-4 py-2.5 bg-silicon-900 border border-white/10 rounded-lg text-white focus:border-electric-blue outline-none text-sm" />
              </Field>
            </div>
            <Field label="Content">
              <RichEditor value={content} onChange={setContent} />
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-mono text-silver uppercase tracking-wider block mb-1.5">{label}</label>
      {children}
    </div>
  );
}
