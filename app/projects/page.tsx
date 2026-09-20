"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    title: "Collaborative AI Agent Orchestration Framework",
    description: "Multi-agent orchestration system built with LangGraph enabling collaborative AI agents to work together on complex tasks through structured workflows and state management.",
    tech: ["Python", "LangGraph", "LLMs", "Multi-Agent", "Orchestration"],
    features: ["Agent Collaboration", "State Management", "Workflow Orchestration", "Task Decomposition", "LangGraph Integration", "Scalable Architecture"],
    href: "https://github.com/kesavakantipudi/Collaborative-AI-Agent-Orchestration-Framework-with-LangGraph",
  },
  {
    title: "Multimodal RAG System for Document & Image Analysis",
    description: "Production-grade multimodal RAG system that processes both documents and images, enabling semantic search and question answering across mixed-media corpora.",
    tech: ["Python", "RAG", "Embeddings", "Vector DB", "Vision AI", "LangChain"],
    features: ["Document Analysis", "Image Understanding", "Multimodal Search", "Vector Storage", "Context Retrieval", "Grounded Responses"],
    href: "https://github.com/kesavakantipudi/Multimodal-RAG-System-for-Document-and-Image-Analysis",
  },
  {
    title: "Prompt Injection Defense System for LLM Applications",
    description: "Multi-layered AI safety middleware that detects and prevents prompt injection attacks in real-time through input sanitization, output filtering, and behavioral analysis.",
    tech: ["Python", "Transformers", "FastAPI", "AI Safety", "NLP"],
    features: ["Attack Detection", "Input Sanitization", "Output Filtering", "Behavioral Analysis", "Safety Middleware", "Real-time Monitoring"],
    href: "https://github.com/kesavakantipudi/Prompt-Injection-Defense-System-for-LLM-Applications",
  },
  {
    title: "LLM Fine-Tuning Pipeline with LoRA",
    description: "End-to-end pipeline for fine-tuning Large Language Models using LoRA (Low-Rank Adaptation), enabling efficient model customization with minimal compute resources.",
    tech: ["Python", "Transformers", "LoRA", "PEFT", "PyTorch"],
    features: ["LoRA Adaptation", "Custom Datasets", "Training Pipeline", "Model Evaluation", "Efficient Fine-Tuning", "Parameter-Efficient"],
    href: "https://github.com/kesavakantipudi/LLM-Fine-Tuning-Pipeline-with-LoRA",
  },
  {
    title: "Persistent-Memory AI Academic Advisor with MCP Server",
    description: "AI-powered academic advisor with persistent memory using MCP Server and vector search, providing personalized guidance that remembers past interactions.",
    tech: ["Python", "MCP", "Vector Search", "LLMs", "Memory Systems"],
    features: ["Persistent Memory", "Vector Search", "MCP Server", "Academic Guidance", "Context Retention", "Personalized Advice"],
    href: "https://github.com/kesavakantipudi/Persistent-Memory-AI-Academic-Advisor-with-an-MCP-Server-and-Vector-Search",
  },
  {
    title: "Production-Ready Real-Time Speech-to-Intent Pipeline",
    description: "Real-time speech processing pipeline that converts spoken language to structured intents, enabling voice-driven AI applications with production-grade reliability.",
    tech: ["Python", "Speech AI", "NLP", "Intent Classification", "Real-time"],
    features: ["Speech Recognition", "Intent Classification", "Real-time Processing", "Production Pipeline", "Voice Commands", "Low Latency"],
    href: "https://github.com/kesavakantipudi/Production-Ready-Real-Time-Speech-to-Intent-Pipeline",
  },
  {
    title: "RAG-Powered Document Q&A System",
    description: "Retrieval-augmented generation system for document question answering with semantic search, citation generation, and grounded responses traceable to source material.",
    tech: ["Python", "RAG", "LangChain", "Embeddings", "Vector DB"],
    features: ["Semantic Search", "Citation Generation", "Grounded Responses", "Document Parsing", "Context Windowing", "Q&A Interface"],
    href: "https://github.com/kesavakantipudi/RAG-Powered-Document-Q-A-System",
  },
  {
    title: "Event-Driven RAG Document Ingestion Pipeline",
    description: "Scalable event-driven pipeline for ingesting, chunking, embedding, and storing documents in a vector database for RAG applications.",
    tech: ["Python", "Event-Driven", "Vector DB", "Embeddings", "Pipeline"],
    features: ["Event-Driven Architecture", "Document Chunking", "Embedding Pipeline", "Vector Storage", "Scalable Ingestion", "MIT Licensed"],
    href: "https://github.com/kesavakantipudi/An-Event-Driven-RAG-Document-Ingestion-Pipeline-with-Vector-Database",
  },
  {
    title: "LLM-Powered Prompt Router for Intent Classification",
    description: "Intelligent prompt routing system powered by LLMs that classifies user intents and routes requests to specialized handlers for optimal response generation.",
    tech: ["Python", "LLMs", "Intent Classification", "Routing", "NLP"],
    features: ["Intent Classification", "Smart Routing", "LLM Integration", "Handler System", "Response Optimization", "Multi-Intent Support"],
    href: "https://github.com/kesavakantipudi/LLM-Powered-Prompt-Router-for-Intent-Classification",
  },
  {
    title: "Scalable AI Image Analysis API",
    description: "High-throughput image analysis API with rate limiting and asynchronous processing, designed for production workloads with intelligent request management.",
    tech: ["Python", "FastAPI", "Async", "Rate Limiting", "Image AI"],
    features: ["Image Analysis", "Rate Limiting", "Async Processing", "Scalable API", "Production Ready", "Request Management"],
    href: "https://github.com/kesavakantipudi/Develop-a-Scalable-AI-Image-Analysis-API-with-Rate-Limiting-and-Asynchronous-Processing",
  },
  {
    title: "Python-based Prompt Engineering Framework",
    description: "Structured framework for prompt engineering with Python, providing templates, chain-of-thought patterns, and evaluation tools for LLM interactions.",
    tech: ["Python", "Prompt Engineering", "LLMs", "Templates", "Evaluation"],
    features: ["Prompt Templates", "Chain-of-Thought", "Evaluation Tools", "Framework Design", "Best Practices", "Reusable Patterns"],
    href: "https://github.com/kesavakantipudi/Python-based-Prompt-Engineering-Framework",
  },
  {
    title: "Hospital Readmission Risk Predictor",
    description: "ML model predicting hospital readmission risk using Scikit-learn with SHAP-based explainability, providing interpretable predictions for healthcare analytics.",
    tech: ["Python", "Scikit-Learn", "SHAP", "Jupyter", "Healthcare AI"],
    features: ["Risk Prediction", "SHAP Explainability", "Feature Importance", "Healthcare Analytics", "Model Interpretability", "Data Pipeline"],
    href: "https://github.com/kesavakantipudi/Hospital-Readmission-Risk-Predictor-with-Scikit-learn-and-SHAP",
  },
  {
    title: "Multi-Task Learning with Gradient Surgery",
    description: "Multi-task learning model implementing gradient surgery techniques using TensorFlow, with a Streamlit dashboard for visualization and experimentation.",
    tech: ["Python", "TensorFlow", "Streamlit", "MTL", "Gradient Surgery"],
    features: ["Multi-Task Learning", "Gradient Surgery", "TensorFlow Models", "Streamlit Dashboard", "Task Balancing", "Visualization"],
    href: "https://github.com/kesavakantipudi/Multi-Task-Learning-Model-with-Gradient-Surgery-using-TensorFlow-and-Streamlit",
  },
  {
    title: "Explainable Recommendation System with SHAP",
    description: "Recommendation engine with SHAP-based feature attribution providing transparent, explainable recommendations users can understand and trust.",
    tech: ["Python", "SHAP", "Scikit-Learn", "RecSys", "XAI"],
    features: ["Recommendations", "SHAP Attribution", "Explainable AI", "Feature Analysis", "User Trust", "Transparent Models"],
    href: "https://github.com/kesavakantipudi/Explainable-Recommendation-System-with-SHAP-Based-Feature-Attribution",
  },
  {
    title: "Variational Autoencoder with Controllable Latent Space",
    description: "VAE implementation with a controllable latent space explorer using PyTorch, enabling interactive exploration of generative model representations.",
    tech: ["Python", "PyTorch", "VAE", "Generative AI", "Deep Learning"],
    features: ["Variational Autoencoder", "Latent Space Control", "PyTorch Implementation", "Interactive Explorer", "Generative Models", "Visualization"],
    href: "https://github.com/kesavakantipudi/Variational-Autoencoder-with-a-Controllable-Latent-Space-Explorer-using-PyTorch",
  },
  {
    title: "Movie Recommendation System",
    description: "Collaborative filtering-based recommendation system for movies, implementing user-based and item-based approaches for personalized suggestions.",
    tech: ["Python", "Collaborative Filtering", "Scikit-Learn", "Pandas"],
    features: ["User-Based CF", "Item-Based CF", "Rating Prediction", "Similarity Metrics", "Cold Start Handling", "Evaluation Metrics"],
    href: "https://github.com/kesavakantipudi/Movie-Recommendation-System-with-Collaborative-Filtering",
  },
  {
    title: "Production A/B Testing Framework for ML Models",
    description: "Production-grade A/B testing framework for ML models with traffic splitting, statistical analysis, and a live dashboard for experiment monitoring.",
    tech: ["Python", "FastAPI", "Docker", "SQLite", "Statistics"],
    features: ["Traffic Splitting", "Statistical Analysis", "Live Dashboard", "Model Comparison", "Experiment Tracking", "Containerized"],
    href: "https://github.com/kesavakantipudi/A-Production-A-B-Testing-Framework-for-ML-Models",
  },
  {
    title: "Social Media Sentiment Analysis Platform",
    description: "Real-time sentiment and topic analysis platform for social media data using NLP models and a live dashboard for trend monitoring.",
    tech: ["Python", "NLP", "Sentiment Analysis", "Dashboard", "Topic Modeling"],
    features: ["Sentiment Analysis", "Topic Modeling", "Real-time Processing", "Live Dashboard", "Trend Monitoring", "Data Visualization"],
    href: "https://github.com/kesavakantipudi/Social-Media-Sentiment-and-Topic-Analysis-Platform-with-Python",
  },
  {
    title: "Real-Time Sentiment Analysis Platform",
    description: "AI-powered sentiment analysis platform with real-time processing capabilities and a live interactive dashboard for monitoring sentiment trends.",
    tech: ["Python", "AI Models", "Real-time", "Dashboard", "NLP"],
    features: ["Real-time Analysis", "AI Models", "Live Dashboard", "Trend Detection", "Multi-source Input", "Visual Analytics"],
    href: "https://github.com/kesavakantipudi/Sentiment_Analysis_Platform",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Header */}
      <section className="page-header px-6">
        <div className="relative z-10 section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="section-label mb-4 inline-flex">Projects</span>
            <h1 className="section-heading mt-4 text-4xl md:text-5xl">
              Building the <span className="gradient-text">future of AI</span>
            </h1>
            <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto">
              {projects.length} production-grade AI systems — from RAG pipelines to multi-agent orchestration, built for reliability, scalability, and real-world impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section bg-[#08090D] border-t border-[#272A33]">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <ProjectCard key={p.title} {...p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* GitHub CTA */}
      <section className="section bg-[#0D0F14]/60 border-t border-[#272A33]">
        <div className="section-container text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[#FF6B2C] text-sm uppercase tracking-widest mb-3 font-semibold">
              37 repositories and counting
            </p>
            <h2 className="section-heading text-2xl mb-4">
              Always building, always shipping
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto">
              Check out my GitHub for the latest projects and contributions to the AI engineering ecosystem.
            </p>
            <a
              href="https://github.com/kesavakantipudi"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-6 inline-flex"
            >
              View GitHub Profile <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
