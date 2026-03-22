import { AnimatedSection } from './AnimatedSection';
import { GlowBackground } from './GlowBackground';

export function AIShowcase() {
  return (
    <section className="landing-section relative py-20 md:py-28">
      <GlowBackground glowPosition="center" glowOpacity={0.1} showDotGrid={false} />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Left: Two stacked cards (shown after narrative on mobile) */}
          <AnimatedSection className="order-last md:order-first flex flex-col gap-5">
            {/* AI Skills card */}
            <div className="landing-glass-card landing-code-panel overflow-hidden rounded-xl">
              <div className="flex items-center gap-2 landing-card-divider px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs" style={{ color: 'var(--sl-color-gray-3)' }}>AI Skills</span>
              </div>
              <div className="p-5">
                <div className="mb-3 overflow-hidden rounded-lg bg-black/30 px-4 py-3">
                  <code className="text-xs sm:text-sm">
                    <span style={{ color: 'var(--sl-color-gray-3)' }}>$ </span>
                    <span className="landing-code-accent">npx skills add strataljs/stratal</span>
                  </code>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--sl-color-gray-2)' }}>
                  Teach your AI agent Stratal's conventions, patterns, and APIs. It generates framework-correct code — decorators, import paths, module structure, and more.
                </p>
              </div>
            </div>

            {/* MCP Server card */}
            <div className="landing-glass-card landing-code-panel overflow-hidden rounded-xl">
              <div className="flex items-center gap-2 landing-card-divider px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs" style={{ color: 'var(--sl-color-gray-3)' }}>MCP Server</span>
              </div>
              <div className="p-5">
                <div className="mb-3 overflow-hidden rounded-lg bg-black/30 px-4 py-3">
                  <code className="text-xs sm:text-sm">
                    <span style={{ color: 'var(--sl-color-gray-3)' }}>$ </span>
                    <span className="landing-code-accent">npx quarry mcp:serve</span>
                  </code>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--sl-color-gray-2)' }}>
                  Expose your API routes as MCP tools. AI agents discover and call your endpoints directly — no extra configuration needed.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Narrative */}
          <AnimatedSection delay={0.15}>
            <div className="mb-4 flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--sl-color-accent)' }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                <path d="M5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z" />
              </svg>
              <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--sl-color-accent)' }}>
                AI-First
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for <span className="landing-gradient-text">AI agents</span>
            </h2>
            <p className="landing-subtitle mt-4 w-full text-lg leading-relaxed">
              Stratal is designed to work with AI coding agents from the ground up. Install the Stratal skill and your AI agent understands the framework's conventions — it can scaffold projects, generate modules, controllers, and services, and wire dependency injection correctly.
            </p>
            <p className="landing-subtitle mt-3 max-w-lg text-lg leading-relaxed">
              Then expose your API as MCP tools so AI agents can discover and call your endpoints directly.
            </p>
            <div className="mt-6">
              <a
                href="/getting-started/ai/"
                className="landing-btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all"
              >
                Explore AI Integration
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
