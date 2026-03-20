import { motion } from 'motion/react';
import { GlowBackground } from './GlowBackground';
import { highlightTS } from './syntaxHighlight';

const heroCode = `import { Stratal } from 'stratal';
import { AppModule } from './app.module';

export default new Stratal({
  module: AppModule,
});`;

export function HeroSection() {
  return (
    <section className="landing-section relative overflow-hidden py-24 md:py-40">
      <GlowBackground glowPosition="top-right" glowOpacity={0.2} />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Left: Text */}
          <div>
            <motion.h1
              className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Build Workers.{' '}
              <span className="landing-gradient-text block">Not Scaffolding.</span>
            </motion.h1>

            <motion.p
              className="landing-subtitle mt-6 max-w-xl text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              A type-safe, modular framework for Cloudflare Workers with automatic OpenAPI docs,
              dependency injection, and first-class support for every Workers primitive.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="/getting-started/installation/"
                className="landing-btn-primary inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all"
              >
                Get Started
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="https://github.com/strataljs/stratal"
                target="_blank"
                rel="noopener noreferrer"
                className="landing-btn-ghost inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Star on GitHub
              </a>
            </motion.div>
          </div>

          {/* Right: Code block */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <div className="landing-glow-pulse absolute -inset-4 rounded-2xl" />
            <div className="landing-glass-card landing-code-panel relative overflow-hidden rounded-xl">
              <div className="flex items-center gap-2 landing-card-divider px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs" style={{ color: 'var(--sl-color-gray-3)' }}>src/index.ts</span>
              </div>
              <pre className="overflow-x-auto p-5 text-xs sm:text-sm leading-relaxed">
                <code>{highlightTS(heroCode)}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
