import React from 'react';
import { motion } from 'framer-motion';
import { Scissors } from 'lucide-react';

export const SewingMachine: React.FC = () => {
  return (
    <div className="relative">
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-500 dark:to-teal-600 rounded-full shadow-2xl"
      >
        <motion.div
          animate={{
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Scissors className="h-8 w-8 text-white" />
        </motion.div>
      </motion.div>
      
      {/* Glowing thread lines */}
      <motion.div
        className="absolute top-1/2 left-full w-32 h-0.5 bg-gradient-to-r from-fuchsia-400 to-pink-500 origin-left shadow-lg"
        animate={{
          scaleX: [0, 1, 0.8, 1],
          opacity: [0.6, 1, 0.8, 1]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Sparkle effects */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"
          style={{
            top: `${20 + i * 20}%`,
            left: `${80 + i * 10}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};