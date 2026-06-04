import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { SectionArticles } from "@/components/SectionArticles";

export const Route = createFileRoute("/dft")({
  head: () => ({
    meta: [
      { title: "DFT — Design for Test | Silicon Canvas" },
      { name: "description", content: "Learn Design for Test: Scan Chain, ATPG, MBIST, JTAG, TAP controller, boundary scan, fault models and scan compression." },
      { property: "og:url", content: "/dft" },
    ],
    links: [{ rel: "canonical", href: "/dft" }],
  }),
  component: DftPage,
});

const topics = [
  ["Scan Chain", "Shift/capture mechanics for full chip testability."],
  ["ATPG", "Automatic test pattern generation for stuck-at and transition faults."],
  ["MBIST", "Memory built-in self test architectures and controllers."],
  ["JTAG / TAP", "Boundary scan and TAP controller state machine."],
  ["Scan Compression", "EDT, X-tolerance and on-chip compression schemes."],
  ["Fault Models", "Stuck-at, transition, bridging and path delay faults."],
  ["DFT Timing", "Capture window, OCC and at-speed testing."],
  ["Tessent Overview", "Tool flow walkthrough for industry DFT signoff."],
];

function DftPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="DFT"
        title="Design for Test — the silicon side of verification."
        subtitle="A complete walkthrough of how modern chips become testable. Every concept tied to real silicon bring-up."
      />
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topics.map(([t, d]) => (
            <div key={t} className="bg-silicon-900 border border-white/10 rounded-2xl p-6 hover:border-electric-blue/40 transition-colors">
              <h3 className="font-display text-base font-bold text-white mb-2">{t}</h3>
              <p className="text-xs text-silver leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <SectionArticles section="dft" />
    </SiteLayout>
  );
}
