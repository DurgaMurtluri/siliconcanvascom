import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const entries = [
  { path: "/", priority: "1.0" },
  { path: "/roadmap", priority: "0.9" },
  { path: "/learn", priority: "0.8" },
  { path: "/protocols", priority: "0.8" },
  { path: "/uvm", priority: "0.8" },
  { path: "/dft", priority: "0.8" },
  { path: "/projects", priority: "0.7" },
  { path: "/interview", priority: "0.9" },
  { path: "/blogs", priority: "0.6" },
  { path: "/about", priority: "0.5" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries
          .map(
            (e) =>
              `  <url>\n    <loc>${e.path}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
