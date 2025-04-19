"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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

// Define skill types
type Skill = {
  name: string;
  level: number;
  icon: string;
};

type SkillCategories = {
  [key: string]: Skill[];
};

// Skills data
const skillCategories: SkillCategories = {
  frontend: [
    {
      name: "React.js",
      level: 95,
      icon: "⚛️",
    },
    {
      name: "Next.js",
      level: 90,
      icon: "▲",
    },
    {
      name: "TypeScript",
      level: 85,
      icon: "📘",
    },
    {
      name: "Cypress",
      level: 88,
      icon: "🧪",
    },
    {
      name: "HTML/CSS",
      level: 92,
      icon: "🌐",
    },
    {
      name: "Tailwind CSS",
      level: 90,
      icon: "🎨",
    },
  ],
  backend: [
    {
      name: "Python",
      level: 95,
      icon: "🐍",
    },
    {
      name: "Django",
      level: 92,
      icon: "🔧",
    },
    {
      name: "AWS",
      level: 85,
      icon: "☁️",
    },
    {
      name: "Terraform",
      level: 80,
      icon: "🏗️",
    },
    {
      name: "Microservices",
      level: 88,
      icon: "🧩",
    },
    {
      name: "PostgreSQL",
      level: 85,
      icon: "🐘",
    },
  ],
  devops: [
    {
      name: "CI/CD",
      level: 85,
      icon: "⚙️",
    },
    {
      name: "Docker",
      level: 88,
      icon: "🐳",
    },
    {
      name: "Kubernetes",
      level: 78,
      icon: "☸️",
    },
    {
      name: "GitHub Actions",
      level: 90,
      icon: "🔄",
    },
    {
      name: "Terraform",
      level: 82,
      icon: "🏗️",
    },
    {
      name: "Monitoring",
      level: 80,
      icon: "📊",
    },
  ],
  testing: [
    {
      name: "Cypress",
      level: 92,
      icon: "🧪",
    },
    {
      name: "Jest",
      level: 88,
      icon: "✅",
    },
    {
      name: "React Testing Library",
      level: 85,
      icon: "🔍",
    },
    {
      name: "TDD",
      level: 80,
      icon: "📝",
    },
    {
      name: "QA Automation",
      level: 86,
      icon: "🤖",
    },
    {
      name: "Performance Testing",
      level: 79,
      icon: "⏱️",
    },
  ],
};

const otherSkills = [
  {
    name: "CI/CD",
    icon: "⚙️",
    description: "Jenkins, GitHub Actions, automated workflows",
    bgColor: "bg-gradient-to-br from-[#4285F4]/20 to-[#4285F4]/5",
  },
  {
    name: "Docker",
    icon: "🐳",
    description: "Containerization and orchestration",
    bgColor: "bg-gradient-to-br from-[#2496ED]/20 to-[#2496ED]/5",
  },
  {
    name: "RESTful APIs",
    icon: "🔌",
    description: "API design and implementation",
    bgColor: "bg-gradient-to-br from-[#FF6B6B]/20 to-[#FF6B6B]/5",
  },
  {
    name: "Git/GitHub",
    icon: "🔄",
    description: "Version control and collaboration",
    bgColor: "bg-gradient-to-br from-[#F05032]/20 to-[#F05032]/5",
  },
  {
    name: "Agile/Scrum",
    icon: "📊",
    description: "Agile methodologies and practices",
    bgColor: "bg-gradient-to-br from-[#9C27B0]/20 to-[#9C27B0]/5",
  },
  {
    name: "Cloud Architecture",
    icon: "☁️",
    description: "Scalable cloud infrastructure design",
    bgColor: "bg-gradient-to-br from-[#FF9900]/20 to-[#FF9900]/5",
  },
];

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
  icon: string;
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
          <span className="text-xl">{icon}</span>
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

// Now define the actual SkillsSection component
export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("frontend");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 -z-10 opacity-30">
        <svg
          width="300"
          height="300"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M10,50 Q25,25 50,50 T90,50"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            className="text-primary"
            animate={{
              d: [
                "M10,50 Q25,25 50,50 T90,50",
                "M10,50 Q25,75 50,50 T90,50",
                "M10,50 Q25,25 50,50 T90,50",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "loop" as const,
            }}
          />
        </svg>
      </div>

      <div
        ref={sectionRef}
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4 inline-block">
              Expertise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl mb-4"
          >
            My Skills
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: 80 } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-[42rem] mx-auto text-muted-foreground"
          >
            With over 6 years of experience, I've developed a diverse skill set
            covering the entire development spectrum.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap justify-center gap-2 p-2 bg-card/50 backdrop-blur-sm rounded-xl shadow-inner">
            {Object.keys(skillCategories).map((category) => (
              <motion.button
                key={category}
                className={`px-6 py-3 rounded-lg capitalize transition-all font-medium ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md"
                    : "hover:bg-card/80"
                }`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: activeCategory === category ? 1 : 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Skill Bars */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={activeCategory}
        >
          {skillCategories[activeCategory].map((skill, index) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              index={index}
              icon={skill.icon}
            />
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-xl font-bold mb-4">Other Skills & Tools</h3>
            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {otherSkills.map((skill, index) => (
              <HoverCard key={skill.name}>
                <HoverCardTrigger asChild>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.2 },
                    }}
                    className={`flex flex-col items-center justify-center p-6 border rounded-xl text-center cursor-pointer h-full relative group ${skill.bgColor} backdrop-blur-sm shadow-sm hover:shadow-lg transition-all`}
                  >
                    {/* Glowing effect on hover */}
                    <span className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></span>

                    <motion.span
                      className="text-3xl mb-3"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse" as const,
                        delay: index * 0.2,
                      }}
                    >
                      {skill.icon}
                    </motion.span>
                    <span className="font-medium">{skill.name}</span>

                    {/* Animated border */}
                    <motion.span
                      className="absolute bottom-0 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0, opacity: 0, x: "40%" }}
                      whileInView={{ width: "80%", opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                    />
                  </motion.div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 backdrop-blur-sm bg-card/70 border-primary/20 shadow-lg">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span>
                        {skill.name}
                      </h4>
                      <p className="text-sm mt-1">{skill.description}</p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </motion.div>

        {/* Rounded decoration */}
        <div className="mt-20 flex justify-center">
          <motion.div
            className="h-1 w-24 rounded-full bg-muted"
            animate={{
              width: ["80px", "120px", "80px"],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </div>
    </section>
  );
}
