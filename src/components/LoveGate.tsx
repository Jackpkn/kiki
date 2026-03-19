'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X } from 'lucide-react';

/* ── Floating hearts background ── */
function FloatingHearts() {
  const hearts = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 5 + Math.random() * 6,
    size: 10 + Math.random() * 22,
    opacity: 0.08 + Math.random() * 0.18,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map(h => (
        <motion.div
          key={h.id}
          className="absolute text-rose-400"
          style={{ left: `${h.x}%`, bottom: '-40px', fontSize: h.size, opacity: h.opacity }}
          animate={{ y: [0, -window.innerHeight - 80], rotate: [0, 20, -20, 10, 0] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}

/* ── No button that runs away ── */
function RunawayNoButton({ onCatch }: { onCatch: () => void }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [clicks, setClicks] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);

  const flee = () => {
    const maxX = 260;
    const maxY = 120;
    const newX = (Math.random() - 0.5) * maxX;
    const newY = (Math.random() - 0.5) * maxY;
    setPos({ x: newX, y: newY });
    setClicks(c => c + 1);
  };

  const labels = ['No', 'Are you sure?', 'Think again…', 'Really??', 'Please reconsider 🥺', 'Last chance!', 'Fine… 😢'];
  const label  = labels[Math.min(clicks, labels.length - 1)];

  return (
    <motion.button
      ref={btnRef}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseEnter={flee}
      onFocus={flee}
      onClick={onCatch}
      className="px-7 py-3.5 rounded-2xl border border-white/15 bg-white/5 text-white/40 text-sm font-semibold backdrop-blur-sm hover:bg-white/8 transition-colors select-none"
    >
      {label}
    </motion.button>
  );
}

/* ── Confetti burst on accept ── */
function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 600,
    y: -(Math.random() * 500 + 100),
    rotate: Math.random() * 720 - 360,
    color: ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6bff', '#ff9f43'][Math.floor(Math.random() * 6)],
    size: 6 + Math.random() * 8,
    delay: Math.random() * 0.4,
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {pieces.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{ width: p.size, height: p.size, backgroundColor: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, rotate: p.rotate, scale: 0.3 }}
          transition={{ duration: 1.4, delay: p.delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      ))}
    </div>
  );
}

/* ── Main gate ── */
export default function LoveGate({ onAccept }: { onAccept: () => void }) {
  const [phase, setPhase]     = useState<'gate' | 'accepted' | 'done'>('gate');
  const [showConfetti, setShowConfetti] = useState(false);
  const [noCount, setNoCount] = useState(0);

  const handleAccept = () => {
    setPhase('accepted');
    setShowConfetti(true);
    setTimeout(() => {
      setPhase('done');
      setTimeout(onAccept, 600);
    }, 2800);
  };

  // Prevent scroll while gate is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at 50% 60%, #1a0a0f 0%, #0d0508 60%, #060306 100%)',
          }}
        >
          {/* Floating hearts */}
          <FloatingHearts />

          {/* Soft glow orbs */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-primary/6 rounded-full blur-[100px] pointer-events-none" />

          {/* Confetti */}
          {showConfetti && <Confetti />}

          <AnimatePresence mode="wait">
            {phase === 'gate' && (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col items-center text-center px-8 max-w-lg"
              >
                {/* Pulsing heart icon */}
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-8"
                >
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-xl animate-pulse" />
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-2xl shadow-rose-500/40">
                      <Heart className="w-9 h-9 text-white fill-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.7 }}
                >
                  <p className="text-rose-300/60 text-xs font-bold uppercase tracking-[0.3em] mb-3">
                    A message from Jack 💌
                  </p>
                  <h1
                    className="font-display font-black text-white leading-[0.9] mb-4"
                    style={{ fontSize: 'clamp(2.4rem, 6vw, 4rem)' }}
                  >
                    Hey Kiki,<br />
                    <span className="italic text-rose-400">I love you.</span>
                  </h1>
                  <p className="text-white/40 font-body text-base leading-relaxed mb-2">
                    I made this little world for us — every place we&apos;ve been,<br className="hidden sm:block" />
                    every dream we still have together. 🌍
                  </p>
                  <p className="text-white/25 font-body text-sm italic mb-10">
                    But first… will you be my travel partner forever?
                  </p>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="relative flex items-center justify-center gap-5 w-full"
                >
                  {/* YES */}
                  <motion.button
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAccept}
                    className="flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-base shadow-2xl shadow-rose-500/40 hover:shadow-rose-500/60 transition-shadow"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    Yes, always! 💕
                  </motion.button>

                  {/* NO — runs away */}
                  <RunawayNoButton onCatch={() => setNoCount(n => n + 1)} />
                </motion.div>

                {noCount > 3 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-5 text-white/20 text-xs font-body italic"
                  >
                    The &quot;No&quot; button doesn&apos;t want to be caught either 😄
                  </motion.p>
                )}
              </motion.div>
            )}

            {phase === 'accepted' && (
              <motion.div
                key="accepted"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className="relative z-10 flex flex-col items-center text-center px-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1, 1.15, 1], rotate: [0, -8, 8, -4, 0] }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  className="text-7xl mb-6"
                >
                  💕
                </motion.div>
                <h2
                  className="font-display font-black text-white leading-tight mb-3"
                  style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
                >
                  She said <span className="text-rose-400 italic">yes!</span>
                </h2>
                <p className="text-white/40 font-body text-base">
                  Welcome to our world, Kiki. ✨
                </p>
                <div className="flex gap-2 mt-6">
                  {['🌍', '✈️', '💫', '🌸', '🏝️'].map((e, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="text-2xl"
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
