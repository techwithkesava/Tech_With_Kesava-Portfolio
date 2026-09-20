import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Youtube, Instagram, Github, Linkedin, MessageCircle, Send } from "lucide-react";
import { getResourceBySlug } from "@/lib/data/resources";
import ResourceHeader from "@/app/components/resources/ResourceHeader";
import ResourceItem from "@/app/components/resources/ResourceItem";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource) {
    return {
      title: "Resource Not Found | Tech With Kesava",
    };
  }

  const title = `${resource.title} | Tech With Kesava`;
  const description =
    resource.description ||
    `Complete ${resource.title} setup resources, documentation, source code and tutorial.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://techwithkesava.com/resources/${resource.slug}`,
      siteName: "Tech With Kesava",
      images: resource.thumbnailUrl ? [{ url: resource.thumbnailUrl }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: resource.thumbnailUrl ? [resource.thumbnailUrl] : [],
    },
  };
}

export const revalidate = 60;

export default async function ResourceSlugPage({ params }: Props) {
  const { slug } = await params;
  const resource = await getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const socials = [
    { label: "YouTube", href: "https://youtube.com/@techwithkesava", icon: Youtube },
    { label: "Instagram", href: "https://instagram.com/techwithkesava", icon: Instagram },
    { label: "WhatsApp Channel", href: "https://whatsapp.com/channel/0029Vb8OU9I6RGJE8WulZv0a", icon: MessageCircle },
    { label: "Telegram Channel", href: "https://t.me/+J0cg_cHpMfY1MWE1", icon: Send },
    { label: "GitHub", href: "https://github.com/kesavakantipudi", icon: Github },
    { label: "LinkedIn", href: "https://linkedin.com/in/kesavakantipudi", icon: Linkedin },
  ];

  return (
    <main className="min-h-screen pt-24 pb-16 bg-[#08090D] flex flex-col items-center">
      <div className="w-full max-w-[440px] sm:max-w-[500px] mx-auto px-4">
        {/* Back button */}
        <div className="mb-4">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A1A1AA] hover:text-[#FF6B2C] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Resources
          </Link>
        </div>

        {/* Resource Header */}
        <ResourceHeader
          title={resource.title}
          description={resource.description}
          thumbnailUrl={resource.thumbnailUrl}
          category={resource.category}
        />

        {/* Resource Items */}
        {resource.items && resource.items.length > 0 ? (
          <div className="mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-3 px-1">
              Included Resources ({resource.items.length})
            </h2>
            {resource.items.map((item) => (
              <ResourceItem key={item.id} item={item} resourceId={resource.id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 rounded-xl bg-[#0F1117] border border-[#272A33] mb-8 p-4">
            <p className="text-xs text-[#A1A1AA]">No resource items added to this collection yet.</p>
          </div>
        )}

        {/* Social Links Footer */}
        <div className="pt-6 border-t border-[#272A33]/80 flex flex-col items-center">
          <p className="text-[11px] font-medium text-[#A1A1AA] mb-3">
            Connect with Tech With Kesava
          </p>
          <div className="flex items-center justify-center gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#0F1117] border border-[#272A33] text-[#A1A1AA] hover:text-[#FF6B2C] hover:border-[#FF6B2C]/40 transition-all duration-200"
                  aria-label={s.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
