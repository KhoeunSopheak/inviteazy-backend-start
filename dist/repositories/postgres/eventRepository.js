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
exports.PostgresEventRepository = void 0;
const utils_1 = require("./utils");
class PostgresEventRepository {
    constructor(pool) {
        this.pool = pool;
    }
    create(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, `
        INSERT INTO public.events ( name, date, time, location, description,userid)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, name, date, time, location, description, userid
      `, [
                event.name,
                event.date,
                event.time,
                event.location,
                event.description,
                event.userId
            ]);
            return rows[0];
        });
    }
}
exports.PostgresEventRepository = PostgresEventRepository;
;
