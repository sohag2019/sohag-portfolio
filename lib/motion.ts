import type { Variants, Transition } from 'framer-motion';

/**
 * One signature easing curve, reused site-wide. This single choice is what makes
 * the motion feel "designed" rather than "added".
 */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

export const SPRING_SOFT: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
};

export const DUR = { fast: 0.35, base: 0.6, slow: 0.8 } as const;

/** Standard in-view viewport config — reveal once, slightly early. */
export const VIEWPORT = { once: true, margin: '-100px' } as const;

/**
 * Build a staggered container. `reduced` collapses stagger to zero and children
 * fall back to opacity-only (see `childReveal`).
 */
export function staggerContainer(reduced: boolean, stagger = 0.08): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : 0.05,
      },
    },
  };
}

/**
 * Less-templated hero reveal: opacity + a subtle clipPath wipe instead of the
 * ubiquitous opacity+y:20. Reduced-motion → instant opacity only.
 */
export function childReveal(reduced: boolean): Variants {
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { duration: 0.01 } },
    };
  }
  return {
    hidden: { opacity: 0, clipPath: 'inset(0 0 40% 0)', y: 8 },
    show: {
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      y: 0,
      transition: { duration: DUR.base, ease: EASE_EXPO },
    },
  };
}

/** Generic fade-up used by content sections. */
export function fadeUp(reduced: boolean, delay = 0): Variants {
  return {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: DUR.base, ease: EASE_EXPO, delay },
    },
  };
}
