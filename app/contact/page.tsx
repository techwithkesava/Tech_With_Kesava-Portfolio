"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Youtube, Instagram, MapPin, Send, ArrowUpRight, CheckCircle, AlertCircle } from "lucide-react";
import GlassCard from "../components/GlassCard";

const socials = [
  { icon: Github, label: "GitHub", handle: "@kesavakantipudi", href: "https://github.com/kesavakantipudi", color: "hover:text-white" },
  { icon: Linkedin, label: "LinkedIn", handle: "Kesava Kantipudi", href: "https://linkedin.com/in/kesavakantipudi", color: "hover:text-[#0a66c2]" },
  { icon: Youtube, label: "YouTube", handle: "TechWithKesava", href: "https://www.youtube.com/channel/UC7KDLruKwCaq2LGelUVcUMA", color: "hover:text-[#ff0000]" },
  { icon: Instagram, label: "Instagram", handle: "@tech_with_kesava", href: "https://www.instagram.com/tech_with_kesava/", color: "hover:text-[#e4405f]" },
  { icon: Mail, label: "Email", handle: "techwithkesava@gmail.com", href: "mailto:techwithkesava@gmail.com", color: "hover:text-accent-blue" },
];

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all fields before sending.");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit.");
      }
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 rounded-2xl bg-white/[0.02] border border-[rgba(255,255,255,0.06)] backdrop-blur-xl text-center space-y-4"
      >
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="font-display text-2xl font-bold text-white">Message Sent!</h3>
        <p className="text-text-secondary max-w-sm mx-auto leading-relaxed">
          Thank you for reaching out. I have received your message and will get back to you as soon as possible.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-outline mt-2"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {status === "error" && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-text-muted uppercase tracking-wider mb-2 block">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="form-input"
            required
            disabled={status === "submitting"}
          />
        </div>
        <div>
          <label className="text-xs text-text-muted uppercase tracking-wider mb-2 block">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="form-input"
            required
            disabled={status === "submitting"}
          />
        </div>
      </div>
      <div>
        <label className="text-xs text-text-muted uppercase tracking-wider mb-2 block">Subject</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What's this about?"
          className="form-input"
          required
          disabled={status === "submitting"}
        />
      </div>
      <div>
        <label className="text-xs text-text-muted uppercase tracking-wider mb-2 block">Message</label>
        <textarea
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project or idea..."
          className="form-input resize-none"
          required
          disabled={status === "submitting"}
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full sm:w-auto"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="page-header px-6">
        <div className="relative z-10 section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-label mb-4 inline-flex">Contact</span>
            <h1 className="section-heading mt-4 text-4xl md:text-5xl">
              Let&apos;s <span className="gradient-text">connect</span>
            </h1>
            <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
              Whether it&apos;s a collaboration, a project idea, or just a conversation about AI — I&apos;d love to hear from you.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-text-muted">
              <MapPin className="w-4 h-4" /> Rajahmundry, India
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section border-t border-[rgba(255,255,255,0.06)]">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form Container */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl font-bold text-white mb-6">Send a message</h2>
              <ContactForm />
            </motion.div>

            {/* Social Links */}
            <div>
              <h2 className="font-display text-2xl font-bold text-white mb-6">Find me online</h2>
              <div className="space-y-3">
                {socials.map((s, i) => (
                  <GlassCard key={s.label} delay={i * 0.06} className="!p-4">
                    <a href={s.href} target="_blank" rel="noopener noreferrer"
                      className={`flex items-center justify-between group transition-colors ${s.color}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-[rgba(255,255,255,0.08)] flex items-center justify-center">
                          <s.icon className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{s.label}</p>
                          <p className="text-xs text-text-muted">{s.handle}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-current transition-colors" />
                    </a>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
