interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="landing-glass-card landing-glass-card-hover group h-full rounded-xl p-6 mt-0">
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="landing-card-desc text-sm leading-relaxed">{description}</p>
    </div>
  );
}
