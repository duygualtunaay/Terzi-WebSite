import React from 'react';
import { motion } from 'framer-motion';

export const FloatingFabrics: React.FC = () => {
  const fabrics = [
    { id: 1, color: 'bg-gradient-to-br from-emerald-400 to-teal-500', size: 'w-16 h-16', delay: 0 },
    { id: 2, color: 'bg-gradient-to-br from-blue-500 to-indigo-600', size: 'w-12 h-12', delay: 0.5 },
    { id: 3, color: 'bg-gradient-to-br from-fuchsia-500 to-pink-600', size: 'w-20 h-20', delay: 1 },
    { id: 4, color: 'bg-gradient-to-br from-amber-500 to-orange-600', size: 'w-14 h-14', delay: 1.5 },
    { id: 5, color: 'bg-gradient-to-br from-purple-500 to-violet-600', size: 'w-10 h-10', delay: 2 },
    { id: 6, color: 'bg-gradient-to-br from-rose-500 to-red-600', size: 'w-18 h-18', delay: 2.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {fabrics.map((fabric, index) => (
        <motion.div
          key={fabric.id}
          className={`absolute ${fabric.color} ${fabric.size} rounded-full opacity-20 dark:opacity-30`}
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            rotate: 0,
            scale: 0.5
          }}
          animate={{
            y: -100,
            rotate: 360,
            x: Math.random() * window.innerWidth,
            scale: [0.5, 1, 0.8, 1]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: fabric.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: `${10 + (index * 15)}%`,
            animationDelay: `${fabric.delay}s`
          }}
        />
      ))}
      
      {/* Textile pattern overlay */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="textile" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" />
              <path d="M0,20 L40,20 M20,0 L20,40" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#textile)" />
        </svg>
      </div>
    </div>
  );
};