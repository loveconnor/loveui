#!/usr/bin/env node
import { server } from "@/src/mcp"
import { handleError } from "@/src/utils/handle-error"
import { logger } from "@/src/utils/logger"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

async function main() {
  try {
    const transport = new StdioServerTransport()
    await server.connect(transport)
  } catch (error) {
    logger.break()
    handleError(error)
  }
}

main()
