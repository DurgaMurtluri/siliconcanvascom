import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "Learning Tracks — Silicon Canvas" },
      { name: "description", content: "Browse all VLSI verification learning tracks: Digital Design, Verilog, SystemVerilog, UVM, Assertions, Coverage, Protocols, and DFT." },
      { property: "og:url", content: "/learn" },
    ],
    links: [{ rel: "canonical", href: "/learn" }],
  }),
  component: LearnPage,
});

const tracks = [
  { cat: "Foundations", items: ["Digital Design", "Verilog RTL", "SystemVerilog", "Assertions (SVA)", "Functional Coverage"] },
  { cat: "UVM", items: ["UVM Architecture", "Components & Phases", "Factory & ConfigDB", "Sequences", "RAL", "Virtual Sequences", "Coverage Closure"] },
  { cat: "Protocols", items: ["AXI", "AHB", "APB", "PCIe Gen4", "DDR4/DDR5", "SPI", "I2C", "UART", "NoC Basics"] },
  { cat: "DFT", items: ["Scan Chain", "Scan Compression", "ATPG", "MBIST", "JTAG / TAP", "Boundary Scan", "Fault Models"] },
  { cat: "Low Power", items: ["UPF Basics", "Isolation", "Retention", "Level Shifters", "Power Domains", "X-Propagation"] },
  { cat: "Career", items: ["Interview Questions", "Mock Interviews", "Resume Guidance", "Real Projects", "Daily Practice Quiz"] },
];

function LearnPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="All Tracks"
        title="Everything you need to become a verification engineer."
        subtitle="Browse by category. Every topic page follows the same proven format: Overview → Why It Matters → Architecture → Example → Verification → Bugs → Assertions → Coverage → Interview → Quiz."
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((t) => (
            <div key={t.cat} className="bg-silicon-900 border border-white/10 rounded-2xl p-6 hover:border-electric-blue/40 transition-colors">
              <h3 className="font-display text-xl font-bold text-white mb-1">{t.cat}</h3>
              <div className="h-px w-10 bg-electric-blue mb-5" />
              <ul className="space-y-2.5">
                {t.items.map((i) => (
                  <li key={i}>
                    <Link to="/roadmap" className="flex items-center justify-between text-sm text-silver hover:text-white group">
                      <span>{i}</span>
                      <span className="font-mono text-[10px] text-electric-blue opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
