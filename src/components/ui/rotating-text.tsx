"use client"

import * as React from "react"
import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type Transition,
} from "framer-motion"
import { cn } from "@/lib/utils"

type RotatingTextProps = {
  text: string[]
  duration?: number
  transition?: Transition
  x?: number
  containerClassName?: string
} & HTMLMotionProps<"div">

export default function RotatingText({
  text,
  x = 80,
  duration = 2500,
  transition = { duration: 0.4, ease: "easeOut" },
  containerClassName,
  ...props
}: RotatingTextProps) {
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % text.length)
    }, duration)

    return () => clearInterval(interval)
  }, [text.length, duration])

  const currentText = text[index]

  return (
    <div className={cn("overflow-hidden inline-block", containerClassName)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentText}
          initial={{ opacity: 0, x: -x }}   // من الشمال
          animate={{ opacity: 1, x: 0 }}    // في النص
          exit={{ opacity: 0, x }}           // يطلع يمين
          transition={transition}
          {...props}
        >
          {currentText}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
