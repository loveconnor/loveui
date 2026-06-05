import { getStoredProAuth } from "@/src/pro/auth"
import { handleError } from "@/src/utils/handle-error"
import { logger } from "@/src/utils/logger"
import { Command } from "commander"

export const whoami = new Command()
  .name("whoami")
  .description("show current LoveUI Pro login")
  .action(async () => {
    try {
      const auth = await getStoredProAuth()

      if (!auth?.token) {
        logger.warn("Not logged in to LoveUI Pro.")
        return
      }

      logger.log(auth.email ? `Logged in as ${auth.email}.` : "Logged in.")
    } catch (error) {
      logger.break()
      handleError(error)
    }
  })
