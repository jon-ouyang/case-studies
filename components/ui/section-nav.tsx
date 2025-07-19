import React, { useEffect, useState, useRef } from "react"

const SECTION_NAV_BREAKPOINT = 768

export interface Section {
  id: string
  label: string
}

interface SectionNavProps {
  sections: Section[]
}

export const SectionNav: React.FC<SectionNavProps> = ({ sections }) => {
  const [active, setActive] = useState<string>(sections[0]?.id || "")
  const [isMobile, setIsMobile] = useState(false)
  const [accordionOpen, setAccordionOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const rafRef = useRef<number | null>(null)

  // Responsive check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < SECTION_NAV_BREAKPOINT)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Scroll spy & progress (smooth, real-time with requestAnimationFrame)
  useEffect(() => {
    let ticking = false
    const updateScroll = () => {
      let found = sections[0]?.id || ""
      const sectionTops = sections.map(section => {
        const el = document.getElementById(section.id)
        return el ? el.getBoundingClientRect().top + window.scrollY - 120 : null
      })
      const scrollTop = window.scrollY
      // --- FIX: Always highlight last section if near bottom ---
      if (
        document.documentElement.scrollHeight - (scrollTop + window.innerHeight) < 200 &&
        sections.length > 0
      ) {
        found = sections[sections.length - 1].id
        setActive(found)
        ticking = false
        return
      }
      // --- END FIX ---
      for (let i = 0; i < sectionTops.length; i++) {
        const top = sectionTops[i]
        const nextTop = sectionTops[i + 1]
        if (top !== null) {
          if (i === sectionTops.length - 1) {
            // Last section: active if at or past its top
            if (scrollTop >= top - 2) {
              found = sections[i].id
            }
          } else if (scrollTop >= top - 2 && (nextTop === null || scrollTop < nextTop - 2)) {
            found = sections[i].id
          }
        }
      }
      setActive(found)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        rafRef.current = requestAnimationFrame(updateScroll)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    // Initial update
    updateScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [sections])

  // Smooth scroll
  const handleNavClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      setAccordionOpen(false)
    }
  }

  // Accordion close on outside click (robust)
  useEffect(() => {
    if (!accordionOpen) return
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target)
      ) {
        setAccordionOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [accordionOpen])

  const font = 'Helvetica Neue, Helvetica, Arial, sans-serif'

  // Desktop: bottom nav bar with all links, spaced out, and progress bar
  if (!isMobile) {
    return (
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 1200 }}>
        <nav
          aria-label="Section Navigation"
          style={{
            background: '#fff',
            borderTop: '1px solid #1c1c1c', // thin black line
            boxShadow: '0 -2px 12px rgba(0,0,0,0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: font,
            fontWeight: 700,
            fontSize: '1.15em',
            letterSpacing: 0.5,
            padding: '0 0',
            overflowX: 'auto',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', width: '100%', maxWidth: 1200, justifyContent: 'space-between', gap: 48 }}>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={handleNavClick(section.id)}
                style={{
                  color: active === section.id ? '#ff0000' : '#1c1c1c',
                  fontWeight: active === section.id ? 900 : 700,
                  borderBottom: active === section.id ? '2.5px solid #ff0000' : '2.5px solid transparent',
                  padding: '18px 32px 12px 32px',
                  textDecoration: 'none',
                  background: 'none',
                  outline: 'none',
                  transition: 'color 0.2s, border-bottom 0.2s',
                  fontFamily: font,
                  fontSize: '1em',
                  cursor: 'pointer',
                  minWidth: 90,
                  display: 'inline-block',
                }}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') handleNavClick(section.id)(e as any)
                }}
              >
                {section.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    )
  }

  // Mobile: bottom bar with Jump to Section button, accordion expands upward (button always clickable)
  return (
    <div ref={wrapperRef}>
      <nav
        aria-label="Section Navigation"
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1200,
          background: '#fff',
          borderTop: '2px solid #ff0000',
          boxShadow: '0 -2px 12px rgba(0,0,0,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: font,
          fontWeight: 700,
          fontSize: '1.1em',
          letterSpacing: 0.5,
          padding: 0,
        }}
      >
        <button
          ref={buttonRef}
          aria-label="Jump to Section"
          onClick={() => setAccordionOpen((v) => !v)}
          style={{
            width: '100%',
            textAlign: 'center',
            color: '#1c1c1c',
            fontWeight: 700,
            background: 'none',
            border: 'none',
            fontFamily: font,
            fontSize: '1.1em',
            cursor: 'pointer',
            padding: '18px 0 12px 0',
            outline: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            zIndex: 1301, // ensure button is above accordion
            position: 'relative',
          }}
        >
          <span>Jump to Section</span>
          <span
            aria-hidden="true"
            style={{
              display: 'inline-block',
              marginLeft: 8,
              transition: 'transform 0.25s cubic-bezier(.4,0,.2,1)',
              fontSize: '1.5em',
              color: '#1c1c1c',
              transform: accordionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              lineHeight: 0,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
              <polyline points="6,18 14,10 22,18" stroke="#1c1c1c" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </nav>
      {/* Accordion-style menu, starts above the button and never covers it */}
      <div
        ref={accordionRef}
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 56, // always above the nav bar/button
          zIndex: 1300,
          background: '#fff',
          boxShadow: accordionOpen ? '0 -2px 24px rgba(0,0,0,0.10)' : 'none',
          borderTop: accordionOpen ? '2px solid #ff0000' : 'none',
          borderRadius: accordionOpen ? '18px 18px 0 0' : '0',
          maxHeight: accordionOpen ? 400 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.2s',
          pointerEvents: accordionOpen ? 'auto' : 'none',
        }}
        aria-hidden={!accordionOpen}
      >
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%' }}>
          {sections.map((section) => (
            <li key={section.id} style={{ marginBottom: 0 }}>
              <a
                href={`#${section.id}`}
                onClick={handleNavClick(section.id)}
                className={active === section.id ? 'active' : ''}
                style={{
                  color: active === section.id ? '#ff0000' : '#1c1c1c',
                  fontWeight: active === section.id ? 900 : 700,
                  fontSize: '1.2em',
                  textDecoration: active === section.id ? 'underline' : 'none',
                  transition: 'color 0.2s',
                  outline: 'none',
                  fontFamily: font,
                  display: 'block',
                  padding: '18px 0',
                  textAlign: 'center',
                  background: 'none',
                }}
                tabIndex={accordionOpen ? 0 : -1}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') handleNavClick(section.id)(e as any)
                }}
              >
                {section.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              onClick={e => {
                e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setAccordionOpen(false)
              }}
              style={{
                color: '#ff0000',
                fontWeight: 900,
                fontSize: '1.1em',
                textDecoration: 'underline',
                fontFamily: font,
                display: 'block',
                padding: '18px 0',
                textAlign: 'center',
                background: 'none',
              }}
              tabIndex={accordionOpen ? 0 : -1}
            >
              Back to the Top
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SectionNav 