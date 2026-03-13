import { AnimatedSection } from './AnimatedSection';
import { StaggerContainer, StaggerItem } from './AnimatedSection';

const reasons = [
  {
    icon: '🌐',
    title: 'Workers-Native',
    description:
      "Purpose-built for Cloudflare's runtime, not ported from Node. Every API, binding, and primitive is a first-class citizen.",
  },
  {
    icon: '⚙️',
    title: 'Convention over Configuration',
    description:
      'Method names, decorators, and module definitions eliminate boilerplate. Spend time on business logic, not plumbing.',
  },
  {
    icon: '🤖',
    title: 'AI-Ready Architecture',
    description:
      'Structured patterns that AI coding agents can follow and extend. Conventions + OpenAPI specs = code that writes itself.',
  },
];

export function WhyStratal() {
  return (
    <section className="landing-section relative py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl px-6">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why <span className="landing-gradient-text">Stratal</span>?
          </h2>
        </AnimatedSection>

        <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <StaggerItem key={reason.title}>
              <div className="text-center">
                <div className="mb-4 text-4xl">{reason.icon}</div>
                <h3 className="mb-3 text-xl font-semibold">{reason.title}</h3>
                <p className="landing-card-desc text-sm leading-relaxed">{reason.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
