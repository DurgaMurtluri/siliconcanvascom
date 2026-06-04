import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-silicon-950 px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-white">404</h1>
        <p className="mt-4 text-silver">This trace leads nowhere.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-electric-blue px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-600"
        >
          Back to Silicon Canvas
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-silicon-950 px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold text-white">Simulation failed</h1>
        <p className="mt-2 text-sm text-silver">Something went wrong. Try again.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-lg bg-electric-blue px-5 py-2.5 text-sm font-semibold text-white"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Silicon Canvas — Master VLSI Design Verification" },
      { name: "description", content: "Step-by-step VLSI verification learning: SystemVerilog, UVM, AXI, PCIe, DDR, DFT, and real interview preparation." },
      { property: "og:title", content: "Silicon Canvas — Master VLSI Design Verification" },
      { property: "og:description", content: "Step-by-step VLSI verification learning: SystemVerilog, UVM, AXI, PCIe, DDR, DFT, and real interview preparation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Silicon Canvas — Master VLSI Design Verification" },
      { name: "twitter:description", content: "Step-by-step VLSI verification learning: SystemVerilog, UVM, AXI, PCIe, DDR, DFT, and real interview preparation." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e13221a9-b3c1-4b70-bbca-bc71bd07e56d/id-preview-fd87357e--bec2a893-f0c9-44cb-83dc-75c20c97c0d7.lovable.app-1780587252081.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e13221a9-b3c1-4b70-bbca-bc71bd07e56d/id-preview-fd87357e--bec2a893-f0c9-44cb-83dc-75c20c97c0d7.lovable.app-1780587252081.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [ToasterComp, setToasterComp] = useState<any>(null);
  useEffect(() => {
    import("@/components/ui/sonner").then((m) => setToasterComp(() => m.Toaster));
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      {ToasterComp ? <ToasterComp /> : null}
    </QueryClientProvider>
  );
}
