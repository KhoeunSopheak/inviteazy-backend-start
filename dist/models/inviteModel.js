"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitationModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const InvitationSchema = new mongoose_1.Schema({
    eventId: { type: String, required: true },
    inviteeId: { type: String, required: true },
    status: {
        type: String,
        enum: ["pending", "accept", "maybe", "no", "busy"],
        default: "pending",
        required: true,
    },
    qrCode: { type: String, required: true },
    isCheckIn: { type: Boolean, required: true, default: false },
    checkInAt: { type: Date, default: null },
    isCheckOut: { type: Boolean, required: true, default: false },
    checkOutAt: { type: Date, default: null },
    gift: { type: String, default: null },
}, {
    timestamps: { createdAt: true },
});
exports.InvitationModel = mongoose_1.default.model("Invitation", InvitationSchema);
