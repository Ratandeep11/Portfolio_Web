"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const slideIn = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const skillItemVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

// Define types for skills
type Skill = {
  name: string;
  level: number;
  icon?: string;
};

type SkillCategories = {
  [key: string]: Skill[];
};

// Added SkillBar component from skills-section.tsx
function SkillBar({
  name,
  level,
  index,
  icon,
}: {
  name: string;
  level: number;
  index: number;
  color?: string;
  icon?: string;
}) {
  const barRef = useRef(null);
  const isInView = useInView(barRef, { once: true });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={barRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card/40 backdrop-blur-sm p-6 rounded-xl border border-border/50 shadow-sm hover:shadow-lg transition-all"
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.2)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-bold text-lg flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          {name}
        </h4>
        <span className="text-sm font-medium px-3 py-1 bg-primary/10 rounded-full text-primary">
          {level}%
        </span>
      </div>
      <div className="w-full h-3 bg-card rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: 0.2,
            ease: "easeOut",
          }}
          style={{
            boxShadow: isHovered
              ? "0 0 15px 1px rgba(var(--primary), 0.5)"
              : "none",
          }}
        ></motion.div>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-[100%] blur-3xl opacity-60 -z-10"></div>

        <div className="mb-16 text-center">
          <motion.h2
            className="text-3xl font-bold tracking-tight sm:text-5xl mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            About Me
          </motion.h2>
          <motion.div
            className="h-1 w-12 bg-gradient-to-r from-primary to-secondary mx-auto"
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          ></motion.div>
        </div>

        <div className="grid gap-16 md:grid-cols-2 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideIn}
            transition={{ duration: 0.5 }}
            className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-background/80 z-10 mix-blend-overlay"></div>
            <motion.div
              className="absolute inset-0 z-20"
              whileHover={{ scale: 1.05 }}
              transition={{
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <Image
                src="/new_photo.jpg"
                alt="Ratnadeep Goyal"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -top-2 -left-2 w-20 h-20 bg-secondary/10 rounded-full blur-2xl"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold mb-6 relative inline-block">
                Full-Stack Software Developer
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                I'm a skilled software developer specializing in building
                scalable and efficient applications. With expertise in both
                frontend and backend technologies, I create seamless digital
                experiences that combine technical excellence with intuitive
                user interfaces.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                My technical stack includes React.js and Next.js for responsive
                frontends, Django and Python for robust backend services, and
                AWS with Terraform for infrastructure as code. I have extensive
                experience designing and implementing microservices architecture
                and ensuring quality through comprehensive testing with Cypress.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <motion.div
                className="p-4 rounded-xl bg-card/40 backdrop-blur-sm border border-border/50 shadow-sm"
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <h4 className="font-semibold text-primary text-lg">Name:</h4>
                <p className="text-foreground">Ratnadeep Goyal</p>
              </motion.div>
              <motion.div
                className="p-4 rounded-xl bg-card/40 backdrop-blur-sm border border-border/50 shadow-sm"
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <h4 className="font-semibold text-primary text-lg">Email:</h4>
                <p className="text-foreground">ratnadeep.goyal@gmail.com</p>
              </motion.div>
              <motion.div
                className="p-4 rounded-xl bg-card/40 backdrop-blur-sm border border-border/50 shadow-sm"
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <h4 className="font-semibold text-primary text-lg">
                  Location:
                </h4>
                <p className="text-foreground">Pune, India</p>
              </motion.div>
              <motion.div
                className="p-4 rounded-xl bg-card/40 backdrop-blur-sm border border-border/50 shadow-sm"
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <h4 className="font-semibold text-primary text-lg">
                  Availability:
                </h4>
                <p className="text-foreground">Full-time, Freelance</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
