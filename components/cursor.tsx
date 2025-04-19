"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Position {
  x: number;
  y: number;
}

export function CustomCursor() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only show cursor after it has moved (prevents initial flash at 0,0)
    const handleFirstMove = (e: MouseEvent) => {
      setIsHidden(false);
      document.removeEventListener("mousemove", handleFirstMove);
    };
    document.addEventListener("mousemove", handleFirstMove);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over a clickable element
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.onclick !== null ||
        target.closest("button") ||
        target.closest("a") ||
        getComputedStyle(target).cursor === "pointer";

      setIsPointer(isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleFirstMove);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Hide the default cursor
  useEffect(() => {
    document.documentElement.classList.add("custom-cursor");
    return () => document.documentElement.classList.remove("custom-cursor");
  }, []);

  if (typeof window === "undefined") return null;

  // Don't render on touch devices
  if (window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[999] pointer-events-none"
        animate={{
          x: position.x - 5,
          y: position.y - 5,
          scale: isClicking ? 0.8 : 1,
          opacity: isHidden ? 0 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          stiffness: 800,
          damping: 20,
          opacity: { duration: 0.2 },
        }}
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: isPointer ? "var(--primary)" : "var(--foreground)",
        }}
      />

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 z-[999] pointer-events-none mix-blend-difference"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          scale: isPointer ? 1.5 : isClicking ? 0.8 : 1,
          opacity: isHidden ? 0 : 0.3,
        }}
        transition={{
          type: "spring",
          mass: 0.5,
          stiffness: 100,
          damping: 15,
          opacity: { duration: 0.2 },
        }}
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: "1.5px solid var(--foreground)",
        }}
      />
    </>
  );
}
