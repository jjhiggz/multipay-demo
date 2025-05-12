import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const sqlite = new Database("local.db"); // or your preferred file path
export const db = drizzle(sqlite);
