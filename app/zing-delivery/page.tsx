"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowLeft } from "lucide-react";
import { X } from "lucide-react";
import { useState } from "react";
import { SectionNav, Section } from "../../components/ui/section-nav";

// Lightbox Component (copied from Autoflow)
function Lightbox({ src, alt, isOpen, onClose }: { src: string; alt: string; isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl max-h-full"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black bg-opacity-70 rounded-full p-2 text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white z-10 shadow-lg"
          style={{ lineHeight: 0 }}
          aria-label="Close image preview"
        >
          <X size={32} />
        </button>
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={600}
          height={600}
          className="max-w-full max-h-[80vh] object-contain rounded-lg"
        />
      </div>
    </div>
  );
}

// Clickable Image Component (verbatim from Autoflow)
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

// Animated Section Component
function AnimatedSection({
  children,
  className = "",
  delay = 0,
  id,
}: { children: React.ReactNode; className?: string; delay?: number; id?: string }) {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "-100px" });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: delay,
            ease: [0.25, 0.25, 0.25, 0.75],
          },
        },
      }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
}

// Section Container for consistent spacing and alignment
function SectionContainer({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <section className={`w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-20 ${className}`} style={{ marginBottom: 80, marginTop: 80, ...style }}>
      {children}
    </section>
  );
}

const SECTIONS: Section[] = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "research", label: "Research" },
  { id: "strategy", label: "Strategy" },
  { id: "testing", label: "Testing" },
  { id: "outcomes", label: "Outcomes" },
]

export default function ZingCaseStudy() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxAlt, setLightboxAlt] = useState("");

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
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', color: '#1c1c1c' }}>
      {/* Minimalist Back Arrow (matches Autoflow) */}
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

      <main>
        {/* HERO SECTION - REFINED SPACING */}
        <SectionContainer className="pt-6 pb-0" style={{ marginBottom: 0, marginTop: 32 }}>
          <AnimatedSection id="overview">
            {/* Hero Image - positioned on left like Autoflow */}
            <div className="flex justify-start w-full mb-6">
              <ClickableImage
                src="/zing_hero_final.jpeg"
                alt="Zing app hero"
                width={800}
                height={600}
                className="rounded-xl shadow-lg w-full"
                onClick={() => openLightbox("/zing_hero_final.jpeg", "Zing app hero")}
              />
            </div>

            {/* Title and Description - below image like Autoflow */}
            <div className="max-w-4xl mb-4">
              <h1 className="text-3xl font-bold mb-3 text-left" style={{ color: '#1c1c1c' }}>
                Zing: Modernizing Food Delivery
              </h1>
              <div className="text-left mb-4 text-base" style={{ lineHeight: 1.6 }}>
                Led the end-to-end redesign of a food delivery platform, driving a 25% increase in order completion efficiency and elevating customer experience through strategic UX and product decisions.
              </div>
            </div>

            {/* Project Info Row - 4 columns like Autoflow */}
            <div className="flex flex-row justify-between items-start gap-2 md:gap-6 mb-8" style={{ maxWidth: '1400px' }}>
              {/* My Role */}
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 md:gap-3 mb-1">
                  <svg width="16" height="16" className="md:w-5 md:h-5" fill="none" viewBox="0 0 24 24">
                    <g><circle cx="8" cy="8" r="3" stroke="#2563eb" strokeWidth="2"/><circle cx="16" cy="8" r="3" stroke="#2563eb" strokeWidth="2"/><path d="M2 20c0-2.21 3.134-4 7-4s7 1.79 7 4" stroke="#2563eb" strokeWidth="2"/><path d="M16 14c3.866 0 7 1.79 7 4" stroke="#2563eb" strokeWidth="2"/></g>
                  </svg>
                  <span className="font-bold text-sm md:text-base">My Role</span>
                </div>
                <div className="text-gray-500 text-xs md:text-sm">Product Designer</div>
              </div>

              {/* Team */}
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 md:gap-3 mb-1">
                  <svg width="16" height="16" className="md:w-5 md:h-5" fill="none" viewBox="0 0 24 24">
                    <g><circle cx="8" cy="8" r="3" stroke="#22c55e" strokeWidth="2"/><circle cx="16" cy="8" r="3" stroke="#22c55e" strokeWidth="2"/><path d="M2 20c0-2.21 3.134-4 7-4s7 1.79 7 4" stroke="#22c55e" strokeWidth="2"/><path d="M16 14c3.866 0 7 1.79 7 4" stroke="#22c55e" strokeWidth="2"/></g>
                  </svg>
                  <span className="font-bold text-sm md:text-base">Team</span>
                </div>
                <div className="text-gray-500 text-xs md:text-sm">2 PD • 1 PM • 2 FE</div>
              </div>

              {/* Timeline */}
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 md:gap-3 mb-1">
                  <svg width="16" height="16" className="md:w-5 md:h-5" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="#f97316" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="font-bold text-sm md:text-base">Timeline</span>
                </div>
                <div className="text-gray-500 text-xs md:text-sm">4 months</div>
              </div>

              {/* Platform */}
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 md:gap-3 mb-1">
                  <svg width="16" height="16" className="md:w-5 md:h-5" fill="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="#a21caf" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="#a21caf" strokeWidth="2"/>
                  </svg>
                  <span className="font-bold text-sm md:text-base">Platform</span>
                </div>
                <div className="text-gray-500 text-xs md:text-sm">Mobile App</div>
              </div>
            </div>

            {/* IMPACT CALLOUT - refined spacing */}
            <div className="w-full max-w-4xl mt-8 mb-8">
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                <span className="font-bold" style={{ color: '#15803d' }}>Impact:</span> Achieved 25% faster order completion, 32% increase in repeat orders, and 4.8/5 user satisfaction after launch.
              </div>
            </div>
          </AnimatedSection>
        </SectionContainer>

        {/* PROBLEM SECTION */}
        <SectionContainer style={{ marginTop: 40, marginBottom: 30 }}>
          <AnimatedSection id="challenge">
            <h2 className="text-2xl font-bold mb-3 text-left">Business Problem: Cluttered, Frustrating Delivery Apps</h2>
            <p className="text-gray-700 text-base max-w-2xl mx-auto text-left mb-0" style={{ lineHeight: 1.5 }}>
              Food delivery apps are often cluttered, slow, and lack transparency. Users struggle with confusing interfaces, unreliable order tracking, and limited personalization. <span className="font-bold" style={{ color: '#e53935' }}>Zing set out to solve these pain points with a user-centered, research-driven approach.</span>
            </p>
          </AnimatedSection>
        </SectionContainer>

        {/* GOALS SECTION */}
        <SectionContainer style={{ marginTop: 30, marginBottom: 30 }}>
          <AnimatedSection>
            <h2 className="text-2xl font-bold mb-4 text-left">Project Objectives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border rounded-lg p-6">
                <h4 className="font-semibold text-xl mb-2">Primary Goals</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 text-base">
                  <li>Improve order efficiency by 25%</li>
                  <li>Increase repeat orders by 30%</li>
                  <li>Enhance mobile experience</li>
                  <li>Streamline group ordering</li>
                </ul>
              </div>
              <div className="bg-gray-50 border rounded-lg p-6">
                <h4 className="font-semibold text-xl mb-2">Success Metrics</h4>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 text-base">
                  <li>User satisfaction score</li>
                  <li>Order completion time</li>
                  <li>Repeat order rate</li>
                  <li>Support requests for order tracking</li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </SectionContainer>

        {/* PERSONAS SECTION */}
        <SectionContainer style={{ marginTop: 30, marginBottom: 30 }}>
          <AnimatedSection>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 text-left tracking-tight">User Personas</h2>
            <div className="flex flex-col gap-12 items-stretch justify-center">
              {/* Marcus Reed */}
              <div className="flex flex-col md:flex-row bg-[#fafbfc] rounded-2xl shadow-xl border border-gray-100 p-8 gap-8 items-stretch">
                {/* Left: Headshot and basic info */}
                <div className="flex flex-col items-center md:items-start md:w-1/3 min-w-[200px]">
                  <div className="w-[120px] h-[120px] mb-4 flex items-center justify-center">
                    <ClickableImage
                      src="/persona-marcus.jpg"
                      alt="Marcus Reed"
                      width={120}
                      height={120}
                      className="rounded-full object-cover w-full h-full border-4 border-white shadow"
                      onClick={() => openLightbox("/persona-marcus.jpg", "Marcus Reed")}
                    />
                  </div>
                  <div className="h-2 w-16 bg-[#e53935] rounded-full mb-4"></div>
                  <div className="text-xl font-bold text-gray-900 mb-1">Marcus Reed</div>
                  <div className="text-base font-semibold text-[#e53935] mb-1">Busy Professional</div>
                  <div className="text-sm text-gray-600 mb-2">Age 34 · San Francisco, CA</div>
                </div>
                {/* Right: Quote, day, goals, pains, etc. */}
                <div className="flex-1 flex flex-col gap-4">
                  <div className="italic text-base text-gray-700 border-l-4 border-[#e53935]/30 pl-4 mb-2">"I need lunch to be fast, reliable, and never interrupt my workflow."</div>
                  <div className="bg-white rounded-xl p-5 shadow-sm mb-2">
                    <div className="font-bold mb-1 text-base">A Day in Marcus's Life</div>
                    <div className="text-gray-700 text-sm">Marcus juggles back-to-back meetings and project deadlines. He orders lunch from his phone while reviewing reports, expecting it to arrive exactly on time. If the app is slow or unclear, he'll switch to a competitor. He values apps that let him reorder favorites in one tap and track delivery in real time, so he can focus on work, not logistics.</div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <div className="font-bold mb-1">Goals</div>
                      <ul className="text-gray-800 text-sm list-disc pl-5 mb-2">
                        <li>Fast, predictable delivery</li>
                        <li>Effortless reordering</li>
                        <li>Healthy options</li>
                        <li>Real-time order tracking</li>
                      </ul>
                      <div className="font-bold inline">Personality:</div> <span className="text-gray-700">Analytical, time-conscious, loyal to brands that deliver.</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold mb-1">Pain Points</div>
                      <ul className="text-gray-800 text-sm list-disc pl-5 mb-2">
                        <li>Delays & missing items</li>
                        <li>Confusing app flows</li>
                        <li>Lack of transparency</li>
                        <li>Noisy notifications</li>
                      </ul>
                      <div className="font-bold inline">Tech Habits:</div> <span className="text-gray-700">Uses mobile for everything, automates orders, prefers chat support.</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Emily Carter */}
              <div className="flex flex-col md:flex-row bg-[#fafbfc] rounded-2xl shadow-xl border border-gray-100 p-8 gap-8 items-stretch">
                <div className="flex flex-col items-center md:items-start md:w-1/3 min-w-[200px]">
                  <div className="w-[120px] h-[120px] mb-4 flex items-center justify-center">
                    <ClickableImage
                      src="/persona-emily.jpg"
                      alt="Emily Carter"
                      width={120}
                      height={120}
                      className="rounded-full object-cover w-full h-full border-4 border-white shadow"
                      onClick={() => openLightbox("/persona-emily.jpg", "Emily Carter")}
                    />
                  </div>
                  <div className="h-2 w-16 bg-[#e53935] rounded-full mb-4"></div>
                  <div className="text-xl font-bold text-gray-900 mb-1">Emily Carter</div>
                  <div className="text-base font-semibold text-[#e53935] mb-1">Young Family Parent</div>
                  <div className="text-sm text-gray-600 mb-2">Age 33 · Seattle, WA</div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <div className="italic text-base text-gray-700 border-l-4 border-[#e53935]/30 pl-4 mb-2">"If dinner is late, the whole evening falls apart. I need to trust the app."</div>
                  <div className="bg-white rounded-xl p-5 shadow-sm mb-2">
                    <div className="font-bold mb-1">A Day in Emily's Life</div>
                    <div className="text-gray-700 text-sm">Emily balances work, school pickups, and meal planning. She schedules dinner deliveries and relies on family profiles. If the app fails or food is late, it disrupts her evening. She values reliability and the ability to plan ahead for her family's needs.</div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <div className="font-bold mb-1">Goals</div>
                      <ul className="text-gray-800 text-sm list-disc pl-5 mb-2">
                        <li>Family meal planning</li>
                        <li>Kid-friendly options</li>
                        <li>Scheduled deliveries</li>
                        <li>Easy group ordering</li>
                      </ul>
                      <div className="font-bold inline">Personality:</div> <span className="text-gray-700">Caring, organized, values trust and simplicity.</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold mb-1">Pain Points</div>
                      <ul className="text-gray-800 text-sm list-disc pl-5 mb-2">
                        <li>Unreliable delivery times</li>
                        <li>Limited healthy choices</li>
                        <li>Difficult reordering</li>
                        <li>App crashes under load</li>
                      </ul>
                      <div className="font-bold inline">Tech Habits:</div> <span className="text-gray-700">Schedules orders, uses family profiles, prefers SMS updates.</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Jasmine Lee */}
              <div className="flex flex-col md:flex-row bg-[#fafbfc] rounded-2xl shadow-xl border border-gray-100 p-8 gap-8 items-stretch">
                <div className="flex flex-col items-center md:items-start md:w-1/3 min-w-[200px]">
                  <div className="w-[120px] h-[120px] mb-4 flex items-center justify-center">
                    <ClickableImage
                      src="/persona-jasmine.jpg"
                      alt="Jasmine Lee"
                      width={120}
                      height={120}
                      className="rounded-full object-cover w-full h-full border-4 border-white shadow"
                      onClick={() => openLightbox("/persona-jasmine.jpg", "Jasmine Lee")}
                    />
                  </div>
                  <div className="h-2 w-16 bg-[#e53935] rounded-full mb-4"></div>
                  <div className="text-xl font-bold text-gray-900 mb-1">Jasmine Lee</div>
                  <div className="text-base font-semibold text-[#e53935] mb-1">College Student</div>
                  <div className="text-sm text-gray-600 mb-2">Age 24 · Los Angeles, CA</div>
                </div>
                <div className="flex-1 flex flex-col gap-4">
                  <div className="italic text-base text-gray-700 border-l-4 border-[#e53935]/30 pl-4 mb-2">"I want to eat well, save money, and never miss a group order with friends."</div>
                  <div className="bg-white rounded-xl p-5 shadow-sm mb-2">
                    <div className="font-bold mb-1">A Day in Jasmine's Life</div>
                    <div className="text-gray-700 text-sm">Jasmine's schedule is packed with classes, work, and social events. She uses student discounts and group ordering, prefers push notifications for deals, and shares orders with friends. She values speed, savings, and the ability to coordinate with friends easily.</div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <div className="font-bold mb-1">Goals</div>
                      <ul className="text-gray-800 text-sm list-disc pl-5 mb-2">
                        <li>Save money with discounts</li>
                        <li>Fast group ordering</li>
                        <li>Discover new restaurants</li>
                        <li>Share orders with friends</li>
                      </ul>
                      <div className="font-bold inline">Personality:</div> <span className="text-gray-700">Social, tech-savvy, vocal about experiences.</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold mb-1">Pain Points</div>
                      <ul className="text-gray-800 text-sm list-disc pl-5 mb-2">
                        <li>Missed group orders</li>
                        <li>App bugs or crashes</li>
                        <li>Lack of student deals</li>
                        <li>Slow notifications</li>
                      </ul>
                      <div className="font-bold inline">Tech Habits:</div> <span className="text-gray-700">Uses push notifications, shares links, posts reviews.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Lightbox Modal for Persona Images */}
            <Lightbox src={lightboxSrc} alt={lightboxAlt} isOpen={lightboxOpen} onClose={closeLightbox} />
          </AnimatedSection>
        </SectionContainer>

        {/* INSIGHTS SECTION */}
        <SectionContainer style={{ marginTop: 60, marginBottom: 60 }}>
          <AnimatedSection id="research">
            <h2 className="text-2xl font-bold mb-12 mt-16 text-left">User & Market Insights</h2>
            <div className="max-w-3xl mx-auto">
              <blockquote className="italic border-l-4 border-red-500 pl-4 mb-2 text-base text-gray-700 leading-relaxed">"I just want to know exactly when my food will arrive—and not have to dig through menus to reorder my favorites."<br /><span className="text-xs text-gray-500 block mt-1">— Marcus, Professional</span></blockquote>
              <blockquote className="italic border-l-4 border-red-500 pl-4 mb-2 text-base text-gray-700 leading-relaxed">"I need to plan meals for my kids and make sure delivery is reliable. If it's late, it throws off our whole evening."<br /><span className="text-xs text-gray-500 block mt-1">— Emily, Parent</span></blockquote>
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded mb-4">
                <span className="font-bold" style={{ color: '#e53935' }}>Key Finding:</span> 87% of users cited real-time tracking and clear communication as their top priorities.
              </div>
            </div>
          </AnimatedSection>
        </SectionContainer>

        {/* USER JOURNEY & FLOWS SECTION */}
        <SectionContainer className="max-w-4xl">
          <AnimatedSection>
            <h2 className="text-xl font-bold mb-8 text-left">User Journey & Core Flows</h2>
            <div className="max-w-4xl mx-auto">
              {/* Large User Journey Image at the top */}
              <div className="flex justify-center mb-8">
                <ClickableImage
                  src="/user_journey.jpeg"
                  alt="User Journey Map for Zing"
                  width={800}
                  height={533}
                  className="rounded-xl shadow border border-gray-200 w-full max-w-3xl h-auto object-contain"
                  onClick={() => openLightbox("/user_journey.jpeg", "User Journey Map for Zing")}
                />
              </div>
              
              {/* Text content below the image */}
              <div className="max-w-3xl mx-auto">
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                  <li><span className="font-bold text-[#e53935]">Discovery:</span> Personalized onboarding, curated restaurant lists, and targeted promotions.</li>
                  <li><span className="font-bold text-[#e53935]">Ordering:</span> Streamlined menu navigation, one-tap reorder, and group ordering for families and students.</li>
                  <li><span className="font-bold text-[#e53935]">Tracking:</span> Real-time order status, proactive notifications, and transparent ETAs.</li>
                  <li><span className="font-bold text-[#e53935]">Delivery:</span> Contactless handoff, instant feedback, and loyalty rewards.</li>
                </ul>
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded max-w-2xl">
                  <span className="font-bold" style={{ color: '#e53935' }}>Design Decision:</span> Prioritized flows that reduce friction and support real-world user needs.
                </div>
              </div>
              
              {/* Lofi Prototypes Section - Larger square previews */}
              <h3 className="text-lg font-bold mt-12 mb-4 text-left">Low-Fidelity Prototypes</h3>
              <p className="text-gray-700 mb-6 max-w-2xl text-sm">Before moving into high-fidelity design, I explored core flows and layouts through quick, low-fidelity sketches. These wireframes allowed rapid iteration and feedback, focusing on structure and usability without the distraction of color or branding.</p>
              <div className="overflow-x-auto pb-4">
                <div className="flex md:grid md:grid-cols-3 gap-6 min-w-[480px]">
                  {/* Wireframe 1 */}
                  <div className="flex flex-col items-center min-w-[200px] max-w-full">
                    <div className="w-[200px] h-[200px] bg-white p-2 rounded-xl shadow border border-gray-200 flex justify-center items-center relative group overflow-hidden">
                      <ClickableImage
                        src="/lofi_1.jpeg"
                        alt="Low-fidelity wireframe 1: Quick Reorder flow"
                        width={200}
                        height={200}
                        className="w-full h-full object-contain rounded-lg"
                        onClick={() => openLightbox("/lofi_1.jpeg", "Low-fidelity wireframe 1: Quick Reorder flow")}
                      />
                    </div>
                    <div className="text-center mt-3">
                      <div className="font-semibold text-sm text-gray-900">Quick Reorder Flow</div>
                      <div className="text-xs text-gray-600 mt-1">Streamlined reordering for frequent users</div>
                    </div>
                  </div>
                  {/* Wireframe 2 */}
                  <div className="flex flex-col items-center min-w-[200px] max-w-full">
                    <div className="w-[200px] h-[200px] bg-white p-2 rounded-xl shadow border border-gray-200 flex justify-center items-center relative group overflow-hidden">
                      <ClickableImage
                        src="/lofi_2.jpeg"
                        alt="Low-fidelity wireframe 2: Group Ordering"
                        width={200}
                        height={200}
                        className="w-full h-full object-contain rounded-lg"
                        onClick={() => openLightbox("/lofi_2.jpeg", "Low-fidelity wireframe 2: Group Ordering")}
                      />
                    </div>
                    <div className="text-center mt-3">
                      <div className="font-semibold text-sm text-gray-900">Group Ordering</div>
                      <div className="text-xs text-gray-600 mt-1">Collaborative ordering for families & friends</div>
                    </div>
                  </div>
                  {/* Wireframe 3 */}
                  <div className="flex flex-col items-center min-w-[200px] max-w-full">
                    <div className="w-[200px] h-[200px] bg-white p-2 rounded-xl shadow border border-gray-200 flex justify-center items-center relative group overflow-hidden">
                      <ClickableImage
                        src="/lofi_3.jpeg"
                        alt="Low-fidelity wireframe 3: Real-time Tracking"
                        width={200}
                        height={200}
                        className="w-full h-full object-contain rounded-lg"
                        onClick={() => openLightbox("/lofi_3.jpeg", "Low-fidelity wireframe 3: Real-time Tracking")}
                      />
                    </div>
                    <div className="text-center mt-3">
                      <div className="font-semibold text-sm text-gray-900">Real-time Tracking</div>
                      <div className="text-xs text-gray-600 mt-1">Transparent order status updates</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </SectionContainer>

        {/* MID-FI SECTION */}
        <SectionContainer className="max-w-4xl">
          <AnimatedSection>
            <h2 className="text-xl font-bold mb-8 text-left w-full">Mid-Fidelity Prototype</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex-shrink-0 bg-white p-4 rounded-xl shadow border border-gray-200 mb-2 w-[250px] h-[250px] flex justify-center items-center relative group overflow-hidden">
                <div className="w-[250px] h-[250px] relative">
                  <ClickableImage
                    src="/midfi.jpeg"
                    alt="Zing Mid-Fidelity Prototype Home Screen"
                    width={250}
                    height={250}
                    className="rounded-lg object-cover w-full h-full absolute top-0 left-0"
                    onClick={() => openLightbox("/midfi.jpeg", "Zing Mid-Fidelity Prototype Home Screen")}
                  />
                  {/* Overlay magnifier icon on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg pointer-events-none">
                    <svg className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#fff"><circle cx="11" cy="11" r="7" strokeWidth="2"/><path strokeWidth="2" strokeLinecap="round" d="M21 21l-4.35-4.35"/></svg>
                  </div>
                </div>
              </div>
              <div className="text-base text-gray-700 text-left max-w-lg mb-4 md:mb-0">
                <p className="mb-3 font-semibold text-lg">Why Mid-Fidelity?</p>
                <p className="mb-3">This mid-fidelity prototype helped validate the core layout and interaction flow before high-fidelity visuals. It focused on navigation, information hierarchy, and key user tasks, allowing for rapid iteration and feedback before investing in detailed design.</p>
                <p className="mb-3">The prototype tested critical user flows including restaurant discovery, menu browsing, order customization, and real-time tracking. User feedback at this stage revealed important insights about navigation patterns and information architecture that shaped the final design.</p>
                <p className="text-sm text-gray-500">Click the preview to expand and view the full vertical prototype with all screens and interactions.</p>
              </div>
            </div>
          </AnimatedSection>
        </SectionContainer>

        {/* DESIGN SYSTEM SECTION */}
        <SectionContainer className="max-w-4xl">
          <AnimatedSection>
            <h2 className="text-xl font-bold mb-8 text-left w-full">Visual Design System</h2>
            <div className="flex flex-col items-center justify-center mb-8">
              <ClickableImage
                src="/design_system.jpeg"
                alt="Zing Visual Design System"
                width={700}
                height={350}
                className="rounded-xl shadow border border-gray-200 w-full max-w-2xl h-auto object-contain mx-auto"
                onClick={() => openLightbox("/design_system.jpeg", "Zing Visual Design System")}
              />
              <div className="text-xs text-gray-500 text-left mt-2 max-w-[700px]">Zing Visual Design System. <span className="italic">Design Decision:</span> Built for clarity, speed, and trust. The system is the backbone of Zing's UI consistency and brand identity.</div>
            </div>
            <h3 className="text-lg font-bold mb-2 mt-8">Design System Philosophy</h3>
            <p className="text-gray-700 mb-4 max-w-3xl mx-auto">The Zing design system was created to ensure every user touchpoint feels clear, modern, and trustworthy. Inspired by Swiss design, it emphasizes grid, alignment, and visual clarity. Every element—from color to spacing—reinforces the brand's promise of reliability and ease.</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 text-base max-w-2xl mx-auto mb-6">
              <li><span className="font-bold" style={{ color: '#e53935' }}>Color:</span> Zing's palette is led by a fresh green (#95BE6A) for positivity and action, with bold red (#ff0000) for highlights, and a foundation of white, black, and soft gray for clarity and contrast.</li>
              <li><span className="font-bold" style={{ color: '#e53935' }}>Typography:</span> Helvetica Neue is used throughout for its neutrality and legibility, with clear hierarchy in headers, subheaders, and body text.</li>
              <li><span className="font-bold" style={{ color: '#e53935' }}>Spacing & Layout:</span> Generous padding, consistent margins, and a modular grid keep the interface open and easy to scan.</li>
              <li><span className="font-bold" style={{ color: '#e53935' }}>Components:</span> Buttons, cards, and forms are designed for accessibility and touch, with subtle shadows and rounded corners for a friendly, modern feel.</li>
            </ul>
            <h4 className="text-lg font-semibold mb-2 mt-6">How the Design System Supports Zing</h4>
            <p className="text-gray-700 max-w-3xl mx-auto mb-2">The system enables rapid prototyping and consistent handoff to engineering, while ensuring every new feature or page feels cohesive. It's flexible enough to support future growth, new features, and evolving user needs—while always keeping clarity and usability at the core.</p>
            <p className="text-gray-700 max-w-3xl mx-auto">Ultimately, the design system is what makes Zing's experience feel seamless, delightful, and uniquely its own.</p>
          </AnimatedSection>
        </SectionContainer>

        {/* FINAL DESIGN SHOWCASE SECTION */}
        <SectionContainer className="max-w-5xl">
          <AnimatedSection id="strategy">
            <h2 className="text-xl font-bold mb-6 text-left">Final Design Showcase</h2>
            <p className="text-gray-700 mb-8 text-sm max-w-3xl">Here's how we translated user needs into real UX flows. The final design prioritizes clarity, speed, and trust—creating an experience that feels both familiar and delightfully new.</p>
            
            {/* Device Frame Mockups */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {/* Home Screen */}
              <div className="flex flex-col items-center">
                <div className="w-72 h-[600px] bg-gray-900 rounded-3xl p-2 shadow-lg">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                    <ClickableImage
                      src="/home.jpeg"
                      alt="Zing Home Screen"
                      width={240}
                      height={480}
                      className="w-full h-full object-contain"
                      onClick={() => openLightbox("/home.jpeg", "Zing Home Screen")}
                    />
                  </div>
                </div>
                <h4 className="font-semibold mt-4 mb-2 text-sm">Home Screen</h4>
                <p className="text-xs text-gray-600 text-center">Category browsing with Zing+ integration and personalized offers for quick decision-making</p>
              </div>

              {/* Restaurant Detail */}
              <div className="flex flex-col items-center">
                <div className="w-72 h-[600px] bg-gray-900 rounded-3xl p-2 shadow-lg">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                    <ClickableImage
                      src="/detail_page.jpeg"
                      alt="Restaurant Detail Page"
                      width={240}
                      height={480}
                      className="w-full h-full object-contain"
                      onClick={() => openLightbox("/detail_page.jpeg", "Restaurant Detail Page")}
                    />
                  </div>
                </div>
                <h4 className="font-semibold mt-4 mb-2 text-sm">Restaurant Detail Page</h4>
                <p className="text-xs text-gray-600 text-center">Chick-fil-A showcase with delivery time, ratings, and Zing+ upsell banners</p>
              </div>

              {/* Orders History */}
              <div className="flex flex-col items-center">
                <div className="w-72 h-[600px] bg-gray-900 rounded-3xl p-2 shadow-lg">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                    <ClickableImage
                      src="/orders.png"
                      alt="Orders History Page"
                      width={240}
                      height={480}
                      className="w-full h-full object-contain"
                      onClick={() => openLightbox("/orders.png", "Orders History Page")}
                    />
                  </div>
                </div>
                <h4 className="font-semibold mt-4 mb-2 text-sm">Orders History Page</h4>
                <p className="text-xs text-gray-600 text-center">Clean itemized breakdown with vendor branding and receipt access</p>
              </div>
            </div>

            {/* Key Design Decisions */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-6 text-left">Key Design Decisions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold mb-2 text-base" style={{ color: '#e53935' }}>Category-Driven Discovery</h4>
                  <p className="text-base text-gray-700">Home screen prioritizes category browsing over search, enabling users to quickly explore options and discover new restaurants.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold mb-2 text-base" style={{ color: '#1c1c1c' }}>Branded Restaurant Experience</h4>
                  <p className="text-base text-gray-700">Restaurant detail pages showcase authentic branding while maintaining Zing's design system for consistency and trust.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold mb-2 text-base" style={{ color: '#e53935' }}>Zing+ Integration</h4>
                  <p className="text-base text-gray-700">Premium features seamlessly integrated throughout the experience, with clear value propositions and non-intrusive upsell opportunities.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold mb-2 text-base" style={{ color: '#1c1c1c' }}>Order History Clarity</h4>
                  <p className="text-base text-gray-700">Clean, itemized order history with vendor branding and detailed receipts for easy reference and reordering.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </SectionContainer>

        {/* INTERACTIVE PROTOTYPE SECTION */}
        <SectionContainer className="max-w-3xl">
          <AnimatedSection id="testing">
            <h2 className="text-xl font-bold mb-6 text-left w-full">Interactive Prototype</h2>
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="w-full max-w-2xl rounded-2xl shadow-lg overflow-hidden mb-4 bg-gray-100 flex items-center justify-center mx-auto" style={{ minHeight: '650px' }}>
                <iframe
                  src="https://www.figma.com/proto/0cciebjkt7KvyUBevWYQDT/Food-App-Project?node-id=11-840&starting-point-node-id=11%3A840&scaling=scale-down&embed_host=share"
                  allowFullScreen
                  className="w-full h-[650px] border-0 rounded-2xl"
                  style={{ background: '#fff' }}
                  title="Zing Interactive Prototype"
                  sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups allow-popups-to-escape-sandbox"
                />
              </div>
              <div className="text-xs text-gray-500 text-left max-w-[600px]">Try navigating through the final interactive prototype here. If you can't see the prototype, <a href="https://www.figma.com/proto/0cciebjkt7KvyUBevWYQDT/Food-App-Project?node-id=11-840&starting-point-node-id=11%3A840&scaling=scale-down" target="_blank" rel="noopener noreferrer" className="underline text-[#e53935]">open it in a new tab</a>.</div>
            </div>
          </AnimatedSection>
        </SectionContainer>

        {/* OUTCOMES & IMPACT SECTION - REDESIGNED */}
        <SectionContainer className="max-w-5xl">
          <AnimatedSection id="outcomes">
            <h2 className="text-xl font-bold mb-16 text-left">Outcomes & Impact</h2>
            
            {/* Hero Impact Statement */}
            <div className="bg-gray-50 border-l-4 border-green-400 p-6 rounded-xl mb-12">
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold mb-3" style={{ color: '#1c1c1c' }}>The Results Speak for Themselves</h3>
                <p className="text-base text-gray-700 max-w-3xl mx-auto">Zing's redesign delivered measurable improvements across every key metric, transforming the user experience and business performance.</p>
              </div>
              
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: '#e53935' }}>-25%</div>
                  <div className="text-sm text-gray-600">Order Completion Time</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: '#e53935' }}>4.8/5</div>
                  <div className="text-sm text-gray-600">User Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: '#e53935' }}>+32%</div>
                  <div className="text-sm text-gray-600">Repeat Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: '#e53935' }}>-40%</div>
                  <div className="text-sm text-gray-600">Support Requests</div>
                </div>
              </div>
            </div>

            {/* User Testimonials */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-left">What Users Are Saying</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-red-400 hover:shadow-xl transition-shadow duration-200 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#e53935">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-700 italic mb-2 text-sm">"The new Zing app is so much easier to use. I can reorder my favorites in seconds and always know when my food will arrive."</p>
                      <div className="text-xs">
                        <span className="font-semibold text-gray-900">Marcus Reed</span>
                        <span className="text-gray-500"> • Busy Professional</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 shadow-lg border-l-4 border-green-400 hover:shadow-xl transition-shadow duration-200 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#15803d">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-700 italic mb-2 text-sm">"Group ordering has made family dinners so much simpler. The kids love picking their meals, and I love the reliability."</p>
                      <div className="text-xs">
                        <span className="font-semibold text-gray-900">Emily Carter</span>
                        <span className="text-gray-500"> • Parent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Impact */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-left">Business Transformation</h3>
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold mb-4" style={{ color: '#e53935' }}>Market Position</h4>
                    <p className="text-gray-700 mb-4">The redesign strengthened Zing's competitive position, leading to a <span className="font-bold" style={{ color: '#e53935' }}>28% increase in new user signups</span> and improved customer retention rates.</p>
                    <p className="text-gray-700">Positive app store reviews and word-of-mouth referrals increased, helping Zing stand out in a crowded market.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-4" style={{ color: '#e53935' }}>Operational Efficiency</h4>
                    <p className="text-gray-700 mb-4">Restaurants and delivery partners reported a <span className="font-bold" style={{ color: '#e53935' }}>35% reduction in order errors</span> and a <span className="font-bold" style={{ color: '#e53935' }}>20% improvement in delivery time accuracy</span>.</p>
                    <p className="text-gray-700">Customer support volume dropped significantly, freeing up resources for growth initiatives.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Learnings */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-left">Key Learnings & Reflections</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#e53935">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-base mb-1">User Research is Everything</h4>
                      <p className="text-gray-700 text-sm">Early interviews and journey mapping revealed pain points we never would have guessed. The insights from real users completely reshaped our approach to the redesign.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#e53935">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-base mb-1">Mobile-First Design is Non-Negotiable</h4>
                      <p className="text-gray-700 text-sm">The majority of Zing's users order on their phones, so every decision was made with mobile in mind. This approach paid off with significantly improved mobile engagement.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-200 cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#15803d">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-base mb-1">Iterative Prototyping Pays Off</h4>
                      <p className="text-gray-700 text-sm">Multiple rounds of user testing led to a dramatically better product. Each iteration revealed new insights that we couldn't have anticipated in the initial design phase.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Future Opportunities */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4 text-left" style={{ color: '#1c1c1c' }}>Looking Forward</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#e53935">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-bold mb-1 text-sm">Enhanced Onboarding</h4>
                  <p className="text-xs text-gray-600">A more robust onboarding flow could further reduce drop-off for new users</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#15803d">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="font-bold mb-1 text-sm">Deeper Analytics</h4>
                  <p className="text-xs text-gray-600">More granular tracking would help us understand user behavior and optimize flows faster</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#e53935">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                  <h4 className="font-bold mb-1 text-sm">Advanced Features</h4>
                  <p className="text-xs text-gray-600">AI-powered recommendations and predictive ordering could further enhance the experience</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
              <a 
                href="/" 
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
                Next Project: Autoflow
              </a>
              <a 
                href="https://www.figma.com/file/0cciebjkt7KvyUBevWYQDT/Food-App-Project" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Explore Figma File
              </a>
              <a 
                href="https://jonouyang.net/contact" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Me
              </a>
            </div>
          </AnimatedSection>
        </SectionContainer>

        {/* REFLECTION SECTION */}
        <SectionContainer className="max-w-4xl">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow p-6 flex flex-col">
                <h4 className="font-semibold text-[24px] mb-4" style={{ color: '#e53935' }}>What I Learned</h4>
                <ul className="space-y-3 text-gray-700 text-base">
                  <li><span className="font-bold">User research is everything:</span> Early interviews and journey mapping revealed pain points we never would have guessed.</li>
                  <li><span className="font-bold">Mobile-first design is non-negotiable:</span> The majority of Zing's users order on their phones, so every decision was made with mobile in mind.</li>
                  <li><span className="font-bold">Iterative prototyping pays off:</span> Multiple rounds of user testing led to a dramatically better product.</li>
                  <li><span className="font-bold">Cross-functional collaboration:</span> Working closely with engineering and business stakeholders ensured our solutions were feasible and impactful.</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow p-6 flex flex-col">
                <h4 className="font-semibold text-[24px] mb-4" style={{ color: '#e53935' }}>What I'd Do Differently</h4>
                <ul className="space-y-3 text-gray-700 text-base">
                  <li><span className="font-bold">Start usability testing even earlier:</span> Some navigation issues could have been caught in the wireframe stage.</li>
                  <li><span className="font-bold">Invest more in onboarding:</span> A more robust onboarding flow could further reduce drop-off for new users.</li>
                  <li><span className="font-bold">Deeper analytics:</span> More granular tracking would help us understand user behavior and optimize flows faster.</li>
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </SectionContainer>

        {/* FUTURE VISION (FINAL CTA) SECTION */}
        <SectionContainer className="max-w-2xl">
          <AnimatedSection>
            <div className="bg-[#ffefef] p-8 rounded-lg flex flex-col items-center justify-center text-center mb-32">
              <h4 className="font-semibold text-[24px] mb-3" style={{ color: '#1c1c1c' }}>Future Vision</h4>
              <p className="text-gray-700 mb-4">
                The Zing redesign is just the beginning. We're planning to expand group ordering features, integrate loyalty rewards, and continue iterating based on user feedback. Our goal is to make Zing the most user-friendly, reliable food delivery platform on the market.
              </p>
              <p className="text-gray-700">
                I'm excited to keep learning from our users and to push the boundaries of what's possible in food delivery UX.
              </p>
            </div>
          </AnimatedSection>
        </SectionContainer>

      </main>
    </div>
  );
} 