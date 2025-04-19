"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Replace this with your actual Formspree form ID
const FORMSPREE_FORM_ID = "mzzenbjq";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

const pulseAnimation = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "mirror" as const,
    },
  },
};

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (!formRef.current) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://formspree.io/f/${FORMSPREE_FORM_ID}`,
        {
          method: "POST",
          body: new FormData(formRef.current),
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        formRef.current.reset();

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
      setFormError(
        "Failed to send message. Please try again or contact directly via email."
      );
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30 opacity-80"></div>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5"
            style={{
              width: Math.random() * 100 + 10,
              height: Math.random() * 100 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl font-bold tracking-tight sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
            variants={itemVariants}
          >
            Get In Touch
          </motion.h2>
          <motion.div
            className="h-1 w-12 bg-gradient-to-r from-primary to-primary/60 mx-auto mb-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          ></motion.div>
          <motion.p
            className="max-w-[42rem] mx-auto text-muted-foreground text-lg"
            variants={itemVariants}
          >
            Feel free to reach out if you'd like to work together or just want
            to say hello.
          </motion.p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold">
                  Contact Information
                </CardTitle>
                <CardDescription className="text-base">
                  Here are the ways you can reach me directly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors"
                    whileHover={pulseAnimation.pulse}
                  >
                    <Mail className="h-5 w-5 text-primary" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a
                      href="mailto:ratnadeep.goyal@gmail.com"
                      className="text-sm text-primary/80 hover:text-primary hover:underline transition-colors"
                    >
                      ratnadeep.goyal@gmail.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors"
                    whileHover={pulseAnimation.pulse}
                  >
                    <Phone className="h-5 w-5 text-primary" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <a
                      href="tel:+919057252643"
                      className="text-sm text-primary/80 hover:text-primary hover:underline transition-colors"
                    >
                      +91 9057252643
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors"
                    whileHover={pulseAnimation.pulse}
                  >
                    <MapPin className="h-5 w-5 text-primary" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">
                      Pune, Maharashtra, India
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-8 pt-6 border-t border-border/40"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-sm text-center text-muted-foreground italic">
                    Looking forward to hearing from you!
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring", delay: 0.2 }}
          >
            <Card className="border-none shadow-lg bg-card/80 backdrop-blur-sm overflow-hidden hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
              <CardHeader className="pb-3 relative">
                <CardTitle className="text-2xl font-bold">
                  Send Me a Message
                </CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <motion.div
                      className="space-y-2"
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        className="w-full rounded-md border border-input bg-background/60 backdrop-blur-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        required
                      />
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="w-full rounded-md border border-input bg-background/60 backdrop-blur-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                        required
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    className="space-y-2"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      className="w-full rounded-md border border-input bg-background/60 backdrop-blur-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      required
                    />
                  </motion.div>
                  <motion.div
                    className="space-y-2"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full rounded-md border border-input bg-background/60 backdrop-blur-sm px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none"
                      required
                    ></textarea>
                  </motion.div>

                  {/* Hidden honeypot field to prevent spam */}
                  <input
                    type="text"
                    name="_gotcha"
                    style={{ display: "none" }}
                  />

                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="rounded-md bg-green-500/10 backdrop-blur-sm border border-green-500/20 p-3"
                      >
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span>Your message has been sent successfully!</span>
                        </div>
                      </motion.div>
                    )}

                    {formError && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="rounded-md bg-red-500/10 backdrop-blur-sm border border-red-500/20 p-3"
                      >
                        <div className="flex items-center gap-2 text-red-600">
                          <AlertCircle className="h-5 w-5" />
                          <span>{formError}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Button
                      type="submit"
                      className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all py-6"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          Sending...
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-t-transparent border-white rounded-full"
                          />
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Send Message
                          <Send className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
