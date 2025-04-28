"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoQueryWithLogging = mongoQueryWithLogging;
const loggerService_1 = require("../../services/loggerService");
function mongoQueryWithLogging(operationName, operation, requestId) {
    return __awaiter(this, void 0, void 0, function* () {
        const startTime = Date.now();
        try {
            const result = yield operation();
            const duration = Date.now() - startTime;
            loggerService_1.logger.info("MongoDB operation executed", {
                requestId,
                operation: operationName,
                duration: `${duration}ms`,
            });
            return result;
        }
        catch (error) {
            const duration = Date.now() - startTime;
            loggerService_1.logger.error("MongoDB operation failed", {
                requestId,
                operation: operationName,
                error: error instanceof Error ? error.message : String(error),
                duration: `${duration}ms`,
            });
            throw error;
        }
    });
}
