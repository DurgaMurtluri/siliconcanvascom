export const SECTIONS = [
  { value: "blog", label: "Blog" },
  { value: "interview", label: "Interview Prep" },
  { value: "uvm", label: "UVM" },
  { value: "dft", label: "DFT" },
  { value: "protocols", label: "Protocols" },
  { value: "projects", label: "Projects" },
  { value: "systemverilog", label: "SystemVerilog" },
  { value: "roadmap", label: "Roadmap" },
] as const;

export type Section = (typeof SECTIONS)[number]["value"];

export function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
}
