import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="py-16 border-t border-white/5 bg-silicon-950">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-9 bg-electric-blue rounded flex items-center justify-center font-display font-bold text-white text-sm">
              SC
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Silicon Canvas
            </span>
          </div>
          <p className="text-sm text-silver max-w-md leading-relaxed">
            Your complete VLSI verification roadmap — from beginner to silicon
            engineer. Practical learning, real industry examples, interview-ready.
          </p>
        </div>
        <div>
          <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-white mb-4">
            Learn
          </h4>
          <ul className="space-y-3 text-sm text-silver">
            <li><Link to="/roadmap" className="hover:text-white">Roadmap</Link></li>
            <li><Link to="/uvm" className="hover:text-white">UVM</Link></li>
            <li><Link to="/dft" className="hover:text-white">DFT</Link></li>
            <li><Link to="/protocols" className="hover:text-white">Protocols</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-mono text-[10px] font-bold uppercase tracking-widest text-white mb-4">
            Career
          </h4>
          <ul className="space-y-3 text-sm text-silver">
            <li><Link to="/interview" className="hover:text-white">Interview Prep</Link></li>
            <li><Link to="/projects" className="hover:text-white">Projects</Link></li>
            <li><Link to="/blogs" className="hover:text-white">Blogs</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-xs font-mono text-silver/50 uppercase tracking-wider">
        <span>© 2026 Silicon Canvas — All traces reserved.</span>
        <span>Learn · Build · Verify</span>
      </div>
    </footer>
  );
}
