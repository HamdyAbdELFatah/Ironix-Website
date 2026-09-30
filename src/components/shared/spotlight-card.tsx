"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
  borderBeam?: boolean;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(249, 192, 35, 0.14)",
  enableTilt = false,
  borderBeam = false,
  ...props
}: SpotlightCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();

  // 3D Tilt Spring Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });

    if (enableTilt && !shouldReduceMotion) {
      const normalizedX = x / rect.width - 0.5;
      const normalizedY = y / rect.height - 0.5;
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (enableTilt && !shouldReduceMotion) {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const cardStyle =
    enableTilt && !shouldReduceMotion
      ? {
          rotateX,
          rotateY,
          transformStyle: "preserve-3d" as const,
        }
      : {};

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/80 backdrop-blur-xl transition-shadow duration-500",
        isHovered && "shadow-2xl shadow-amber-500/10 border-amber-500/40",
        className
      )}
      {...(props as any)}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(420px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Animated Traveling Border Beam on Hover */}
      {borderBeam && isHovered && !shouldReduceMotion && (
        <div className="absolute inset-0 rounded-[inherit] pointer-events-none z-10 p-[1px] overflow-hidden">
          <div className="absolute inset-0 rounded-[inherit] border border-amber-400/40 animate-pulse" />
        </div>
      )}

      {/* Card Content with 3D Pop on tilt */}
      <div
        className="relative z-10 h-full flex flex-col justify-between"
        style={enableTilt && !shouldReduceMotion ? { transform: "translateZ(20px)" } : undefined}
      >
        {children}
      </div>
    </motion.div>
  );
}
