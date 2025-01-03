import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Open Graph Image Generator",
    short_name: "Open Graph Image Generator",
    description: "Generate beautiful Open Graph images with zero effort.",
    start_url: "/",
    display: "standalone",
  }
}
