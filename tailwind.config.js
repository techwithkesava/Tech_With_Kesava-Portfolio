/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF6B2C",
          "orange-hover": "#FF4F1F",
        },
        bg: {
          primary: "#08090D",
          elevated: "#0D0F14",
          surface: "#13161D",
          hover: "#1A1E27",
          glass: "rgba(19, 22, 29, 0.75)",
        },
        border: {
          DEFAULT: "#272A33",
          subtle: "#1F222A",
          hover: "rgba(255, 107, 44, 0.4)",
        },
        text: {
          primary: "#F8FAFC",
          secondary: "#A1A1AA",
          muted: "#71717A",
        },
        accent: {
          orange: "#FF6B2C",
          purple: "#8B5CF6",
          blue: "#3B82F6",
          glow: "rgba(255, 107, 44, 0.15)",
        },
      },
      fontFamily: {
        display: ["'Outfit'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 107, 44, 0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 107, 44, 0.25)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
