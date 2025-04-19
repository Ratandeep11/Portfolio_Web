"use client";

import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce application with user authentication, product management, cart functionality, and payment processing.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    liveLink: "#",
    githubLink: "#",
    image: "/projects/ecommerce.jpg",
  },
  {
    title: "Chess Multiplayer Game",
    description:
      "A real-time multiplayer chess game with WebSocket communication, allowing players to compete online. Features include live game updates, move validation, and responsive design.",
    technologies: [
      "TypeScript",
      "React",
      "WebSockets",
      "Vite",
      "Tailwind CSS",
      "Chess.js",
    ],
    liveLink: "#",
    githubLink: "https://github.com/Ratandeep11/MultiplayerChessGame1",
    image: "/projects/task_management.jpg",
  },
  {
    title: "Swift Route - Cab Booking",
    description:
      "A comprehensive cab booking platform with user authentication, real-time booking, route tracking, and payment integration. Built with a modern tech stack focusing on responsive design.",
    technologies: ["React", "Firebase", "Express", "MongoDB", "React-Toastify"],
    liveLink: "#",
    githubLink: "https://github.com/Ratandeep11/SwiftRoute",
    image: "/projects/socialmedia.jpg",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Card className="overflow-hidden h-full transition-all duration-300 group-hover:shadow-xl border-primary/10 group-hover:border-primary/30 relative bg-card">
        {/* Card shine effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 rounded-xl blur-xl transition duration-500 group-hover:duration-200" />

        {/* Project image with overlay */}
        <div className="relative w-full aspect-video overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-background/10 opacity-60 z-10 group-hover:opacity-40 transition-opacity" />
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Floating tags that appear on hover */}
          <div className="absolute top-2 right-2 z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass px-3 py-1 rounded-full text-xs font-semibold"
            >
              Featured
            </motion.div>
          </div>
        </div>

        <CardHeader>
          <CardTitle className="text-balance group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{
                  duration: 0.3,
                  delay: index * 0.1 + techIndex * 0.1,
                }}
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors group-hover:bg-primary/10 group-hover:border-primary/30"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="rounded-full group-hover:border-primary/50"
            >
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    project.githubLink,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
                className="relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </span>
                <span className="absolute inset-0 bg-primary/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" asChild className="rounded-full">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    project.liveLink,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
                className="relative"
              >
                <span className="relative z-10 flex items-center">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </span>
              </a>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="projects" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4 inline-block">
              Portfolio
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
          >
            My Projects
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
            Here are some of my recent projects. Each one showcases different
            skills and technologies.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* "View more" button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/projects" className="group relative overflow-hidden">
              <span className="relative z-10">View All Projects</span>
              <span className="absolute inset-0 bg-primary/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
