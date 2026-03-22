import { AnimatedSection } from './AnimatedSection';
import { GlowBackground } from './GlowBackground';

export function FooterCTA() {
  return (
    <section className="landing-section relative py-20 md:py-28">
      <GlowBackground glowPosition="center" glowOpacity={0.2} showDotGrid={false} />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to build?</h2>
          <p className="landing-subtitle mt-4 text-lg">Get started in under a minute.</p>
          <div className="mt-8">
            <a
              href="/getting-started/ai/"
              className="landing-btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 sm:px-8 sm:py-4 text-base font-semibold transition-all"
            >
              Get Started
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
