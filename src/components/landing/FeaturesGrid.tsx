import { AnimatedSection, StaggerContainer } from './AnimatedSection';
import { FeatureCard } from './FeatureCard';

const features = [
  {
    icon: '📖',
    title: 'Auto-generated OpenAPI Docs',
    description:
      'Generate OpenAPI specs directly from your route definitions and Zod schemas. Always accurate, zero maintenance.',
  },
  {
    icon: '🛤️',
    title: 'Convention-based Routing',
    description:
      'Method names map to HTTP verbs automatically. Name it "create" and it becomes POST. No route tables to maintain.',
  },
  {
    icon: '💉',
    title: 'Dependency Injection',
    description:
      'Built-in DI container resolves services automatically. Declare dependencies in constructors, skip the manual wiring.',
  },
  {
    icon: '🧱',
    title: 'Modular Architecture',
    description:
      'Organize code into cohesive modules with clear boundaries. Import, share, and reuse across Workers effortlessly.',
  },
  {
    icon: '⚡',
    title: 'Workers Primitives',
    description:
      'First-class support for Queues, Cron Triggers, KV, R2, D1, Durable Objects, Service Bindings, and Workflows.',
  },
  {
    icon: '🧪',
    title: 'Built for Testing',
    description:
      'Compile module subsets, swap dependencies, and test HTTP endpoints with a fluent API. Testing should be the easy part.',
  },
];

export function FeaturesGrid() {
  return (
    <section className="landing-section relative py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl px-6">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to build at the <span className="landing-gradient-text">edge</span>
          </h2>
          <p className="landing-subtitle mx-auto mt-4 max-w-2xl">
            Stratal handles the scaffolding so you can focus on what your application actually does.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
