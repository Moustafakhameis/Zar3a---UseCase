// src/components/FloatingBackground.jsx
// Cinematic background — elegant floating leaves & breathing ambient glows.
// Powered by Framer Motion for high-performance GPU animations.

import { memo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// 1. Animated Leaf Component (مكون ورق الشجر المتحرك)
const Leaf = memo(function Leaf({ className, delay, size, rotate, opacity = 1 }) {
  return (
    <motion.div
      animate={{
        y: [0, -35, 0],
        x: [0, 20, 0],
        rotate: [rotate, rotate + 18, rotate - 12, rotate],
      }}
      transition={{
        duration: 14 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`absolute text-emerald-600/10 dark:text-emerald-400/8 pointer-events-none hidden lg:block ${className}`}
      style={{ opacity }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,3 14,3.5 9,9C8.44,9.62 8,10.3 7.65,11C11.3,7.64 15.5,6.11 15.5,6.11C15.5,6.11 11,8.5 7.65,12.3C7.2,13.2 6.88,14.23 6.7,15.3C6.1,13.6 5.33,12.14 4.54,11.26C4.06,10.71 3.56,10.23 3,9.81C3,9.81 7,2 14,2C17,2 20,3 22,3C22,3 20.19,6.03 17,8Z" />
      </svg>
    </motion.div>
  );
});

// A slightly smaller, subtler version of the Leaf for mobile devices so it looks gorgeous on all screens
const MobileLeaf = memo(function MobileLeaf({ className, delay, size, rotate, opacity = 0.05 }) {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0],
        x: [0, 8, 0],
        rotate: [rotate, rotate + 10, rotate - 10, rotate],
      }}
      transition={{
        duration: 10 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`absolute text-emerald-600 dark:text-emerald-400 pointer-events-none lg:hidden ${className}`}
      style={{ opacity, width: size, height: size }}
    >
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,3 14,3.5 9,9C8.44,9.62 8,10.3 7.65,11C11.3,7.64 15.5,6.11 15.5,6.11C15.5,6.11 11,8.5 7.65,12.3C7.2,13.2 6.88,14.23 6.7,15.3C6.1,13.6 5.33,12.14 4.54,11.26C4.06,10.71 3.56,10.23 3,9.81C3,9.81 7,2 14,2C17,2 20,3 22,3C22,3 20.19,6.03 17,8Z" />
      </svg>
    </motion.div>
  );
});

const FloatingBackground = memo(function FloatingBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-transparent" aria-hidden="true">
      
      {/* ─── Large Screen Animated Leaves (ورق الشجر الموزع في الشاشة) ─── */}
      <Leaf className="top-[8%] left-[4%]" size="190" delay={0} rotate={18} />
      <Leaf className="top-[4%] right-[8%]" size="150" delay={2.2} rotate={-12} />
      <Leaf className="bottom-[8%] left-[8%]" size="170" delay={4.5} rotate={145} />
      <Leaf className="bottom-[12%] right-[4%]" size="210" delay={1.1} rotate={-105} />
      <Leaf className="top-[45%] left-[-2%] opacity-40" size="105" delay={6.2} rotate={42} />
      <Leaf className="top-[30%] right-[-1%] opacity-40" size="125" delay={3.4} rotate={-28} />

      {/* Extra cinematic leaves for an even richer depth of field (or greater!) */}
      <Leaf className="top-[25%] left-[25%] opacity-20 scale-75" size="80" delay={7} rotate={60} />
      <Leaf className="bottom-[35%] right-[28%] opacity-25 scale-75" size="90" delay={5} rotate={-45} />

      {/* ─── Mobile Screen Optimized Swaying Leaves (for consistent aesthetic on all sizes) ─── */}
      <MobileLeaf className="top-[12%] left-[6%]" size="48" delay={0.5} rotate={15} opacity={0.06} />
      <MobileLeaf className="top-[6%] right-[10%]" size="40" delay={2.5} rotate={-20} opacity={0.05} />
      <MobileLeaf className="bottom-[15%] left-[10%]" size="44" delay={3.5} rotate={130} opacity={0.06} />
      <MobileLeaf className="bottom-[20%] right-[6%]" size="52" delay={1.5} rotate={-90} opacity={0.05} />

      {/* ─── Premium Slow-Breathing Blurred Glows (تأثيرات الإضاءة الضبابية المتحركة) ─── */}
      <motion.div 
        animate={{
          scale: [1, 1.08, 1],
          x: [0, 15, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-25%] left-[-15%] w-[70%] h-[70%] rounded-full bg-emerald-100/40 dark:bg-emerald-500/10 blur-[130px] pointer-events-none" 
      />
      <motion.div 
        animate={{
          scale: [1, 1.12, 1],
          x: [0, -20, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
        className="absolute bottom-[-25%] right-[-15%] w-[70%] h-[70%] rounded-full bg-green-200/20 dark:bg-emerald-900/10 blur-[140px] pointer-events-none" 
      />

      {/* Organic noise overlay for texture premium feel */}
      <div className="absolute inset-0 opacity-[0.012] dark:opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

    </div>
  );
});

export default FloatingBackground;
