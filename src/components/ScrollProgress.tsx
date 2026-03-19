'use client';

import { useScroll, motion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-rose-400 to-violet-500 origin-left z-[9998]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
