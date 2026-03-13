import { AnimatedSection } from './AnimatedSection';
import { StaggerContainer, StaggerItem } from './AnimatedSection';
import { GlowBackground } from './GlowBackground';

const steps = [
  {
    number: '1',
    title: 'Scaffold your project',
    code: 'npm create stratal@latest my-app',
  },
  {
    number: '2',
    title: 'Start the dev server',
    code: 'cd my-app && npm run dev',
  },
  {
    number: '3',
    title: 'Make your first request',
    code: 'curl http://localhost:8787/api/hello',
    output: '{"message": "Hello from Stratal!"}',
  },
];

export function QuickStart() {
  return (
    <section className="landing-section relative py-20 md:py-28">
      <GlowBackground glowPosition="center" glowOpacity={0.08} showDotGrid={false} />

      <div className="relative mx-auto max-w-3xl px-6">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Up and running in <span className="landing-gradient-text">minutes</span>
          </h2>
        </AnimatedSection>

        {/* AI Skills — Featured Card */}
        <AnimatedSection className="mb-10">
          <div className="landing-glass-card landing-code-panel landing-ai-skills-card overflow-hidden rounded-xl border-2">
            <div className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ stroke: 'var(--sl-color-accent)' }} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                  <path d="M5 19l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z" />
                </svg>
                <h3 className="text-lg font-semibold">Let AI build your app</h3>
              </div>
              <div className="mb-3 overflow-hidden rounded-lg bg-black/30 px-4 py-3">
                <code className="text-xs sm:text-sm">
                  <span style={{ color: 'var(--sl-color-gray-3)' }}>$ </span>
                  <span className="landing-code-accent">npx skills add strataljs/stratal</span>
                </code>
              </div>
              <p className="text-sm leading-relaxed">
                Scaffold a complete Stratal app with AI — routes, modules, and tests generated from your description.
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Divider */}
        <div className="mb-10 flex items-center gap-4">
          <div className="landing-divider-line h-px flex-1" />
          <span className="landing-subtitle text-sm font-medium">Or, set up manually</span>
          <div className="landing-divider-line h-px flex-1" />
        </div>

        <StaggerContainer className="relative space-y-8">
          {/* Connecting line */}
          <div className="landing-connect-line absolute top-4 bottom-4 w-px" />

          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="flex gap-5">
                <div className="landing-step-badge relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold sm:h-14 sm:w-14">
                  {step.number}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="mb-3 text-lg font-semibold">{step.title}</h3>
                  <div className="landing-glass-card landing-code-panel overflow-hidden rounded-lg">
                    <div className="flex items-center gap-2 landing-card-divider px-4 py-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="p-4">
                      <code className="text-xs sm:text-sm">
                        <span style={{ color: 'var(--sl-color-gray-3)' }}>$ </span>
                        <span className="landing-code-accent">{step.code}</span>
                      </code>
                      {step.output && (
                        <div className="mt-2 text-xs sm:text-sm" style={{ color: 'var(--sl-color-gray-3)' }}>
                          {step.output}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
