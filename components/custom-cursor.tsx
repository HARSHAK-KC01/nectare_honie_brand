"use client";

import { useEffect } from "react";
import { motion, useSpring, useMotionValue, useScroll } from "framer-motion";
import { useIsMounted } from "@/lib/use-mounted";

interface CustomCursorProps {
  isHovering?: boolean;
}

export function CustomCursor({ isHovering = false }: CustomCursorProps) {
  const isMounted = useIsMounted();
  const cursorSize = isHovering ? 56 : 14;

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  const springConfig = { damping: 25, stiffness: 160, mass: 0.8 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          x: cursorX,
          y: cursorY,
          width: cursorSize,
          height: cursorSize,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          backgroundColor: isHovering ? "rgba(245, 176, 65, 0.12)" : "#F5B041",
          pointerEvents: "none",
          zIndex: 10001,
          mixBlendMode: "screen",
          boxShadow: isHovering
            ? "0 0 24px rgba(245, 176, 65, 0.45)"
            : "0 0 16px #F5B041",
          backdropFilter: isHovering ? "blur(4px)" : "none",
        }}
        layout
        transition={{ type: "spring", ...springConfig }}
      />
      {isHovering && (
        <motion.div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            width: cursorSize,
            height: cursorSize,
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 10002,
          }}
        >
          <svg
            width={cursorSize}
            height={cursorSize}
            viewBox="0 0 100 100"
            style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="4"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              stroke="#F5B041"
              strokeWidth="4"
              fill="none"
              style={{ pathLength }}
            />
          </svg>
        </motion.div>
      )}
    </>
  );
}
