"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Users, Clock, Target, CheckCircle, X, ChevronUp } from "lucide-react"
import { useState, useEffect } from "react"
import { SectionNav, Section } from "@/components/ui/section-nav"

// Fade In Animation Component
function FadeInSection({ children, delay = 0, className = "", id }: { children: React.ReactNode; delay?: number; className?: string; id?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  )
}

// Lightbox Component
function Lightbox({ src, alt, isOpen, onClose }: { src: string; alt: string; isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-7xl max-h-full"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black bg-opacity-70 rounded-full p-2 text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white z-10 shadow-lg"
          style={{ lineHeight: 0 }}
          aria-label="Close image preview"
        >
          <X size={40} />
        </button>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={1200}
          height={800}
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
        />
      </div>
    </div>
  )
}

// Animated Section Component
function AnimatedSection({
  children,
  className = "",
  delay = 0,
  id,
}: { children: React.ReactNode; className?: string; delay?: number; id?: string }) {
  return (
    <FadeInSection delay={delay} className={className} id={id}>
      {children}
    </FadeInSection>
  )
}

// Clickable Image Component
function ClickableImage({
  src,
  alt,
  width,
  height,
  className = "",
  onClick,
}: { src: string; alt: string; width: number; height: number; className?: string; onClick?: () => void }) {
  return (
    <motion.div
      className={`relative cursor-pointer group ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover rounded-lg transition-all duration-300 group-hover:shadow-xl"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg flex items-center justify-center">
        {/* Subtle overlay effect */}
      </div>
    </motion.div>
  );
}

const SECTIONS: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "research-personas", label: "Research" },
  { id: "strategy-wireframes", label: "Strategy" },
  { id: "testing-final", label: "Testing" },
  { id: "outcomes", label: "Outcomes" },
]

export default function AutoflowPortfolio() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxAlt, setLightboxAlt] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 200);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  function openLightbox(src: string, alt: string) {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
    setLightboxSrc("");
    setLightboxAlt("");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Minimalist Back Arrow */}
      <a
        href="https://jonouyang.net/ui-ux"
        aria-label="Back to Portfolio"
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 2000,
          display: 'inline-block',
          padding: 0,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="18,6 10,14 18,22" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="18,6 10,14 18,22" stroke="#1c1c1c" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      {/* Section Navigation */}
      <SectionNav sections={SECTIONS} />
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <AnimatedSection className="mb-4 md:mb-8" id="overview">
          <div className="w-full h-56 md:h-96 rounded-lg overflow-hidden mb-4">
            <ClickableImage
              src="/a43ea1f4-3926-4e40-8bde-7d3f1148cae6_rw_1920 2.jpeg"
              alt="Mobile phone displaying the Autoflow service portal app interface showing a 2016 Chevrolet SS inspection with status indicators and priority alerts"
              width={800}
              height={400}
              onClick={() => openLightbox("/a43ea1f4-3926-4e40-8bde-7d3f1148cae6_rw_1920 2.jpeg", "Mobile phone displaying the Autoflow service portal app interface showing a 2016 Chevrolet SS inspection with status indicators and priority alerts")}
            />
          </div>
        </AnimatedSection>
        {/* ... rest of the code ... */}
      </main>
      <Lightbox src={lightboxSrc} alt={lightboxAlt} isOpen={lightboxOpen} onClose={closeLightbox} />
      {/* Return to Top Button (guaranteed outside main content) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Return to top"
          className="fixed bottom-6 right-6 z-[9999] bg-white border border-gray-200 shadow-lg rounded-full p-3 transition-opacity duration-300 hover:bg-red-50 hover:border-red-400 hover:shadow-xl"
          style={{ opacity: showScrollTop ? 1 : 0 }}
        >
          <ChevronUp size={28} className="text-red-500" />
        </button>
      )}
    </div>
  )
} 