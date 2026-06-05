import { clearProAuth } from "@/src/pro/auth"
import { handleError } from "@/src/utils/handle-error"
import { logger } from "@/src/utils/logger"
import { spinner } from "@/src/utils/spinner"
import { Command } from "commander"

export const logout = new Command()
  .name("logout")
  .description("logout of LoveUI Pro")
  .action(async () => {
    try {
      await clearProAuth()
      spinner("Logged out of LoveUI Pro.")?.succeed()
    } catch (error) {
      logger.break()
      handleError(error)
    }
  })
