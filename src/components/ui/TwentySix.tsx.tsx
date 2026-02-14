"use client"

import {
  type SpringOptions,
  type UseInViewOptions,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion"
import * as React from "react"

type CountingNumberProps = React.ComponentProps<"span"> & {
  number?: number
  fromNumber?: number
  inView?: boolean
  inViewMargin?: UseInViewOptions["margin"]
  inViewOnce?: boolean
  transition?: SpringOptions
}

export default function TwentySix({
  number = 100,
  fromNumber = -1,
  inView = true,
  inViewMargin = "0px",
  inViewOnce = true,
  transition = { stiffness: 90, damping: 50 },
  className,
  ...props
}: CountingNumberProps) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const motionVal = useMotionValue(fromNumber)
  const springVal = useSpring(motionVal, transition)

  const isInView = useInView(ref, {
    once: inViewOnce,
    margin: inViewMargin,
  })

  React.useEffect(() => {
    if (isInView || !inView) {
      motionVal.set(number)
    }
  }, [isInView, number, motionVal, inView])

  React.useEffect(() => {
    const unsub = springVal.on("change", latest => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest).toString()
      }
    })
    return () => unsub()
  }, [springVal])

  return (
    <span ref={ref} className={className} {...props}>
      00
    </span>
  )
}
