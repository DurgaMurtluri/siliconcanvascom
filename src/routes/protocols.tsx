import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { SectionArticles } from "@/components/SectionArticles";

export const Route = createFileRoute("/protocols")({
  head: () => ({
    meta: [
      { title: "Protocol Verification — AXI, PCIe, DDR, SPI, I2C, UART | Silicon Canvas" },
      { name: "description", content: "Deep dives into AXI, AHB, APB, PCIe, DDR, SPI, I2C, UART verification — architecture, signals, assertions, coverage and interview questions." },
      { property: "og:url", content: "/protocols" },
    ],
    links: [{ rel: "canonical", href: "/protocols" }],
  }),
  component: ProtocolsPage,
});

const protocols = [
  { name: "AXI4", desc: "AMBA 4 high-performance memory-mapped bus with burst, out-of-order and multi-channel handshake.", tag: "AMBA" },
  { name: "AHB", desc: "Pipelined high-performance bus with single master access per cycle.", tag: "AMBA" },
  { name: "APB", desc: "Low-power peripheral bus, simple two-cycle handshake.", tag: "AMBA" },
  { name: "PCIe Gen4", desc: "Packet-based serial fabric for SoC-to-device communication.", tag: "Serial" },
  { name: "DDR4 / DDR5", desc: "Synchronous DRAM controller verification with timing and refresh.", tag: "Memory" },
  { name: "SPI", desc: "Synchronous serial interface with master/slave clock and data.", tag: "Serial" },
  { name: "I2C", desc: "Two-wire multi-master bus with start/stop, ACK/NACK and arbitration.", tag: "Serial" },
  { name: "UART", desc: "Asynchronous serial protocol with framing and parity.", tag: "Serial" },
  { name: "NoC", desc: "Routed packet fabrics for many-core SoCs.", tag: "Fabric" },
];

function ProtocolsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Protocols"
        title="Industry-standard interfaces, verified end to end."
        subtitle="Each protocol page covers: architecture, signals, timing diagrams, protocol flow, assertions, coverage points, common bugs, debug scenarios and interview questions."
      />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {protocols.map((p) => (
            <div key={p.name} className="group bg-silicon-900 border border-white/10 rounded-2xl p-6 hover:border-electric-blue/40 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-2xl font-bold text-white">{p.name}</h3>
                <span className="font-mono text-[10px] text-electric-blue bg-electric-blue/10 px-2 py-1 rounded uppercase tracking-wider">{p.tag}</span>
              </div>
              <p className="text-sm text-silver leading-relaxed mb-6">{p.desc}</p>
              <div className="flex items-center gap-3 text-xs font-mono text-silver/60">
                <span>Arch</span><span>·</span>
                <span>Assertions</span><span>·</span>
                <span>Coverage</span><span>·</span>
                <span>Interview</span>
              </div>
              <div className="mt-5 h-px w-8 bg-electric-blue/40 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </section>
      <SectionArticles section="protocols" />
    </SiteLayout>
  );
}
