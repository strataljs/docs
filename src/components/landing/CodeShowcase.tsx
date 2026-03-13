import { AnimatedSection } from './AnimatedSection';
import { GlowBackground } from './GlowBackground';
import { highlightTS } from './syntaxHighlight';

const beforeCode = `export default {
  async fetch(request, env) {
    // Set up router, parse body, validate...
  },
  async queue(batch, env) {
    if (batch.queue.startsWith('order-queue')) {
      await orderConsumer.queue(batch, env);
    }
    if (batch.queue.startsWith('webhook-queue')) {
      await webhookConsumer.queue(batch, env);
    }
    if (batch.queue.startsWith('notification-queue')) {
      await notificationConsumer.queue(batch, env);
    }
  },
  async scheduled(controller, env) {
    switch (controller.cron) {
      case '0 2 * * *': jobType = 'expiration'; break;
      case '0 5 * * *': jobType = 'renewal'; break;
      case '0 6 * * *': jobType = 'warnings'; break;
      default: console.warn(\`Unknown cron\`);
    }
  },
}`;

const afterModuleCode = `@Module({
  imports: [StorageModule.forRoot({ bucket: 'uploads' })],
  providers: [NotesService],
  controllers: [NotesController],
  consumers: [NotificationConsumer],
  jobs: [CleanupJob],
})
export class NotesModule {}`;

const afterEntryCode = `export default new Stratal({
  module: AppModule,
})`;

function CodePanel({ title, label, code, labelColor }: { title: string; label: string; code: string; labelColor: string }) {
  return (
    <div className="landing-glass-card landing-code-panel overflow-hidden rounded-xl">
      <div className="flex items-center gap-2 landing-card-divider px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs" style={{ color: 'var(--sl-color-gray-3)' }}>{title}</span>
        <span
          className="ml-auto rounded-full px-2 py-0.5 text-xs font-medium"
          style={{ backgroundColor: labelColor, color: '#fff' }}
        >
          {label}
        </span>
      </div>
      <pre className="overflow-x-auto p-5 text-xs sm:text-[13px] leading-relaxed">
        <code>{highlightTS(code)}</code>
      </pre>
    </div>
  );
}

export function CodeShowcase() {
  return (
    <section className="landing-section relative py-20 md:py-28">
      <GlowBackground glowPosition="center" glowOpacity={0.1} showDotGrid={false} />

      <div className="relative mx-auto max-w-6xl px-6">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            From boilerplate to <span className="landing-gradient-text">business logic</span>
          </h2>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-2">
          <AnimatedSection>
            <CodePanel title="worker.ts" label="Before" code={beforeCode} labelColor="#e5534b" />
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="flex flex-col gap-4">
            <CodePanel title="notes.module.ts" label="After" code={afterModuleCode} labelColor="hsl(165, 82%, 42%)" />
            <CodePanel title="index.ts" label="Entry" code={afterEntryCode} labelColor="hsl(165, 82%, 42%)" />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
