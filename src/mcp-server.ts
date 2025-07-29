#!/usr/bin/env node
import dotenv from "dotenv";
import { unusualWhalesMcp } from './server.js';

// Load environment variables
dotenv.config();

// Start MCP server
async function main() {
  try {
    await unusualWhalesMcp.start();
  } catch (error) {
    console.error("Failed to start MCP server:", error);
    process.exit(1);
  }
}

// Start the server
main().catch((error) => {
  console.error("Uncaught error:", error);
  process.exit(1);
});