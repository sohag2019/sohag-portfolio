'use client';

import { MotionConfig } from 'framer-motion';

/**
 * Site-wide motion config. `reducedMotion="user"` makes every Framer Motion
 * animation automatically fall back to instant/opacity-only transforms when the
 * visitor has "reduce motion" enabled — an accessibility signal reviewers notice.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
