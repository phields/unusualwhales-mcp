#!/usr/bin/env node
import dotenv from "dotenv";
import { unusualWhalesMcp, createUnusualWhalesMcp } from './server.js';

// Load environment variables
dotenv.config();

// Start MCP server
async function main() {
  try {
    // 如果自动初始化失败，尝试手动创建实例
    const mcp = unusualWhalesMcp || createUnusualWhalesMcp({
      UNUSUAL_WHALES_API_KEY: process.env.UNUSUAL_WHALES_API_KEY
    });
    
    await mcp.start();
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