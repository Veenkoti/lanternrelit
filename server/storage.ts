import { 
  users, journalEntries, 
  type User, type InsertUser,
  type JournalEntry, type InsertJournalEntry
} from "@shared/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq } from "drizzle-orm";

// Define storage interface with both user and journal entry methods
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Journal entry methods
  getJournalEntries(userId?: number): Promise<JournalEntry[]>;
  getJournalEntry(id: number): Promise<JournalEntry | undefined>;
  createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry>;
  updateJournalEntry(id: number, entry: Partial<InsertJournalEntry>): Promise<JournalEntry | undefined>;
  deleteJournalEntry(id: number): Promise<boolean>;
}

// Database implementation
export class DbStorage implements IStorage {
  private db: any;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    
    const client = postgres(connectionString);
    this.db = drizzle(client);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Journal entry methods
  async getJournalEntries(userId?: number): Promise<JournalEntry[]> {
    if (userId) {
      return await this.db.select().from(journalEntries).where(eq(journalEntries.userId, userId));
    }
    return await this.db.select().from(journalEntries);
  }

  async getJournalEntry(id: number): Promise<JournalEntry | undefined> {
    const result = await this.db.select().from(journalEntries).where(eq(journalEntries.id, id));
    return result[0];
  }

  async createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry> {
    const result = await this.db.insert(journalEntries).values(entry).returning();
    return result[0];
  }

  async updateJournalEntry(id: number, entry: Partial<InsertJournalEntry>): Promise<JournalEntry | undefined> {
    const result = await this.db.update(journalEntries).set(entry).where(eq(journalEntries.id, id)).returning();
    return result[0];
  }

  async deleteJournalEntry(id: number): Promise<boolean> {
    const result = await this.db.delete(journalEntries).where(eq(journalEntries.id, id)).returning();
    return result.length > 0;
  }
}

// In-memory storage for development/fallback
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private journalEntries: Map<number, JournalEntry>;
  userCurrentId: number;
  entryCurrentId: number;

  constructor() {
    this.users = new Map();
    this.journalEntries = new Map();
    this.userCurrentId = 1;
    this.entryCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Journal entry methods
  async getJournalEntries(userId?: number): Promise<JournalEntry[]> {
    const entries = Array.from(this.journalEntries.values());
    
    if (userId) {
      return entries.filter(entry => entry.userId === userId);
    }
    
    return entries;
  }

  async getJournalEntry(id: number): Promise<JournalEntry | undefined> {
    return this.journalEntries.get(id);
  }

  async createJournalEntry(entry: InsertJournalEntry): Promise<JournalEntry> {
    const id = this.entryCurrentId++;
    const journalEntry = { ...entry, id } as JournalEntry;
    this.journalEntries.set(id, journalEntry);
    return journalEntry;
  }

  async updateJournalEntry(id: number, entry: Partial<InsertJournalEntry>): Promise<JournalEntry | undefined> {
    const existingEntry = this.journalEntries.get(id);
    
    if (!existingEntry) {
      return undefined;
    }
    
    const updatedEntry = { ...existingEntry, ...entry } as JournalEntry;
    this.journalEntries.set(id, updatedEntry);
    return updatedEntry;
  }

  async deleteJournalEntry(id: number): Promise<boolean> {
    return this.journalEntries.delete(id);
  }
}

// Use database storage if DATABASE_URL is available, otherwise use in-memory storage
export const storage = process.env.DATABASE_URL 
  ? new DbStorage() 
  : new MemStorage();
