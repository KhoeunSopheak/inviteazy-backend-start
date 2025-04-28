"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const eventSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
}, {
    timestamps: true, // ✅ Enable createdAt and updatedAt
});
exports.EventModel = mongoose_1.default.model("Event", eventSchema);
