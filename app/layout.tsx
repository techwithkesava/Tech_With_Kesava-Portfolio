import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://techwithkesava.vercel.app"),
  title: {
    default: "TechWithKesava — AI Engineer & Tech Educator",
    template: "%s | TechWithKesava",
  },
  description:
    "Kesava Kantipudi — AI Engineer specializing in LLMs, RAG systems, and production AI. Microsoft Certified Power Platform Professional. Building AI. Teaching Tech. Sharing Knowledge.",
  keywords: [
    "AI Engineer",
    "LLM Developer",
    "Tech Educator",
    "Kesava Kantipudi",
    "TechWithKesava",
    "Machine Learning",
    "RAG",
    "FastAPI",
    "Python",
    "Microsoft Certified",
    "Power Platform",
  ],
  authors: [{ name: "Kesava Sai Veerendra Kantipudi" }],
  creator: "Kesava Kantipudi",
  openGraph: {
    title: "TechWithKesava — AI Engineer & Tech Educator",
    description:
      "AI Engineer building production-grade intelligence systems. Microsoft Certified. Teaching technology professionally.",
    type: "website",
    siteName: "TechWithKesava",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechWithKesava — AI Engineer & Tech Educator",
    description:
      "AI Engineer building production-grade intelligence systems. Teaching technology professionally.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "YOUR_GOOGLE_SITE_VERIFICATION_CODE_HERE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <Navbar />
        <main className="relative min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
