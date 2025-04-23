import { logger } from "../../services/loggerService";

export async function mongoQueryWithLogging<T>(
  operationName: string,
  operation: () => Promise<T>,
  requestId?: string
): Promise<T> {
  const startTime = Date.now();

  try {
    const result = await operation();
    const duration = Date.now() - startTime;

    logger.info("MongoDB operation executed", {
      requestId,
      operation: operationName,
      duration: `${duration}ms`,
    });

    return result;
  } catch (error) {
    const duration = Date.now() - startTime;

    logger.error("MongoDB operation failed", {
      requestId,
      operation: operationName,
      error: error instanceof Error ? error.message : String(error),
      duration: `${duration}ms`,
    });

    throw error;
  }
}
