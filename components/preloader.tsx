"use client";

import { motion } from "framer-motion";

interface PreloaderProps {
  loadingProgress: number;
}

export function Preloader({ loadingProgress }: PreloaderProps) {
  if (loadingProgress >= 100) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#050505",
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontSize: "4rem",
          color: "#F5B041",
          marginBottom: "2rem",
        }}
      >
        {Math.floor(loadingProgress)}%
      </motion.div>
      <div
        style={{
          width: "200px",
          height: "1px",
          background: "rgba(255,255,255,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <motion.div
          animate={{ width: `${Math.floor(loadingProgress)}%` }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            background: "#F5B041",
          }}
        />
      </div>
    </motion.div>
  );
}
