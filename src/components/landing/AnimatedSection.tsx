import { motion, useInView, type Variants } from 'motion/react';
import { useRef, type ReactNode } from 'react';

const hidden = { opacity: 0, y: 20 };
const visible = { opacity: 1, y: 0 };

export function AnimatedSection({ children, className = '', delay = 0 }: {
  children: ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={isInView ? visible : hidden}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

const staggerVisible: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export function StaggerContainer({ children, className = '' }: {
  children: ReactNode; className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={isInView ? "visible" : "hidden"}
      variants={staggerVisible}
    >
      {children}
    </motion.div>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function StaggerItem({ children, className = '' }: {
  children: ReactNode; className?: string;
}) {
  return (
    <motion.div className={className} variants={fadeUp} transition={{ duration: 0.5, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}
