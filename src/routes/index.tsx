import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cpu, GitBranch, Bug, BookOpen, Layers, Target, Sparkles, Zap } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import heroChip from "@/assets/hero-chip.jpg";
import trackAxi from "@/assets/track-axi.jpg";
import trackDft from "@/assets/track-dft.jpg";
import trackInterview from "@/assets/track-interview.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Silicon Canvas — Master VLSI Design Verification, Step by Step" },
      { name: "description", content: "Learn SystemVerilog, UVM, Assertions, AXI, PCIe, DDR, DFT, debugging and interview prep with beginner-friendly explanations and real industry examples." },
      { property: "og:title", content: "Silicon Canvas — Master VLSI Design Verification" },
      { property: "og:description", content: "From beginner to silicon engineer. Your complete VLSI verification roadmap." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const roadmap = [
  { phase: "01", title: "Digital Design", desc: "CMOS, gates, FSM, timing, CDC and STA basics." },
  { phase: "02", title: "Verilog", desc: "Always blocks, FSM coding, RTL patterns." },
  { phase: "03", title: "SystemVerilog", desc: "OOP, randomization, constraints, coverage." },
  { phase: "04", title: "UVM", desc: "Architecture, factory, sequencer, scoreboard, RAL." },
  { phase: "05", title: "Assertions", desc: "SVA, properties, sequences, coverage closure." },
  { phase: "06", title: "Protocols", desc: "AXI, AHB, APB, PCIe, DDR, SPI, I2C, UART." },
  { phase: "07", title: "DFT", desc: "Scan, ATPG, MBIST, JTAG, boundary scan." },
  { phase: "08", title: "Low Power", desc: "UPF, isolation, retention, power domains." },
  { phase: "09", title: "Projects", desc: "Hands-on UVM testbenches and VIP builds." },
  { phase: "10", title: "Interview Prep", desc: "Scenario debugging, mock interviews, resume." },
];

const why = [
  { icon: BookOpen, title: "Beginner Friendly", desc: "Easy explanations that assume zero background." },
  { icon: Cpu, title: "Practical Industry Learning", desc: "How real verification teams actually work." },
  { icon: Target, title: "Real Interview Questions", desc: "From actual loops at top semiconductor companies." },
  { icon: Layers, title: "Hands-on Projects", desc: "Build real UVM testbenches from scratch." },
  { icon: Bug, title: "Debugging Mindset", desc: "Learn how senior engineers root-cause SoC bugs." },
  { icon: GitBranch, title: "Structured Roadmap", desc: "A clear path from zero to job-ready." },
];

const tracks = [
  { tag: "POPULAR", title: "AXI4 Masterclass", desc: "Handshake logic, burst types, and a full UVM-compliant AXI VIP from scratch.", meta: "12 lessons · 3 projects", img: trackAxi, to: "/protocols" as const },
  { tag: "ADVANCED", title: "DFT Foundations", desc: "Scan, ATPG, MBIST, and JTAG — critical skills for modern SoC verification.", meta: "18 lessons · Tessent lab", img: trackDft, to: "/dft" as const },
  { tag: "CAREER", title: "Interview Hub", desc: "500+ scenario-based questions from Intel, NVIDIA, AMD and Qualcomm loops.", meta: "Daily quiz · Resume tips", img: trackInterview, to: "/interview" as const },
];

function Index() {
  return (
    <SiteLayout>
      {/* HERO */}
      <header className="relative pt-20 pb-28 overflow-hidden">
        <div className="absolute inset-0 circuit-grid opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-electric-blue/10 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 mb-6">
                <span className="size-2 rounded-full bg-electric-blue animate-pulse" />
                <span className="text-xs font-mono font-medium text-electric-blue tracking-wider uppercase">
                  Learn · Build · Verify
                </span>
              </div>
              <h1 className="font-display text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
                Master VLSI Design{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-glow">
                  Verification
                </span>{" "}
                — Step by Step
              </h1>
              <p className="text-lg text-silver leading-relaxed mb-10 max-w-xl">
                Learn SystemVerilog, UVM, Assertions, AXI, PCIe, DDR, DFT, debugging, and
                interview preparation with beginner-friendly explanations and real industry examples.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/roadmap" className="px-6 py-3.5 bg-white text-silicon-950 font-bold rounded-xl hover:bg-silver transition-colors inline-flex items-center gap-2">
                  Start Learning <ArrowRight className="size-4" />
                </Link>
                <Link to="/roadmap" className="px-6 py-3.5 bg-silicon-800 border border-white/10 text-white font-bold rounded-xl hover:bg-silicon-700 transition-colors">
                  Explore Roadmap
                </Link>
                <Link to="/interview" className="px-6 py-3.5 bg-silicon-800 border border-white/10 text-white font-bold rounded-xl hover:bg-silicon-700 transition-colors">
                  Interview Prep
                </Link>
                <Link to="/projects" className="px-6 py-3.5 bg-silicon-800 border border-white/10 text-white font-bold rounded-xl hover:bg-silicon-700 transition-colors">
                  Hands-on Projects
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-silicon-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl glow-border">
                <img
                  src={heroChip}
                  alt="Semiconductor chip with glowing data traces representing VLSI verification flow"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-silicon-800 border border-white/10 p-5 rounded-2xl shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-400 font-mono text-lg font-bold">98%</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Career Ready</p>
                    <p className="text-xs text-silver">Interview pass rate</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-silicon-800 border border-white/10 px-4 py-3 rounded-xl shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <Zap className="size-4 text-cyan-glow" />
                  <span className="text-xs font-mono text-white">UVM · SVA · DFT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ROADMAP */}
      <section className="py-24 bg-silicon-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-electric-blue uppercase tracking-widest">The Pipeline</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mt-3 mb-4">
              Your Verification Roadmap
            </h2>
            <p className="text-silver max-w-2xl mx-auto">
              From "I know nothing about VLSI" to "I am interview ready." The exact sequence
              followed by Tier-1 semiconductor teams.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {roadmap.map((r) => (
              <Link
                to="/roadmap"
                key={r.phase}
                className="group relative p-6 bg-silicon-800 border border-white/5 rounded-2xl hover:border-electric-blue/50 transition-all"
              >
                <span className="font-mono text-xs text-electric-blue mb-3 block">
                  PHASE {r.phase}
                </span>
                <h3 className="text-lg font-bold text-white mb-2 font-display">{r.title}</h3>
                <p className="text-xs text-silver leading-relaxed mb-4">{r.desc}</p>
                <div className="h-px w-8 bg-electric-blue/30 group-hover:w-full transition-all duration-500" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/roadmap" className="inline-flex items-center gap-2 text-electric-blue text-sm font-semibold hover:underline">
              View full roadmap <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 max-w-2xl">
            <span className="font-mono text-xs text-electric-blue uppercase tracking-widest">Why Silicon Canvas</span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mt-3">
              Taught like a senior engineer mentoring you.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {why.map((w) => (
              <div key={w.title} className="p-6 bg-silicon-900 border border-white/5 rounded-2xl hover:border-electric-blue/30 transition-colors">
                <div className="size-11 rounded-lg bg-electric-blue/10 border border-electric-blue/20 flex items-center justify-center mb-5">
                  <w.icon className="size-5 text-electric-blue" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{w.title}</h3>
                <p className="text-sm text-silver leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACKS */}
      <section className="py-24 bg-silicon-900/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-between items-end mb-12 gap-4">
            <div>
              <span className="font-mono text-xs text-electric-blue uppercase tracking-widest">Featured</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mt-3">
                Learning Tracks
              </h2>
              <p className="text-silver mt-2">Focused modules for specific verification domains.</p>
            </div>
            <Link to="/learn" className="text-electric-blue text-sm font-semibold hover:underline inline-flex items-center gap-1">
              View all tracks <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {tracks.map((t) => (
              <Link
                key={t.title}
                to={t.to}
                className="bg-silicon-900 border border-white/10 rounded-2xl overflow-hidden group hover:border-electric-blue/40 transition-colors"
              >
                <div className="aspect-[2/1] overflow-hidden bg-silicon-800">
                  <img src={t.img} alt={t.title} width={800} height={400} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-display text-xl font-bold text-white">{t.title}</h3>
                    <span className="bg-electric-blue/10 text-electric-blue text-[10px] font-bold px-2 py-1 rounded">{t.tag}</span>
                  </div>
                  <p className="text-sm text-silver mb-5 leading-relaxed">{t.desc}</p>
                  <p className="text-xs font-mono text-silver/60">{t.meta}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            ["12k+", "Engineers Trained"],
            ["450+", "Interview Scenarios"],
            ["15+", "Industry Protocols"],
            ["98%", "Positive Feedback"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl lg:text-4xl font-bold text-white">{n}</div>
              <div className="font-mono text-[10px] text-silver uppercase tracking-widest mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 circuit-grid opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-electric-blue/10 blur-[120px] rounded-full" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Sparkles className="size-8 text-electric-blue mx-auto mb-6" />
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to verify your future?
          </h2>
          <p className="text-silver mb-10 text-lg max-w-xl mx-auto">
            Join engineers worldwide who started their semiconductor career with Silicon Canvas.
          </p>
          <div className="inline-block p-[1px] bg-gradient-to-r from-electric-blue to-cyan-glow rounded-xl">
            <Link to="/roadmap" className="block px-10 py-4 bg-silicon-950 text-white font-bold rounded-[11px] hover:bg-silicon-900 transition-all">
              Get My Learning Roadmap
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric-blue/40 to-transparent" />
      </section>
    </SiteLayout>
  );
}
