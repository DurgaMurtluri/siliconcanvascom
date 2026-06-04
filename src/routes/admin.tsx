import { createFileRoute, useNavigate, Outlet, Link, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { FileText, MessageSquare, LogOut, Home } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Silicon Canvas" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user, isAdmin, isEditor, loading } = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  if (loading) return <div className="min-h-screen bg-silicon-950 text-silver flex items-center justify-center">Loading…</div>;
  if (!user) return null;
  if (!isEditor && !isAdmin) {
    return (
      <div className="min-h-screen bg-silicon-950 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-2xl font-bold text-white mb-3">No editor access</h1>
          <p className="text-silver mb-6">Your account is signed in but does not have edit permissions. Ask the site owner to grant you the editor or admin role.</p>
          <button onClick={() => supabase.auth.signOut().then(() => navigate({ to: "/auth" }))} className="px-5 py-2.5 bg-electric-blue text-white rounded-lg text-sm font-semibold">Sign out</button>
        </div>
      </div>
    );
  }

  const tabs = [
    { to: "/admin", label: "Overview", icon: Home, exact: true },
    { to: "/admin/articles", label: "Articles", icon: FileText },
    { to: "/admin/questions", label: "Interview Q&A", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-silicon-950 text-white">
      <header className="border-b border-white/10 bg-silicon-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="size-8 bg-electric-blue rounded flex items-center justify-center font-display font-bold text-sm">SC</div>
              <span className="font-display font-bold">Admin</span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map((t) => {
                const active = t.exact ? path === t.to : path.startsWith(t.to);
                return (
                  <Link key={t.to} to={t.to} className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${active ? "bg-electric-blue/20 text-electric-blue" : "text-silver hover:text-white"}`}>
                    <t.icon className="size-4" /> {t.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline text-silver">{user.email}</span>
            {isAdmin && <span className="text-xs font-mono bg-electric-blue/20 text-electric-blue px-2 py-1 rounded">ADMIN</span>}
            <button
              onClick={() => supabase.auth.signOut().then(() => navigate({ to: "/auth" }))}
              className="p-2 text-silver hover:text-white" title="Sign out"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
        <div className="md:hidden border-t border-white/10 px-6 py-2 flex gap-2 overflow-x-auto">
          {tabs.map((t) => (
            <Link key={t.to} to={t.to} className="text-xs whitespace-nowrap px-3 py-1.5 rounded bg-silicon-900 text-silver">
              {t.label}
            </Link>
          ))}
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
