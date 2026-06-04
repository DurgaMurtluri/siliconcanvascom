import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Silicon Canvas" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Check your email if confirmation is required.");
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({ to: "/admin" });
      }
    } catch (e: any) {
      toast.error(e.message ?? "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-silicon-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="size-10 bg-electric-blue rounded flex items-center justify-center font-display font-bold text-white">SC</div>
          <span className="font-display text-xl font-bold text-white">Silicon Canvas</span>
        </Link>
        <div className="bg-silicon-900 border border-white/10 rounded-2xl p-8">
          <h1 className="font-display text-2xl font-bold text-white mb-2">
            {mode === "signin" ? "Sign in" : "Create account"}
          </h1>
          <p className="text-sm text-silver mb-6">
            {mode === "signin" ? "Access the admin panel." : "First signup becomes the admin."}
          </p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs font-mono text-silver uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 px-4 py-2.5 bg-silicon-950 border border-white/10 rounded-lg text-white focus:border-electric-blue outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-silver uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full mt-1 px-4 py-2.5 bg-silicon-950 border border-white/10 rounded-lg text-white focus:border-electric-blue outline-none"
              />
            </div>
            <button
              disabled={busy}
              className="w-full py-3 bg-electric-blue hover:bg-blue-600 disabled:opacity-50 text-white rounded-lg font-semibold transition"
            >
              {busy ? "..." : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="w-full mt-4 text-sm text-silver hover:text-electric-blue"
          >
            {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
