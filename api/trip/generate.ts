import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { tripRequestSchema } from "../../shared/schema.js";
import { generateTripItinerary } from "../../server/gemini.js";

const methodSchema = z.enum(["POST"]);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const methodParse = methodSchema.safeParse(req.method);
  if (!methodParse.success) {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const validated = tripRequestSchema.parse(req.body);
    const itinerary = await generateTripItinerary({
      ...validated,
      travelers: Number(validated.travelers),
    });
    return res.status(200).json(itinerary);
  } catch (error: any) {
    return res.status(500).json({
      error: "Failed to generate itinerary",
      message: error?.message ?? String(error),
    });
  }
}


