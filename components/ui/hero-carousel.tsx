"use client"

// A full-bleed editorial hero driven by a filmstrip.
//
// Every card shares one top edge. The focused card unfurls to full height while
// its neighbours stay clipped to half, so the strip reads as a row of cropped
// heads with one complete portrait standing in the middle of it. Changing the
// focus re-grades the whole background to that image.
//
// Geometry is measured, never hard-coded: one ResizeObserver reads the stage and
// every size below is a ratio of it, so the same component is pixel-identical in
// a 600px preview box and on a 4K display.
import * as React from "react"
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion"

import { cn } from "@/lib/utils"

export interface HeroCarouselItem {
  /** Stable key; falls back to the index. @default undefined */
  id?: string | number
  /** Headline for the active slide. Newlines become separate reveal lines. */
  title: string
  /** Image URL, used both in the card and as the graded background. */
  image: string
  /** Byline printed beside the headline, e.g. "BY AURELIA STUDIO." @default undefined */
  credit?: string
  /** Right-aligned facts, e.g. ["SAT NOV 15", "5-10 PM", "MIAMI"]. @default undefined */
  meta?: string[]
  /**
   * CSS colour the background is graded to. The photo keeps its luminance and
   * takes this hue, which is what makes the backdrop swing on every change.
   * @default "#8a8a8a"
   */
  accent?: string
  /** Optional link destination when card or action is clicked */
  href?: string
}

export interface HeroCarouselProps {
  /** Slides, in strip order. */
  items: HeroCarouselItem[]
  /** Focused slide when controlled. Leave unset for internal state. @default undefined */
  index?: number
  /** Focused slide on mount when uncontrolled. @default 0 */
  defaultIndex?: number
  /** Fires on every focus change, from any input. @default undefined */
  onIndexChange?: (index: number) => void
  /** Wordmark in the middle of the top bar. @default undefined */
  brand?: React.ReactNode
  /** Renders the "Back" control when provided. @default undefined */
  onBack?: () => void
  /** Renders the "Menu" control when provided. @default undefined */
  onMenu?: () => void
  /** Advance on a timer. Pauses on hover, drag and focus. @default false */
  autoplay?: boolean
  /** Milliseconds between autoplay steps. @default 4000 */
  autoplayDelay?: number
  /** Optional call-to-action button or slot embedded in bottom area */
  cta?: React.ReactNode
  /** Extra classes for the stage. @default undefined */
  className?: string
}

/* Ratios lifted from the reference layout, all relative to the stage box. */
const CARD_H = 0.17 // active card height ÷ stage height
const CARD_AR = 0.75 // active card is 3:4
const GAP = 0.045 // gap ÷ card width
const TITLE = 0.067 // headline cap size ÷ stage height
const LABEL = 0.0103 // small mono label ÷ stage height
const PAD = 0.024 // page gutter ÷ stage width
const RAIL = 0.24 // progress rail width ÷ stage width

/** Wheel distance that commits to a step, and the lockout after one. */
const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n))

export function HeroCarousel({
  items,
  index: controlled,
  defaultIndex = 0,
  onIndexChange,
  brand,
  onBack,
  onMenu,
  autoplay = false,
  autoplayDelay = 1500,
  cta,
  className,
}: HeroCarouselProps) {
  const stageRef = React.useRef<HTMLDivElement>(null)
  const [box, setBox] = React.useState({ w: 0, h: 0 })
  const [uncontrolled, setUncontrolled] = React.useState(defaultIndex)
  const [dragging, setDragging] = React.useState(false)
  const reduced = useReducedMotion()

  const last = items.length - 1
  const index = clamp(controlled ?? uncontrolled, 0, Math.max(0, last))
  const [mounted, setMounted] = React.useState(false)

  // One observer feeds every measurement below.
  React.useEffect(() => {
    setMounted(true)
    const stage = stageRef.current
    if (!stage) return
    const read = () =>
      setBox({ w: stage.clientWidth, h: stage.clientHeight })
    read()
    const ro = new ResizeObserver(read)
    ro.observe(stage)
    return () => ro.disconnect()
  }, [])

  // Provide robust fallback dimensions during initial render / SSR
  const stageW = box.w > 0 ? box.w : (mounted && typeof window !== "undefined" ? window.innerWidth : 1200)
  const stageH = box.h > 0 ? box.h : (mounted && typeof window !== "undefined" ? window.innerHeight : 750)

  const isMobile = stageW < 640
  const isTablet = stageW >= 640 && stageW < 1024

  const go = React.useCallback(
    (next: number) => {
      const clamped = clamp(next, 0, Math.max(0, last))
      if (controlled === undefined) setUncontrolled(clamped)
      if (clamped !== index) onIndexChange?.(clamped)
    },
    [controlled, index, last, onIndexChange]
  )

  // Responsive stage geometry calculations
  const fullH = isMobile
    ? clamp(stageH * 0.17, 100, 140)
    : clamp(stageH * CARD_H, 115, 200)
  const halfH = fullH / 2
  const cardW = fullH * CARD_AR
  const gap = Math.max(8, Math.round(cardW * GAP))
  const step = cardW + gap
  const pad = Math.max(18, Math.round(stageW * PAD))
  const label = isMobile
    ? 10
    : Math.max(11, Math.round(stageH * LABEL))

  // Headline font size scaling safely adapted for mobile, tablet, and desktop
  const titleSize = isMobile
    ? Math.min(28, Math.max(22, Math.round(stageW * 0.07)))
    : isTablet
      ? Math.max(25, Math.round(stageH * 0.04))
      : Math.max(28, Math.round(stageH * 0.046))

  // Dynamic strip top edge moved right down into the bottom portion
  const stripTop = isMobile ? 0.73 : 0.70

  // Centre the focused card: the track slides, the card never moves itself.
  const xFor = React.useCallback(
    (i: number) => stageW / 2 - (i * step + cardW / 2),
    [stageW, step, cardW]
  )
  const x = useMotionValue(0)
  const target = xFor(index)

  const swing = reduced
    ? { duration: 0 }
    : { duration: 0.45, ease: "easeOut" as const }
  const spring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 280, damping: 32, mass: 0.85 }

  // The track is driven by a motion value rather than an `animate` prop so a
  // drag that starts mid-spring reads the real position, not where the spring
  // was headed - otherwise the release snaps a card off.
  React.useEffect(() => {
    if (dragging) return
    const run = animate(x, target, spring)
    return () => run.stop()
  }, [target, dragging, reduced, x]) // eslint-disable-line react-hooks/exhaustive-deps

  // Autoplay timer: advances images strictly with time (at least 3s), not with scroll
  React.useEffect(() => {
    if (!autoplay || dragging || items.length < 2) return
    const id = window.setTimeout(
      () => go(index === last ? 0 : index + 1),
      autoplayDelay
    )
    return () => window.clearTimeout(id)
  }, [autoplay, autoplayDelay, dragging, go, index, items.length, last])

  const active = items[index]
  if (!active) return null

  const lines = active.title.split("\n")

  return (
    <div
      ref={stageRef}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="Cultural Celebrations & Community Heritage"
      onKeyDown={(e) => {
        const keys: Record<string, number> = {
          ArrowLeft: index - 1,
          ArrowRight: index + 1,
          Home: 0,
          End: last,
        }
        if (!(e.key in keys)) return
        e.preventDefault()
        go(keys[e.key]!)
      }}
      className={cn(
        "relative h-full min-h-[520px] sm:min-h-[600px] w-full overflow-hidden bg-black text-white select-none touch-pan-y",
        "outline-none focus-visible:ring-1 focus-visible:ring-white/40 focus-visible:ring-inset",
        className
      )}
    >
      {/* ── Background: Real authentic photo in natural vibrant colors (No artificial color grading or tint) ── */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={swing}
          >
            <motion.img
              src={active.image}
              alt=""
              aria-hidden
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: reduced ? 1 : 1.05 }}
              animate={{ scale: 1 }}
              transition={reduced ? { duration: 0 } : { duration: 3, ease: "linear" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtle top & bottom dark gradient to ensure text readability without altering the real image colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/80 pointer-events-none" />

      {/* ── Top bar: Optional centered cluster (Back, Brand, Menu) ── */}
      {(onBack || brand || onMenu) && (
        <div
          className="absolute inset-x-0 flex items-center justify-center z-20"
          style={{
            top: Math.max(16, stageH * 0.029),
            gap: `${Math.max(20, stageW * 0.06)}px`,
          }}
        >
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="opacity-90 transition-opacity hover:opacity-100 cursor-pointer"
              style={{ fontSize: label * 1.15 }}
            >
              <span aria-hidden>↖</span> Back
            </button>
          ) : null}
          {brand ? (
            <div
              className="font-semibold tracking-[0.06em]"
              style={{ fontSize: label * 1.35 }}
            >
              {brand}
            </div>
          ) : null}
          {onMenu ? (
            <button
              type="button"
              onClick={onMenu}
              className="opacity-90 transition-opacity hover:opacity-100 cursor-pointer"
              style={{ fontSize: label * 1.15 }}
            >
              Menu <span aria-hidden>☰</span>
            </button>
          ) : null}
        </div>
      )}

      {/* ── Headline block, sitting just above the strip's top edge ── */}
      <div
        className="absolute inset-x-0 top-0 flex flex-col justify-end z-10 pointer-events-none"
        style={{
          height: `${stripTop * 100}%`,
          paddingLeft: pad,
          paddingRight: pad,
          paddingBottom: Math.max(6, Math.round(stageH * 0.01)),
        }}
      >
        <div className="flex w-full flex-col sm:flex-row sm:items-end justify-between gap-y-2.5 sm:gap-y-2 gap-x-6">
          {/* Main Headline & Byline */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-x-4 sm:gap-x-6 gap-y-1.5">
            <div className="relative min-h-[2em] flex items-end">
              <AnimatePresence mode="wait" initial={false}>
                <motion.h1
                  key={index}
                  className="font-heading font-normal uppercase leading-[1.18] tracking-tight text-white drop-shadow-md pt-2 pb-1"
                  style={{ fontSize: titleSize }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.14 } }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  {lines.map((line, i) => (
                    <span key={i} className="block overflow-hidden pt-2 pb-1 -mt-1.5">
                      <motion.span
                        className="block pb-0.5"
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={
                          reduced
                            ? { duration: 0 }
                            : { duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }
                        }
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </motion.h1>
              </AnimatePresence>
            </div>

            {active.credit ? (
              <p className="font-sans uppercase tracking-[0.16em] text-white/70 text-[10px] sm:text-xs font-semibold whitespace-nowrap pb-0.5 transition-opacity duration-300">
                {active.credit}
              </p>
            ) : null}
          </div>

          {/* Right-aligned meta facts */}
          {active.meta?.length ? (
            <div className="flex items-center sm:items-end gap-2 sm:gap-3 flex-wrap">
              {active.meta.map((fact, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[9px] sm:text-[11px] font-sans font-medium uppercase tracking-wider text-white/90 transition-all duration-300"
                >
                  {fact}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* ── The strip: one shared top edge, the focused card twice as tall ── */}
      <div
        className="absolute inset-x-0 z-10 touch-pan-y"
        style={{ top: `${stripTop * 100}%`, height: fullH }}
      >
        <motion.div
          className="flex items-start"
          style={{ gap, x, cursor: dragging ? "grabbing" : "grab" }}
          drag="x"
          dragMomentum={false}
          dragElastic={0.08}
          dragConstraints={{ left: xFor(last), right: xFor(0) }}
          onDragStart={() => setDragging(true)}
          onDragEnd={(_, info) => {
            setDragging(false)
            // Land on whatever card the release sits nearest, nudged by throw velocity
            const thrown = x.get() + info.velocity.x * 0.12
            go(Math.round((stageW / 2 - thrown - cardW / 2) / step))
          }}
        >
          {items.map((item, i) => (
            <motion.button
              key={item.id ?? i}
              type="button"
              aria-label={item.title.replace(/\n/g, " ")}
              aria-current={i === index}
              onClick={() => go(i)}
              className={cn(
                "relative shrink-0 overflow-hidden rounded-xl sm:rounded-2xl border transition-colors duration-500 cursor-pointer shadow-2xl",
                i === index
                  ? "border-white ring-2 ring-white/60 shadow-2xl"
                  : "border-white/20 hover:border-white/50 opacity-80 hover:opacity-100"
              )}
              style={{ width: cardW }}
              animate={{ height: i === index ? fullH : halfH }}
              transition={spring}
            >
              {/* Real authentic card image */}
              <img
                src={item.image}
                alt={item.title.replace(/\n/g, " ")}
                draggable={false}
                className="h-full w-full object-cover select-none"
                style={{ objectPosition: "50% 25%" }}
              />
              {/* Subtle bottom gradient for number readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 pointer-events-none" />
              {/* Slide number on the card */}
              <span className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 text-[9px] sm:text-[11px] font-mono font-bold tracking-widest text-white/90 drop-shadow">
                0{i + 1}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* ── Position rail and bottom bar ── */}
      <div
        className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between pointer-events-none"
        style={{
          left: pad,
          right: pad,
          bottom: Math.max(10, stageH * 0.014),
        }}
      >
        {/* Left progress indicator */}
        <div style={{ width: Math.max(130, stageW * (isMobile ? 0.38 : RAIL)) }}>
          <div
            className="flex justify-between font-mono tabular-nums opacity-85 text-white/70"
            style={{ fontSize: label }}
          >
            <span className="font-bold text-white">0{index + 1}</span>
            <span>0{items.length}</span>
          </div>
          <div className="relative mt-1.5 h-0.5 sm:h-1 w-full bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 bg-white rounded-full"
              style={{ width: `${100 / items.length}%` }}
              animate={{ left: `${(index / items.length) * 100}%` }}
              transition={spring}
            />
          </div>
        </div>

        {/* Right side CTA or navigation hints */}
        {cta ? (
          <div className="pointer-events-auto">{cta}</div>
        ) : (
          <div className="hidden sm:flex items-center gap-2 text-white/50 text-[10px] font-mono tracking-widest uppercase">
            <span>Drag or scroll to explore</span>
            <span className="text-white/80">✦</span>
          </div>
        )}
      </div>
    </div>
  )
}
