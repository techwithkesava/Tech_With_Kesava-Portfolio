/**
 * One-time seed script.
 *
 * - Migrates the existing hardcoded blogs (app/data/blogPosts.ts) into Supabase
 *   without overwriting anything that already exists (by slug).
 * - Seeds a small set of sample AI tools ONLY if the ai_tools table is empty.
 *
 * Usage:
 *   node scripts/seed.mjs
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.
 */
import process from "node:process";
import { createClient } from "@supabase/supabase-js";

try {
  process.loadEnvFile(new URL("../.env", import.meta.url));
} catch {
  // .env is optional when keys are set in the environment.
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env. Nothing seeded."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

const { blogPosts } = await import("../app/data/blogPosts.ts");

const MONTHS = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

function parseDate(value) {
  const match = String(value || "").match(/([A-Za-z]{3})\s+(\d{4})/);
  if (!match) return null;
  const month = MONTHS[match[1]];
  if (!month) return null;
  return `${match[2]}-${month}-01T00:00:00.000Z`;
}

async function seedBlogs() {
  const { data: existingRows } = await supabase.from("blogs").select("slug");

  const existingSlugs = new Set((existingRows || []).map((r) => r.slug));

  const toInsert = blogPosts
    .filter((post) => !existingSlugs.has(post.slug))
    .map((post, index) => ({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: [],
      author: "Kesava Kantipudi",
      featured: index === 0,
      published: true,
      published_at: parseDate(post.date),
      read_time: post.readTime,
    }));

  if (toInsert.length === 0) {
    console.log("[blogs] All existing blogs are already in Supabase. Nothing to do.");
    return 0;
  }

  const { error } = await supabase.from("blogs").insert(toInsert);

  if (error) {
    console.error("[blogs] Failed to seed blogs:", error.message);
    process.exitCode = 1;
    return 0;
  }

  console.log(`[blogs] Seeded ${toInsert.length} blog post(s).`);
  return toInsert.length;
}

async function seedAiTools() {
  const { count } = await supabase
    .from("ai_tools")
    .select("*", { count: "exact", head: true });

  if (count && count > 0) {
    console.log("[ai-tools] Table not empty — skipping sample tools.");
    return 0;
  }

  const sampleTools = [
    {
      name: "ChatGPT",
      description:
        "OpenAI's conversational AI assistant for chat, writing, coding, and research.",
      url: "https://chatgpt.com",
      category: "Chatbots",
      tags: ["LLM", "Free", "Productivity"],
      featured: true,
      published: true,
    },
    {
      name: "Claude",
      description:
        "Anthropic's AI assistant focused on helpfulness, safety, and long-context understanding.",
      url: "https://claude.ai",
      category: "Chatbots",
      tags: ["LLM", "Long Context"],
      featured: true,
      published: true,
    },
    {
      name: "Google Gemini",
      description:
        "Google's multimodal AI model family with deep Workspace integration.",
      url: "https://gemini.google.com",
      category: "Chatbots",
      tags: ["Multimodal", "Free"],
      featured: false,
      published: true,
    },
    {
      name: "Hugging Face",
      description:
        "The AI community platform for models, datasets, and ML tooling.",
      url: "https://huggingface.co",
      category: "ML Platform",
      tags: ["Open Source", "Models"],
      featured: false,
      published: true,
    },
    {
      name: "LangChain",
      description:
        "Framework for building LLM applications with chains, agents, and RAG.",
      url: "https://www.langchain.com",
      category: "Developer",
      tags: ["RAG", "Open Source"],
      featured: false,
      published: true,
    },
    {
      name: "Cursor",
      description:
        "AI-powered code editor that speeds up development with an AI pair programmer.",
      url: "https://www.cursor.com",
      category: "Developer",
      tags: ["Coding", "AI Editor"],
      featured: false,
      published: true,
    },
  ];

  const { error } = await supabase.from("ai_tools").insert(sampleTools);

  if (error) {
    console.error("[ai-tools] Failed to seed sample tools:", error.message);
    process.exitCode = 1;
    return 0;
  }

  console.log(`[ai-tools] Seeded ${sampleTools.length} sample AI tool(s).`);
  return sampleTools.length;
}

console.log("Seeding TechWithKesava content into Supabase...\n");

await seedBlogs();
await seedAiTools();

console.log("\nDone.");
