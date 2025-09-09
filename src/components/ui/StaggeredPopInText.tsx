"use client";
import { motion } from "framer-motion";

export function StaggeredPopInText({ text = "HELLO", className = "" }: { text?: string; className?: string }) {
  return (
    <h2 className={`text-6xl md:text-8xl font-bold flex justify-center ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 12 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
}

