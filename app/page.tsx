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
      onClick={onClose} // clicking overlay closes
    >
      <div
        className="relative max-w-7xl max-h-full"
        onClick={e => e.stopPropagation()} // clicking image/modal does not close
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

        {/* Hook / Overview */}
        <AnimatedSection className="mb-4 md:mb-8" id="overview">
          <div className="mb-8">
            <h1
              className="font-bold mb-4 text-4xl"
            >
              Autoflow: Transforming Shop Operations
            </h1>
            <p
              className="text-xl text-gray-700 mb-6"
            >
              Reimagined a complex B2B auto shop SaaS, streamlining task flows and boosting operational efficiency by 30%. Led UX, UI, and product strategy to support shop owners in managing jobs, parts, and payments with dramatically less friction.
            </p>

            <div
              className="grid grid-cols-4 gap-6 text-sm mb-8"
            >
              {[
                { icon: Users, color: "text-blue-600", label: "My Role", value: "UX Designer" },
                { icon: Users, color: "text-green-600", label: "Team", value: "2 PD • 1 PM • 1 FE" },
                { icon: Clock, color: "text-orange-600", label: "Timeline", value: "6 months" },
                { icon: Target, color: "text-purple-600", label: "Platform", value: "Web & Mobile" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2"
                >
                  <item.icon size={16} className={item.color} />
                  <div>
                    <span className="font-semibold text-gray-900 block">{item.label}</span>
                    <p className="text-gray-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Impact Section - Separate from AnimatedSection to allow proper spacing */}
        <div className="mt-20 mb-12" style={{ marginTop: '80px', marginBottom: '48px' }}>
          <div
            className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg"
            style={{ marginTop: '80px' }}
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-600 mt-1" size={20} />
              <div>
                <p className="text-green-800 font-medium mb-2">
                  <strong>Impact:</strong> Achieved 35% increase in customer satisfaction and 25% reduction in task
                  completion time within three months of launch.
                </p>
                <p className="text-green-700 text-sm">
                  The redesign led to 40% increase in mobile usage and 50% improvement in feature adoption rates across
                  all user types.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge */}
        <AnimatedSection className="mb-16" id="challenge" delay={0.2}>
          <h2 className="text-3xl font-bold mb-6">Business Problem: Fragmented Workflows</h2>

          <div className="mb-8">
            <p className="text-lg text-gray-700 mb-6">
              Independent shops faced costly inefficiencies and customer churn due to legacy tools. I defined a unified product vision to streamline operations, clarify task ownership, and boost retention.
            </p>

            <div
              className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8"
            >
              <h3 className="font-semibold text-lg mb-3 text-red-800">Strategic Framing</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: "Business Challenges",
                  color: "border-red-200",
                  titleColor: "text-red-800",
                  items: [
                    "Low platform adoption (32%)",
                    "High customer churn rate",
                    "Inefficient task workflows",
                    "Poor mobile experience",
                    "Weak competitive positioning",
                  ],
                },
                {
                  title: "User Pain Points",
                  color: "border-orange-200",
                  titleColor: "text-yellow-800",
                  items: [
                    "Confusing navigation structure",
                    "Inconsistent visual design",
                    "Limited mobile functionality",
                    "Unclear task prioritization",
                    "Poor customer communication",
                  ],
                },
                {
                  title: "Technical Issues",
                  color: "border-blue-200",
                  titleColor: "text-blue-800",
                  items: [
                    "Slow loading times",
                    "Frequent system crashes",
                    "Poor data synchronization",
                    "Limited offline capabilities",
                    "Outdated technology stack",
                  ],
                },
              ].map((card, index) => (
                <div
                  key={index}
                >
                  <Card className={`${card.color} hover:shadow-lg transition-shadow duration-300`}>
                    <CardContent className="p-6">
                      <h4 className={`font-semibold ${card.titleColor} mb-3`}>{card.title}</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        {card.items.map((item, itemIndex) => (
                          <li key={itemIndex}>• {item}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div
            className="bg-gray-50 p-6 rounded-lg"
          >
            <h4 className="font-semibold mb-3">Project Objectives</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Primary Goals</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Improve task efficiency by 30%</li>
                  <li>• Increase feature adoption by 50%</li>
                  <li>• Enhance mobile user experience</li>
                  <li>• Streamline customer communication</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Success Metrics</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• User satisfaction scores</li>
                  <li>• Task completion rates</li>
                  <li>• Mobile engagement metrics</li>
                  <li>• Customer retention rates</li>
                </ul>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Research Process */}
        <AnimatedSection className="mb-16" id="research-personas" delay={0.3}>
          <h2 className="text-3xl font-bold mb-8 mt-12">User & Market Insights</h2>

          <p className="text-gray-700 mb-6">
            I led a multi-modal research initiative—interviews, field studies, and competitive analysis—to surface actionable pain points and opportunity areas. Insights directly informed product priorities and design direction.
          </p>

          <div
            className="bg-blue-50 p-6 rounded-lg mb-8"
          >
            <h4 className="font-semibold mb-3">Research Objectives</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Understand current workflow pain points</li>
                <li>• Identify communication breakdowns</li>
                <li>• Analyze competitor solutions</li>
                <li>• Map user journey touchpoints</li>
              </ul>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Validate mobile-first approach</li>
                <li>• Discover feature prioritization</li>
                <li>• Assess technical constraints</li>
                <li>• Define success criteria</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            {[
              {
                title: "User Pain Points Analysis",
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/79b110f7-a569-41e0-bb92-0630c1f31d65_rw_1200.jpg-zbCt1itlHXWGTvWLrYoTrFJ9ixWHs9.jpeg",
                alt: "User pain points pie chart showing Loading Issues 35%, Difficult Navigation 25%, Confusing Info 20%, Low Readability 15%, Poor Layout 5%",
                caption: "Analysis of 50+ user feedback sessions across 12 mechanic shops",
              },
              {
                title: "Affinity Mapping",
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/73b4eee2-1521-4bd4-b889-22064eb1af3d_rw_3840.jpg-h4bmysV9xvuZCrfl6fnSjDA6aooccT.jpeg",
                alt: "Affinity mapping showing customer problems categorized into Problems, Communication, Dishonesty, and Customer Service Issues",
                caption: "Categorizing themes from 25 stakeholder interviews",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">{item.title}</h4>
                    <div className="w-full rounded-lg overflow-hidden mb-4">
                      <ClickableImage src={item.src} alt={item.alt} width={800} height={400} onClick={() => openLightbox(item.src, item.alt)} />
                    </div>
                    <p className="text-sm text-gray-600">{item.caption}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div
            className="bg-blue-50 p-6 rounded-lg mb-8"
          >
            <h4 className="font-semibold mb-3">Key Research Insights</h4>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <blockquote className="text-gray-700 italic mb-2">
                  "I spend more time fighting with the software than actually fixing cars."
                </blockquote>
                <p className="text-gray-700 text-sm">— Lead Mechanic, 15+ years experience</p>
              </div>
              <div>
                <blockquote className="text-gray-700 italic mb-2">
                  "Customers call constantly asking for updates because they can't track progress themselves."
                </blockquote>
                <p className="text-gray-700 text-sm">— Shop Owner, Family Business</p>
              </div>
            </div>
          </div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Research Methods & Participants</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">User Interviews</h5>
                    <p className="text-sm text-gray-600 mb-2">25 participants across 3 user types</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• 12 Mechanics</li>
                      <li>• 8 Shop Owners</li>
                      <li>• 5 Customers</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Observational Studies</h5>
                    <p className="text-sm text-gray-600 mb-2">8 shop visits over 2 weeks</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Workflow mapping</li>
                      <li>• Pain point identification</li>
                      <li>• Technology usage patterns</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Competitive Analysis</h5>
                    <p className="text-sm text-gray-600 mb-2">5 direct and indirect competitors</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• Feature comparison</li>
                      <li>• UX evaluation</li>
                      <li>• Market positioning</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatedSection>

        {/* Building User Empathy */}
        <AnimatedSection className="mb-16" id="personas" delay={0.4}>
          <h2 className="text-3xl font-bold mb-6">User Archetypes & Journey Mapping</h2>

          <p className="text-gray-700 mb-6">
            Synthesized research into actionable user archetypes and journey maps, directly informing product priorities and design tradeoffs. Each persona reflects a core business segment and operational reality.
          </p>

          <div>
            <h3 className="text-xl font-semibold mb-4">Primary Personas</h3>
            <p className="text-gray-600 mb-6">
              Personas were derived from direct field observation and stakeholder interviews, ensuring every design decision mapped to real operational needs and business value.
            </p>

            <div className="space-y-8">
              {[
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/c3c3f65a-2307-4c54-9f3c-a5e5caf11957_rw_1920-LzWSZpPmK2cwwenYel1n0hmonC962m.png",
                  alt: "User journey map for Orville Bratton showing his experience with the software across Context, Process, Conflict, Communication, and Outcome phases",
                  name: "Orville Bratton",
                  role: "Lead Technician, 15+ years",
                  description: "Primary persona - represents 60% of platform users",
                  goals: [
                    "Complete work orders efficiently",
                    "Maintain quality standards",
                    "Minimize administrative tasks",
                  ],
                  pains: ["Complex interface slows work", "Poor mobile experience", "Unclear task prioritization"],
                },
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5f86596d-357d-4a47-888d-1ab6552b6c8f_rw_1920-lVdNz0qch41rbjtcioXdhrpi9qxhdt.png",
                  alt: "User journey map for Dev Gupta showing his experience with scheduling and task management across different phases",
                  name: "Dev Gupta",
                  role: "Junior Technician, 3 years",
                  description: "Secondary persona - represents 25% of users",
                  goals: ["Learn new skills quickly", "Avoid making mistakes", "Build confidence with tools"],
                  pains: ["Information overload", "Steep learning curve", "Limited guidance/help"],
                },
                {
                  src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/836a3338-bcc4-4d33-adc2-55475415054b_rw_1920-aGyeFAho1f2pBQsTC4wNtichOBUDWh.png",
                  alt: "User journey map for Ashley Pham showing her experience as a manager using the software for team coordination",
                  name: "Ashley Pham",
                  role: "Shop Manager, 8 years",
                  description: "Key persona - represents 15% but high influence",
                  goals: ["Optimize team productivity", "Improve customer satisfaction", "Reduce operational costs"],
                  pains: ["Limited team visibility", "Manual reporting tasks", "Customer communication gaps"],
                },
              ].map((persona, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="w-full rounded-lg overflow-hidden mb-4">
                        <ClickableImage src={persona.src} alt={persona.alt} width={800} height={300} onClick={() => openLightbox(persona.src, persona.alt)} />
                      </div>
                      <div className="md:hidden space-y-6">
                        {/* Mobile layout: centered header + side by side content */}
                        <div className="text-center">
                          <h4 className="font-semibold text-lg">{persona.name}</h4>
                          <p className="text-gray-600 mb-2">{persona.role}</p>
                          <p className="text-sm text-gray-600">{persona.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Goals & Motivations</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {persona.goals.map((goal, goalIndex) => (
                                <li key={goalIndex}>• {goal}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Pain Points</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {persona.pains.map((pain, painIndex) => (
                                <li key={painIndex}>• {pain}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:grid grid-cols-3 gap-6">
                        {/* Desktop layout: 3 side-by-side columns */}
                        <div>
                          <h4 className="font-semibold text-lg">{persona.name}</h4>
                          <p className="text-gray-600 mb-2">{persona.role}</p>
                          <p className="text-sm text-gray-600">{persona.description}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Goals & Motivations</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {persona.goals.map((goal, goalIndex) => (
                              <li key={goalIndex}>• {goal}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Pain Points</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {persona.pains.map((pain, painIndex) => (
                              <li key={painIndex}>• {pain}</li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Translating Needs into Features */}
        <AnimatedSection className="mb-16" id="strategy-wireframes" delay={0.5}>
          <h2 className="text-3xl font-bold mb-6">Feature Strategy & Prioritization</h2>

          <p className="text-gray-700 mb-6">
            Transformed research insights into a focused feature roadmap, balancing user impact, technical feasibility, and business goals. Prioritized initiatives that delivered measurable operational gains and customer value.
          </p>

          <div className="w-full rounded-lg overflow-hidden mb-6">
            <ClickableImage
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6458e198-b65b-42b8-8eb2-13b8f8f97906_rw_1920-0KS9IlJfWbmSHGS18XqQjv19qTv5ik.png"
              alt="Comprehensive design system mood board showing color psychology, brand examples, palette examples, and various UI design elements"
              width={800}
              height={400}
              onClick={() => openLightbox("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6458e198-b65b-42b8-8eb2-13b8f8f97906_rw_1920-0KS9IlJfWbmSHGS18XqQjv19qTv5ik.png", "Comprehensive design system mood board showing color psychology, brand examples, palette examples, and various UI design elements")}
            />
          </div>
          <p className="text-sm text-gray-600 mb-8 text-center">
            Design system exploration and strategic visual direction
          </p>

          <div className="grid grid-cols-2 gap-8 mb-8">
            {[
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/34475650-c355-4e86-9356-015e53b80091_rw_1920-SsExViprKlyHUhjEa3uGOQw685PiF3.png",
                alt: "Detailed UI mockup showing automotive service app interface with annotations for different UI elements",
                title: "Interface Pattern Analysis",
                description: "Deconstructing successful interaction models and information architecture patterns",
              },
              {
                src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6535b813-b0e9-407e-b3c8-91c806c6f3ec_rw_3840-GcYIYep7k0ui2Ir1llnt5dRbni4agm.jpeg",
                alt: "Design system showing various UI screens and components organized in a grid layout with different iterations",
                title: "Component System Evolution",
                description: "Iterative development of scalable design components and patterns",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="space-y-4"
              >
                <div className="w-full rounded-lg overflow-hidden">
                  <ClickableImage src={item.src} alt={item.alt} width={400} height={200} onClick={() => openLightbox(item.src, item.alt)} />
                </div>
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h5 className="font-bold text-lg mb-6">Design Principles & Strategy</h5>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Core Principles</h5>
                    <div className="space-y-3">
                      <div>
                        <h6 className="font-medium text-gray-800">Clarity First</h6>
                        <p className="text-sm text-gray-600">
                          Clear information hierarchy and intuitive navigation patterns
                        </p>
                      </div>
                      <div>
                        <h6 className="font-medium text-gray-800">Efficiency Focus</h6>
                        <p className="text-sm text-gray-600">
                          Streamlined workflows that minimize cognitive load and user effort
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Strategic Approach</h5>
                    <div className="space-y-3">
                      <div>
                        <h6 className="font-medium text-gray-800">Mobile-First Design</h6>
                        <p className="text-sm text-gray-600">
                          Responsive interface that scales gracefully across all devices
                        </p>
                      </div>
                      <div>
                        <h6 className="font-medium text-gray-800">Progressive Enhancement</h6>
                        <p className="text-sm text-gray-600">Real-time feedback and contextual system status updates</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </AnimatedSection>

        {/* Design & Prototype */}
        <AnimatedSection className="mb-16" id="wireframes" delay={0.6}>
          <h2 className="text-3xl font-bold mb-6">Design Execution & Iteration</h2>

          <p className="text-gray-700 mb-6">
            Drived rapid prototyping and iterative design, validating solutions with real users at every stage. Each design decision was grounded in business objectives and user feedback.
          </p>

          <div className="space-y-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Sketching User Flows & Information Architecture</h3>
              <div className="w-full rounded-lg mb-4">
                <ClickableImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e483f90b-c0fa-4d16-ab81-602f3fe78cc7_rw_1920-H1bn5cSYpyG0qCVsWizQKunnfMWKvs.png"
                  alt="Early wireframe mockup showing basic layout structure with placeholder content areas and navigation elements"
                  width={800}
                  height={300}
                  onClick={() => openLightbox("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e483f90b-c0fa-4d16-ab81-602f3fe78cc7_rw_1920-H1bn5cSYpyG0qCVsWizQKunnfMWKvs.png", "Early wireframe mockup showing basic layout structure with placeholder content areas and navigation elements")}
                />
              </div>
              <p className="text-sm text-gray-600">
                Low-fidelity exploration of core user flows and navigation structure
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Progressive Design Refinement</h3>
              <div className="w-full rounded-lg mb-4">
                <ClickableImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4cea0316-b20c-4219-ac7d-69f3efa41a52_rw_3840-JJbHGWbg5JUNQffiWJq2LFjyWrGWTt.png"
                  alt="Comprehensive application design process showing wireframes, mobile screens, and various interface designs for different user types"
                  width={800}
                  height={400}
                  onClick={() => openLightbox("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4cea0316-b20c-4219-ac7d-69f3efa41a52_rw_3840-JJbHGWbg5JUNQffiWJq2LFjyWrGWTt.png", "Comprehensive application design process showing wireframes, mobile screens, and various interface designs for different user types")}
                />
              </div>
              <p className="text-sm text-gray-600">
                Evolution from concept sketches through wireframes to high-fidelity prototypes
              </p>
            </div>
          </div>

          <div
            className="bg-gray-50 p-6 rounded-lg mb-8"
          >
            <h4 className="font-semibold mb-3">Key Design Considerations</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Technical Constraints</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Legacy system integration requirements</li>
                  <li>• Offline functionality for shop floor use</li>
                  <li>• Cross-platform compatibility needs</li>
                  <li>• Performance optimization for older devices</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-2">User Context</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Hands-on work environment considerations</li>
                  <li>• Varying levels of technical expertise</li>
                  <li>• Time-pressured decision making</li>
                  <li>• Multi-device usage patterns</li>
                </ul>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Test & Iterate */}
        <AnimatedSection className="mb-16" id="testing-final" delay={0.7}>
          <h2 className="text-3xl font-bold mb-6">Test & Iterate</h2>

          <p className="text-gray-700 mb-6">
            I conducted multiple rounds of usability testing with real users in authentic environments to validate
            design decisions and identify areas for improvement.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {[
              {
                title: "Testing Methodology",
                content: (
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Round 1: Concept Validation</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 8 participants across 3 user types</li>
                        <li>• Low-fidelity prototype testing</li>
                        <li>• Focus on core user flows</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Round 2: Usability Refinement</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 12 participants in shop environments</li>
                        <li>• High-fidelity interactive prototypes</li>
                        <li>• Task completion and error analysis</li>
                      </ul>
                    </div>
                  </div>
                ),
              },
              {
                title: "Testing Results",
                content: (
                  <div className="space-y-3">
                    {[
                      { label: "Task Completion Rate", value: "94%", color: "text-green-600" },
                      { label: "User Satisfaction Score", value: "4.7/5", color: "text-green-600" },
                      { label: "Time on Task Reduction", value: "-32%", color: "text-green-600" },
                      { label: "Error Rate Decrease", value: "-45%", color: "text-green-600" },
                    ].map((metric, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-gray-600">{metric.label}</span>
                        <span className={`font-semibold ${metric.color} text-lg`}>{metric.value}</span>
                      </div>
                    ))}
                  </div>
                ),
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">{card.title}</h4>
                    {card.content}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div
            className="bg-orange-50 p-6 rounded-lg mb-8"
          >
            <h4 className="font-semibold mb-3">Critical Design Changes Based on Testing</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-orange-800 mb-2">Navigation Improvements</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Reduced main navigation from 5 to 3 sections</li>
                  <li>• Added contextual breadcrumbs for complex flows</li>
                  <li>• Implemented persistent action buttons</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-orange-800 mb-2">Interaction Enhancements</h5>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Increased touch targets to 44px minimum</li>
                  <li>• Added haptic feedback for critical actions</li>
                  <li>• Improved visual feedback for system status</li>
                </ul>
              </div>
            </div>
          </div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">User Feedback Highlights</h4>
                <div className="space-y-4">
                  <blockquote
                    className="text-gray-700 italic border-l-4 border-red-500 pl-4"
                  >
                    "This actually makes sense now. I can get to what I need without thinking about it."
                  </blockquote>
                  <p className="text-sm text-gray-600">— Lead Technician, after Round 2 testing</p>

                  <blockquote
                    className="text-gray-700 italic border-l-4 border-green-500 pl-4"
                  >
                    "The mobile experience is night and day better. I can actually use this on the shop floor."
                  </blockquote>
                  <p className="text-sm text-gray-600">— Junior Mechanic, mobile usability test</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatedSection>

        {/* Final Solution */}
        <AnimatedSection className="mb-16" id="final" delay={0.8}>
          <h2 className="text-3xl font-bold mb-6">Final Solution</h2>

          <p className="text-gray-700 mb-8">
            The redesigned Autoflow platform delivers a cohesive, efficient experience that addresses core user needs
            while supporting business objectives. The solution prioritizes task visibility, workflow efficiency, and
            seamless cross-device functionality.
          </p>

          <div className="space-y-12">
            {/* Mobile Experience */}
            <AnimatedSection className="mb-16" delay={0.75}>
              <h2 className="text-3xl font-bold mb-6">Key UX Decisions</h2>
              <div className="space-y-8">
                <div>
                  <h4 className="font-semibold mb-2">Mobile-First Navigation</h4>
                  <p className="text-gray-700 text-base">Prioritized a mobile-optimized navigation structure, increasing on-the-go task completion by 40% and reducing user drop-off during critical workflows.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Progressive Disclosure</h4>
                  <p className="text-gray-700 text-base">Implemented progressive disclosure patterns to minimize cognitive load, enabling new users to onboard 30% faster and reducing support requests.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Color-Coded Task Urgency</h4>
                  <p className="text-gray-700 text-base">Standardized color-coding for task urgency, accelerating triage and reducing errors in high-volume shop environments.</p>
                </div>
              </div>
            </AnimatedSection>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Mobile-First Customer Experience</h3>
              <div className="w-full rounded-lg mb-8">
                <ClickableImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a43ea1f4-3926-4e40-8bde-7d3f1148cae6_rw_1920-eot4YR8jzzpM5LZwkJ1ysYFDbo92DV.jpeg"
                  alt="Mobile phone displaying the Autoflow service portal app interface showing a 2016 Chevrolet SS inspection with status indicators"
                  width={800}
                  height={400}
                  onClick={() => openLightbox("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a43ea1f4-3926-4e40-8bde-7d3f1148cae6_rw_1920-eot4YR8jzzpM5LZwkJ1ysYFDbo92DV.jpeg", "Mobile phone displaying the Autoflow service portal app interface showing a 2016 Chevrolet SS inspection with status indicators")}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Real-Time Progress Tracking</h4>
                  <p className="text-gray-600 text-sm">
                    Customers receive instant updates on repair status with clear visual indicators, estimated
                    completion times, and detailed progress photos.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Priority-Based Organization</h4>
                  <p className="text-gray-600 text-sm">
                    Color-coded priority system helps users quickly identify urgent items, future attention needs, and
                    completed tasks.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile User Flow */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Streamlined User Journey</h3>
              <div className="w-full rounded-lg mb-4">
                <ClickableImage
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d6290e86-3f92-40e8-9b8b-65e807661063_rw_3840-x8rHDD5ltn2jAIex8OGo25LQ5kfREW.jpeg"
                  alt="Comprehensive mobile app flow showing customer lookup, vehicle selection, service scheduling, and appointment booking process"
                  width={800}
                  height={300}
                  onClick={() => openLightbox("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d6290e86-3f92-40e8-9b8b-65e807661063_rw_3840-x8rHDD5ltn2jAIex8OGo25LQ5kfREW.jpeg", "Comprehensive mobile app flow showing customer lookup, vehicle selection, service scheduling, and appointment booking process")}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Simplified Booking",
                    description:
                      "Reduced appointment scheduling from 8 steps to 4, with smart defaults and auto-population.",
                  },
                  {
                    title: "Intelligent Search",
                    description:
                      "Advanced filtering and search capabilities help users find information quickly and efficiently.",
                  },
                  {
                    title: "Contextual Actions",
                    description: "Relevant actions appear based on user context and current workflow stage.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                  >
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Application */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Professional Desktop Interface</h3>
              <div className="space-y-6">
                <div className="w-full rounded-lg overflow-hidden">
                  <ClickableImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e16a3e3d-c2fd-4d6d-8eaf-a452b22fc6ae_rw_3840-ylfuJzKMiooizBxwDz7uWjgLFssLMS.jpeg"
                    alt="Three desktop application screens showing inspection reports, service details, and various UI components"
                    width={800}
                    height={300}
                    onClick={() => openLightbox("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/e16a3e3d-c2fd-4d6d-8eaf-a452b22fc6ae_rw_3840-ylfuJzKMiooizBxwDz7uWjgLFssLMS.jpeg", "Three desktop application screens showing inspection reports, service details, and various UI components")}
                  />
                </div>
                <div className="w-full rounded-lg overflow-hidden">
                  <ClickableImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4a25d6e7-8195-409a-9fc8-3ef86d2fb11b_rw_3840-7iVzFu6kHRAGUWVrrshFubmDjMLzyK.jpeg"
                    alt="Five desktop screens showing different stages of inspection and service process with completion status"
                    width={800}
                    height={200}
                    onClick={() => openLightbox("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4a25d6e7-8195-409a-9fc8-3ef86d2fb11b_rw_3840-7iVzFu6kHRAGUWVrrshFubmDjMLzyK.jpeg", "Five desktop screens showing different stages of inspection and service process with completion status")}
                  />
                </div>
                <div className="mt-8"></div>
              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Unified Dashboard</h4>
                    <p className="text-gray-600 text-sm">
                      Consolidated task view with priority indicators, progress tracking, and quick action buttons for
                      common workflows.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Detailed Reporting</h4>
                    <p className="text-gray-600 text-sm">
                      Comprehensive inspection reports with photo documentation, status tracking, and automated customer
                      communication.
                    </p>
                  </div>
                </div>
            </div>

            {/* Administrative Tools */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Management & Configuration Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="w-full rounded-lg overflow-hidden">
                  <ClickableImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5b27cbf0-eeff-418e-8940-33ff75a3ef57_rw_1920-e3p5iQcv7kynBix6UEAXToKfkl21jN.png"
                    alt="Email template builder interface showing step-by-step process for creating email templates"
                    width={400}
                    height={200}
                    onClick={() => openLightbox("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5b27cbf0-eeff-418e-8940-33ff75a3ef57_rw_1920-e3p5iQcv7kynBix6UEAXToKfkl21jN.png", "Email template builder interface showing step-by-step process for creating email templates")}
                  />
                </div>
                <div className="w-full rounded-lg overflow-hidden">
                  <ClickableImage
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7b162582-83c9-43b5-b9db-290829f2a7b5_rw_1920-eYdbAyYFe61XCZPPiJ1sfphfUgaQfY.png"
                    alt="Campaign configuration screen showing messaging options and administrative controls"
                    width={400}
                    height={200}
                    onClick={() => openLightbox("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7b162582-83c9-43b5-b9db-290829f2a7b5_rw_1920-eYdbAyYFe61XCZPPiJ1sfphfUgaQfY.png", "Campaign configuration screen showing messaging options and administrative controls")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Template Management</h4>
                  <p className="text-gray-600 text-sm">
                    Drag-and-drop email template builder with pre-designed components for common customer
                    communications.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Campaign Automation</h4>
                  <p className="text-gray-600 text-sm">
                    Automated messaging workflows that trigger based on service milestones and customer preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Outcomes & Impact */}
        <AnimatedSection className="mb-16" id="outcomes" delay={0.9}>
          <h2 className="text-3xl font-bold mb-6">Business Results & Product Impact</h2>

          <p className="text-gray-700 mb-8">
            The Autoflow redesign delivered measurable business value—surpassing KPIs for efficiency, adoption, and customer satisfaction. Post-launch metrics and qualitative feedback validated the product strategy and execution.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Card className="border-green-200 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4 text-green-800">Quantitative Results</h4>
                  <div className="space-y-4">
                    {[
                      { label: "Customer Satisfaction", value: "+35%" },
                      { label: "Task Completion Time", value: "-25%" },
                      { label: "Mobile Platform Usage", value: "+40%" },
                      { label: "Feature Adoption Rate", value: "+50%" },
                      { label: "User Error Rate", value: "-45%" },
                    ].map((metric, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-gray-700">{metric.label}</span>
                        <span className="font-bold text-green-600 text-lg">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Card className="border-red-200 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4 text-red-800">Qualitative Impact</h4>
                  <div className="space-y-4">
                    {[
                      "The new interface is so much cleaner. I can find what I need without getting lost in menus.",
                      "Mobile updates are a game-changer. Customers love seeing real-time progress on their repairs.",
                      "Task management is finally intuitive. My entire team adopted it within the first week.",
                      "We've reduced customer service calls by 60% since launch. People can find answers themselves now.",
                    ].map((quote, index) => (
                      <blockquote
                        key={index}
                        className="text-sm italic text-gray-700"
                      >
                        "{quote}"
                      </blockquote>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div
            className="bg-gray-50 p-6 rounded-lg mb-8"
          >
            <h4 className="font-semibold mb-3">Long-term Business Impact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Market Position</h5>
                <p className="text-gray-700 text-sm">
                  The redesign strengthened Autoflow's competitive position, leading to 23% increase in new client
                  acquisition and improved customer retention rates.
                </p>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Operational Efficiency</h5>
                <p className="text-gray-700 text-sm">
                  Shops reported 30% reduction in administrative overhead and 40% improvement in customer communication
                  efficiency.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Interactive Prototype */}
        <AnimatedSection className="mb-16" delay={0.9}>
          <h2 className="text-3xl font-bold mb-6">Interactive Prototype</h2>
          
          <p className="text-gray-700 mb-8">
            Experience the redesigned Autoflow interface firsthand. This interactive prototype showcases the streamlined dashboard, 
            mobile-responsive design, and improved user flows that resulted from our research-driven design process.
          </p>

          <div className="flex justify-center mb-8">
            <div className="w-full max-w-4xl">
              <iframe 
                style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }} 
                width="100%" 
                height="450" 
                src="https://embed.figma.com/design/34vP7VrZoCaIWwM96A5LT8/Working-File---Depracated?node-id=26-3963&embed-host=share" 
                allowFullScreen
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Secondary CTA: View Full Prototype in Figma */}
          <div className="flex justify-center mb-8">
            <a
              href="https://www.figma.com/proto/34vP7VrZoCaIWwM96A5LT8/Working-File---Depracated?node-id=26-3963&embed-host=share"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#e53935] text-[#e53935] font-semibold px-6 py-2 rounded-full transition-all duration-200 hover:bg-[#e53935] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#e53935]"
              style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', letterSpacing: '0.01em' }}
            >
              View Full Prototype in Figma
            </a>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              <strong>Try it out:</strong> Navigate through the dashboard, explore the mobile interface, and experience the improved task management flows.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span>• Dashboard Overview</span>
              <span>• Task Management</span>
              <span>• Mobile Interface</span>
              <span>• Customer Communication</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Project Reflection */}
        <AnimatedSection className="mb-16" delay={1.0}>
          <h2 className="text-3xl font-bold mb-6">Strategic Learnings & Next Steps</h2>
          <div className="flex flex-col md:flex-row gap-8 mb-8 items-start justify-center">
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}>
              <Card className="hover:shadow-lg transition-shadow duration-300 max-w-xl mx-auto">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-4" style={{ color: '#1c1c1c' }}>What I Learned</h4>
                  <ul className="space-y-4 text-gray-700">
                    <li><span className="font-bold text-[#e53935]">User research is everything:</span> Early interviews and journey mapping revealed pain points we never would have guessed.</li>
                    <li><span className="font-bold text-[#e53935]">Mobile-first design is non-negotiable:</span> The majority of Zing’s users order on their phones, so every decision was made with mobile in mind.</li>
                    <li><span className="font-bold text-[#e53935]">Iterative prototyping pays off:</span> Multiple rounds of user testing led to a dramatically better product.</li>
                    <li><span className="font-bold text-[#e53935]">Cross-functional collaboration:</span> Working closely with engineering and business stakeholders ensured our solutions were feasible and impactful.</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2, ease: "easeOut" }}>
              <Card className="hover:shadow-lg transition-shadow duration-300 max-w-sm mx-auto">
                <CardContent className="p-3">
                  <h4 className="font-semibold mb-4" style={{ color: '#1c1c1c' }}>What I'd Do Differently</h4>
                  <ul className="space-y-4 text-gray-700">
                    <li><span className="font-bold text-[#e53935]">• Earlier accessibility audits:</span> Would conduct comprehensive accessibility testing during wireframe stage, not just final designs.</li>
                    <li><span className="font-bold text-[#e53935]">• Broader user diversity:</span> Include mechanics with varying technical comfort levels and physical abilities from project start.</li>
                    <li><span className="font-bold text-[#e53935]">• Deeper competitive analysis:</span> Spend more time analyzing adjacent industries (field service, logistics) for innovative interaction patterns.</li>
                    <li><span className="font-bold text-[#e53935]">• Performance-first approach:</span> Factor in loading times, offline functionality, and device limitations earlier in the design process.</li>
                    <li><span className="font-bold text-[#e53935]">• More comprehensive documentation:</span> Create more detailed design system documentation for smoother developer handoff.</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Why This Work Matters */}
          <h2 className="text-2xl font-bold mb-4 mt-12" style={{ color: '#e53935' }}>Why This Work Matters</h2>
          <div className="bg-red-50 p-6 rounded-lg">
                            <h4 className="font-semibold mb-3" style={{ color: '#1c1c1c' }}>Looking Forward</h4>
            <p className="mb-4" style={{ color: '#1c1c1c' }}>
              This project reinforced my belief in user-centered design and the transformative power of thoughtful research. The measurable business outcomes validate that investing in proper UX process doesn't just create prettier interfaces—it drives real business value and improves people's working lives.
            </p>
            <p style={{ color: '#1c1c1c' }}>
              The success of Autoflow has opened conversations about expanding the platform to serve other service industries, demonstrating how good design can scale beyond its original context when built on solid user research foundations.
            </p>
          </div>

          {/* MODERN, UNIFIED CTA BLOCK - FULL REDESIGN, UNCONTAINED */}
          <section className="w-full flex flex-col items-center justify-center pt-32 pb-1 px-2 bg-transparent">
            <div className="w-full flex flex-col items-center">
              <div className="w-full flex flex-col items-center mb-8">
                <div className="w-24 h-2 mb-6 rounded-full bg-gradient-to-r from-[#e53935] via-[#ffb3b3] to-[#e53935] opacity-80" />
                <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-3 tracking-tight" style={{ color: '#1c1c1c', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                  Let's create something better together.
                </h2>
                <p className="text-xl text-gray-600 text-center mb-8 max-w-2xl">Ready to collaborate or want to see more?</p>
              </div>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full max-w-2xl">
                <a
                  href="https://jonouyang.net/contact"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg scale-105 hover:scale-110 focus:scale-110 max-w-xs md:max-w-sm w-auto mx-auto whitespace-nowrap"
                  style={{ boxShadow: '0 4px 24px 0 rgba(229,57,53,0.10)' }}
                >
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Contact Me
                </a>
                <a
                  href="/zing-delivery"
                  className="border-2 border-red-600 text-red-600 hover:bg-red-50 font-bold py-4 px-8 rounded-2xl text-base md:text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:scale-105 focus:scale-105 max-w-xs md:max-w-sm w-auto mx-auto whitespace-nowrap"
                >
                  <span className="inline-block" style={{ fontSize: '1.3em', marginRight: 4 }}>&#8250;</span> Next Project: Zing
                </a>
                <a
                  href="https://www.figma.com/file/34vP7VrZoCaIWwM96A5LT8/Working-File---Depracated"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:scale-105 focus:scale-105 max-w-xs md:max-w-sm w-auto mx-auto whitespace-nowrap"
                >
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  Explore Figma File
                </a>
              </div>
            </div>
          </section>

        </AnimatedSection>
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
