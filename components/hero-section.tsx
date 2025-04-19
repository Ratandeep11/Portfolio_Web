"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Github,
  Linkedin,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { ThreeBackground } from "@/components/three-background";

const words = ["Building", "Crafting", "Creating", "Designing"];

export function HeroSection() {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [wordIndex, setWordIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Mouse follower spring animations
  const followerX = useSpring(mouseX, { stiffness: 500, damping: 150 });
  const followerY = useSpring(mouseY, { stiffness: 500, damping: 150 });

  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  // Replace your current viewport code with this:
  const [viewport, setViewport] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    // Only runs on client side
    setViewport({ width: window.innerWidth, height: window.innerHeight });

    // Optional: Add resize handler
    const handleResize = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Then modify your transform code
  const rotateX = useTransform(
    mouseY,
    [0, viewport?.height || 1], // Use fallback value when viewport is null
    [2, -2]
  );
  const rotateY = useTransform(
    mouseX,
    [0, viewport?.width || 1], // Use fallback value when viewport is null
    [-2, 2]
  );

  // Word cycling animation
  useEffect(() => {
    const intervalId = setInterval(() => {
      setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  // Cursor blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, []);

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const titleChars = "Software Developer".split("");

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js background */}
      <ThreeBackground />

      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        {/* Particles background */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/30"
              style={{
                width: Math.random() * 8 + 4,
                height: Math.random() * 8 + 4,
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: Math.random() * 5 + 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Modern gradient blobs */}
        <motion.div
          className="absolute top-10 left-10 w-[40vw] h-[40vh] bg-primary/5 rounded-full blur-[80px]"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-[35vw] h-[35vh] bg-primary/10 rounded-full blur-[80px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-[25vw] h-[25vh] bg-primary/5 rounded-full blur-[60px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5,
          }}
        />
      </div>

      {/* Grid patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_40%,transparent_100%)] opacity-30 -z-10"></div>

      <motion.div
        style={{ y, opacity, scale }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10 max-w-6xl"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative w-full"
        >
          {/* <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center space-x-2 rounded-full bg-muted/80 backdrop-blur-sm border border-muted/20 px-4 py-2 text-sm shadow-lg"
          >
            <span className="flex h-2.5 w-2.5">
              <span className="animate-ping absolute h-2.5 w-2.5 rounded-full bg-green-500 opacity-75"></span>
              <span className="relative rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span>Available for Work</span>
          </motion.div> */}

          <motion.div
            variants={itemVariants}
            className="mb-4 perspective-[1000px]"
          >
            <motion.div style={{ rotateX, rotateY }} className="py-2">
              <div className="overflow-hidden">
                <div className="flex justify-center mb-1">
                  {titleChars.map((char, index) => (
                    <motion.span
                      key={index}
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                      initial={{ y: 100 }}
                      animate={{ y: 0 }}
                      transition={{
                        delay: 0.05 * index,
                        duration: 0.5,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                    >
                      {char === " " ? <span>&nbsp;</span> : char}
                    </motion.span>
                  ))}
                </div>

                <div className="flex items-center justify-center text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      className="text-primary relative block"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -50, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className="inline-block">
                        <span className="inline-block">{words[wordIndex]}</span>{" "}
                        <span className="inline-block whitespace-nowrap">
                          Digital Experiences
                        </span>
                        <motion.span
                          className={`absolute -right-4 top-0 h-full w-[3px] bg-primary ${
                            cursorVisible ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </span>
                      <motion.span
                        className="absolute inset-x-0 bottom-0 h-[4px] bg-primary/30"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 1.5,
                          ease: "easeInOut",
                          delay: 0.2,
                        }}
                      />
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg md:text-xl font-light leading-relaxed px-4"
          >
            Specialized in React.js, Django, AWS, Terraform, and Python. I build
            scalable microservices and ensure quality with Cypress testing.
            {/* Let's create something exceptional together. */}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-4 mb-10"
          >
            <Button
              asChild
              size="lg"
              className="rounded-full group relative overflow-hidden font-medium shadow-md shadow-primary/20 h-12 px-6"
            >
              <Link href="#projects">
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90" />
                <span className="relative z-10 flex items-center ">
                  View My Work
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.span>
                </span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full relative overflow-hidden group font-medium border-primary/30 h-12 px-6"
            >
              <Link href="#contact">
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center">
                  Contact Me
                  <ExternalLink className="ml-2 h-4 w-4 opacity-70" />
                </span>
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-primary/20 bg-background/80 backdrop-blur-sm shadow-md h-11 w-11"
                asChild
              >
                <a
                  href="https://github.com/Ratandeep11"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-primary/20 bg-background/80 backdrop-blur-sm shadow-md h-11 w-11"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/ratandeep-goyal/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <span className="text-sm text-muted-foreground mb-2 font-light tracking-wider">
              SCROLL
            </span>
            <motion.div
              className="w-6 h-12 border-2 border-primary/20 rounded-full flex justify-center"
              animate={{
                borderColor: [
                  "rgba(var(--primary), 0.2)",
                  "rgba(var(--primary), 0.4)",
                  "rgba(var(--primary), 0.2)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "mirror",
              }}
            >
              <motion.div
                className="w-1.5 h-1.5 bg-primary/70 rounded-full"
                animate={{ y: [0, 14, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className="mt-2"
            >
              <ChevronDown className="h-4 w-4 text-primary/70" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background -z-10 pointer-events-none" />

      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-20 -z-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
      </div>
    </section>
  );
}
