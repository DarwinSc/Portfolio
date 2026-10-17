"use client";

import { MotionConfig } from "motion/react";

// reducedMotion="user": si la persona tiene activado "reducir movimiento"
// en su sistema, Motion desactiva las animaciones de desplazamiento.
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
