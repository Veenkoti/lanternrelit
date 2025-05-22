import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJournalEntrySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "healthy" });
  });

  // Journal Entries API endpoints
  
  // Get all journal entries
  app.get("/api/journal", async (_req, res, next) => {
    try {
      const entries = await storage.getJournalEntries();
      res.json(entries);
    } catch (error) {
      next(error);
    }
  });

  // Get a specific journal entry
  app.get("/api/journal/:id", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const entry = await storage.getJournalEntry(id);
      if (!entry) {
        return res.status(404).json({ error: "Journal entry not found" });
      }

      res.json(entry);
    } catch (error) {
      next(error);
    }
  });

  // Create a new journal entry
  app.post("/api/journal", async (req, res, next) => {
    try {
      const result = insertJournalEntrySchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid journal entry data", 
          details: result.error.format() 
        });
      }

      const newEntry = await storage.createJournalEntry(result.data);
      res.status(201).json(newEntry);
    } catch (error) {
      next(error);
    }
  });

  // Update a journal entry
  app.put("/api/journal/:id", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      // Validate the update fields
      const result = insertJournalEntrySchema.partial().safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid journal entry data", 
          details: result.error.format() 
        });
      }

      const updatedEntry = await storage.updateJournalEntry(id, result.data);
      
      if (!updatedEntry) {
        return res.status(404).json({ error: "Journal entry not found" });
      }

      res.json(updatedEntry);
    } catch (error) {
      next(error);
    }
  });

  // Delete a journal entry
  app.delete("/api/journal/:id", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const success = await storage.deleteJournalEntry(id);
      
      if (!success) {
        return res.status(404).json({ error: "Journal entry not found" });
      }

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
