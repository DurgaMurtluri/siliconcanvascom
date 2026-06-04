import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/roadmap", label: "Roadmap" },
  { to: "/learn", label: "Learn" },
  { to: "/protocols", label: "Protocols" },
  { to: "/uvm", label: "UVM" },
  { to: "/dft", label: "DFT" },
  { to: "/projects", label: "Projects" },
  { to: "/interview", label: "Interview" },
  { to: "/blogs", label: "Blogs" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-silicon-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-10 bg-electric-blue rounded flex items-center justify-center font-display font-bold text-white shadow-lg shadow-electric-blue/30">
            SC
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            Silicon Canvas
          </span>
        </Link>
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-silver">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-electric-blue transition-colors"
              activeProps={{ className: "text-electric-blue" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/roadmap"
            className="hidden sm:inline-flex px-5 py-2.5 bg-electric-blue hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-all shadow-lg shadow-electric-blue/20"
          >
            Start Learning
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-2"
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-white/5 bg-silicon-950/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-silver hover:text-electric-blue py-2 text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
