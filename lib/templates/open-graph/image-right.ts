import { z } from "zod"

import { absoluteUrl } from "@/lib/url"

import { backgroundSchema } from "../elements/background"
import { canvasSchema } from "../elements/canvas"
import { imageSchema } from "../elements/image"
import { textSchema } from "../elements/text"

export const imageRightTemplateSchema = z.object({
  name: z.literal("og:image-right"),
  params: z.object({
    tag: textSchema.merge(
      z.object({
        // apply defaults
        fontSize: textSchema.shape.fontSize.default(20),
      })
    ),
    title: textSchema.merge(
      z.object({
        // apply defaults
        fontWeight: textSchema.shape.fontWeight.default(700),
        fontSize: textSchema.shape.fontSize.default(60),
      })
    ),
    logo: imageSchema,
    image: imageSchema,
  }),
  background: backgroundSchema,
  canvas: canvasSchema,
})
export type ImageRightTemplate = z.infer<typeof imageRightTemplateSchema>

export const imageRightTemplateDefault: ImageRightTemplate = {
  name: "og:image-right",
  params: {
    tag: {
      text: "NextJSBase",
      fontFamily: "inter",
      fontWeight: 400,
      fontSize: 20,
      color: "#030712",
    },
    title: {
      text: "Ship your AI SaaS with NextJSBase in hours",
      fontFamily: "inter",
      fontWeight: 700,
      fontSize: 60,
      color: "#030712",
    },
    logo: {
      url: absoluteUrl("/logo.svg"),
    },
    image: {
      url: absoluteUrl("/dashboard.png"),
    },
  },
  background: {
    type: "linear-gradient",
    direction: "to top right",
    colorStops: [
      "#d5d4d0 0%",
      "#d5d4d0 1%",
      "#eeeeec 31%",
      "#efeeec 75%",
      "#e9e9e7 100%",
    ],
    noise: 0.15,
    gridOverlay: {
      pattern: "grid",
      color: "#f9fafb",
      opacity: 0.4,
      blurRadius: 20,
    },
  },
  canvas: {
    width: 1200,
    height: 630,
  },
}
