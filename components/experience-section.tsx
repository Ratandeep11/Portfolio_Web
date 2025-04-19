"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Briefcase,
  Calendar,
  ArrowUpRight,
  MapPin,
  ChevronRight,
} from "lucide-react";

// Work experience data
const experiences = [
  {
    title: "Member of Technical Staff",
    company: "Coriolis Technologies",
    location: "Pune, India",
    period: "2023 - Present",
    description: [
      "Developing and maintaining web applications using React.js and Django",
      "Implementing infrastructure as code using Terraform and AWS services",
      "Building scalable microservices architecture for enterprise applications",
      "Creating comprehensive test suites with Cypress for quality assurance",
      "Collaborating with cross-functional teams to deliver high-quality software solutions",
    ],
    skills: [
      "React.js",
      "Django",
      "AWS",
      "Terraform",
      "Python",
      "Microservices",
      "Cypress",
    ],
    link: "https://www.coriolis.co.in/",
  },
];

export function ExperienceSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="experience"
      className="py-16 md:py-24 bg-muted/10"
      ref={sectionRef}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4 inline-block">
              Work History
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
          >
            My Experience
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-primary mx-auto mb-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-[42rem] mx-auto text-muted-foreground"
          >
            My professional journey and the companies I've had the pleasure to
            work with.
          </motion.p>
        </div>

        {/* Timeline with experiences */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-muted hidden md:block"></div>

          <div className="space-y-12 relative">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                className="relative"
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
                  {/* Left side - Timeline info */}
                  <div className="relative">
                    {/* Timeline dot */}
                    <div className="hidden md:flex absolute left-7 -translate-x-1/2 w-6 h-6 rounded-full bg-primary/20 items-center justify-center border-4 border-background">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>

                    <div className="pl-0 md:pl-12">
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <h3 className="text-xl font-bold">
                          {experience.title}
                        </h3>
                      </div>
                      <div className="mb-2">
                        <div className="text-lg font-medium text-primary">
                          {experience.company}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{experience.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{experience.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Job details */}
                  <div className="bg-card/40 backdrop-blur-sm rounded-xl p-6 border border-primary/10 shadow-sm hover:border-primary/20 transition-colors">
                    <ul className="space-y-2 mb-4">
                      {experience.description.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {experience.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {experience.link !== "#" && (
                      <a
                        href={experience.link}
                        className="inline-flex items-center text-sm text-primary hover:underline mt-4"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>View Company</span>
                        <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
