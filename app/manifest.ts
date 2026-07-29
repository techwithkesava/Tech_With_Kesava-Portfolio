import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tech With Kesava",
    short_name: "Kesava",
    description: "Portfolio of Kesava Kantipudi - AI Engineer & Tech Educator",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#6A11CB",
    icons: [
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
