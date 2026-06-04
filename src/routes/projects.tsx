import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Hands-on Projects — Silicon Canvas" },
      { name: "description", content: "Build real UVM testbenches: I2C, SPI, AXI Slave, SRAM controller, PCIe packet validator, DDR, JTAG TAP — with verification plans and assertions." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

const projects = [
  { t: "I2C UVM Testbench", lvl: "Beginner", d: "Build an I2C agent, sequencer, monitor and scoreboard from scratch." },
  { t: "SPI Verification Environment", lvl: "Beginner", d: "Full-duplex SPI VIP with configurable modes and clock polarity." },
  { t: "AXI Slave Verification", lvl: "Intermediate", d: "Verify burst handshake, outstanding transactions and ordering rules." },
  { t: "SRAM Controller Verification", lvl: "Intermediate", d: "Address decoding, back-to-back read/write and corner-case bugs." },
  { t: "PCIe Packet Validation", lvl: "Advanced", d: "TLP/DLLP framing, sequence numbers and CRC validation." },
  { t: "DDR Verification", lvl: "Advanced", d: "Refresh, bank activation, timing parameters and command scheduling." },
  { t: "JTAG TAP Controller", lvl: "Intermediate", d: "FSM coverage, BSDL register access and IR/DR shifts." },
  { t: "Assertion-Based Project", lvl: "All Levels", d: "Write SVA properties for arbiters, FIFOs and handshakes." },
];

function ProjectsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Practical Projects"
        title="Stop reading. Start building."
        subtitle="Eight hands-on verification projects with architecture diagrams, verification plans, assertions, coverage models and expected interview questions."
      />
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <div key={p.t} className="group bg-silicon-900 border border-white/10 rounded-2xl p-6 hover:border-electric-blue/40 transition-all">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-xl font-bold text-white">{p.t}</h3>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-electric-blue/10 text-electric-blue">{p.lvl}</span>
              </div>
              <p className="text-sm text-silver leading-relaxed mb-5">{p.d}</p>
              <div className="flex items-center gap-3 text-xs font-mono text-silver/60">
                <span>Arch</span><span>·</span><span>VPlan</span><span>·</span><span>Assertions</span><span>·</span><span>Coverage</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
