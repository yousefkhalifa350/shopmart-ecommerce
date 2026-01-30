"use client"

import * as React from "react"
import {
  motion,
  type Variants,
  type TargetAndTransition,
  useInView,
} from "framer-motion"

type SplittingTextProps = {
  text: string
  stagger?: number
  delay?: number
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
}

const itemVariants: Variants = {
  hidden: {
    x: 150,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
}

export default function SplittingText({
  text,
  stagger = 0.05,
  delay = 0,
}: SplittingTextProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      custom={stagger}
      style={{ display: "inline-block" }}
    >
      {text.split("").map((char: string, i: number) => (
        <motion.span
          key={i}
          variants={itemVariants}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}
