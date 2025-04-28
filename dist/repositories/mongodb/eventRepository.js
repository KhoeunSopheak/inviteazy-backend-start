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
exports.MongoEventRepository = void 0;
const eventModel_1 = require("../../models/eventModel");
class MongoEventRepository {
    create(event) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const newEvent = new eventModel_1.EventModel({
                userId: event.userId,
                name: event.name,
                date: new Date(event.date),
                time: new Date(event.date),
                location: event.location,
                description: event.description,
            });
            const savedEvent = yield newEvent.save();
            return {
                id: savedEvent._id.toString(), // 👈 safely cast
                userId: savedEvent.userId,
                name: savedEvent.name,
                date: savedEvent.date.toISOString(),
                time: savedEvent.date.toISOString(),
                location: savedEvent.location,
                description: savedEvent.description,
                createdAt: (_b = (_a = savedEvent.createdAt) === null || _a === void 0 ? void 0 : _a.toISOString()) !== null && _b !== void 0 ? _b : new Date().toISOString(),
                updatedAt: (_d = (_c = savedEvent.updatedAt) === null || _c === void 0 ? void 0 : _c.toISOString()) !== null && _d !== void 0 ? _d : new Date().toISOString(),
            };
        });
    }
}
exports.MongoEventRepository = MongoEventRepository;
