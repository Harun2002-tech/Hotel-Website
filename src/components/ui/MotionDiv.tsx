"use client";

import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

interface MotionDivProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
}

export function FadeIn({ children, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: easeOut }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SlideUp({ children, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: easeOut }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SlideDown({ children, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: easeOut }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: easeOut }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const staggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export function StaggerContainer({ children, ...props }: MotionDivProps) {
  return (
    <motion.div
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export function StaggerItem({ children, ...props }: MotionDivProps) {
  return (
    <motion.div variants={itemVariants} {...props}>
      {children}
    </motion.div>
  );
}
