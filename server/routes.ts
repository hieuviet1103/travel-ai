import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateTripItinerary } from "./gemini";
import { tripRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate trip itinerary using Gemini AI
  app.post("/api/trip/generate", async (req, res) => {
    try {
      const validatedData = tripRequestSchema.parse(req.body);
      
      const itinerary = await generateTripItinerary({
        ...validatedData,
        travelers: Number(validatedData.travelers),
      });
      
      res.json(itinerary);
    } catch (error: any) {
      console.error("Error generating trip:", error);
      res.status(500).json({ 
        error: "Failed to generate itinerary",
        message: error.message 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
