import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Talha",
    start_url: "/",
    display: "standalone",
    background_color: "#14110e",
    theme_color: "#14110e",
  };
}
