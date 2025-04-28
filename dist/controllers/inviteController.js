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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteController = void 0;
const cacheService_1 = __importDefault(require("../services/cacheService"));
const enum_1 = require("../utils/enum");
class InviteController {
    constructor(inviteService) {
        this.inviteService = inviteService;
    }
    createInvite(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { inviteeId } = req.body;
                const { eventId } = req.params;
                console.log("======>", eventId);
                const existingInvite = yield this.inviteService.getByEventIdAndUserId(eventId, inviteeId);
                if (existingInvite) {
                    res.status(409).json({
                        message: "User is already invited to this event.",
                    });
                    return;
                }
                const newInvite = yield this.inviteService.createInvite({
                    eventId,
                    inviteeId,
                    status: enum_1.InvitationStatus.PENDING,
                    qrCode: `https://e-invitation.com/qr/event=${eventId}/invitee=${inviteeId}`,
                    isCheckIn: false,
                    checkInAt: null,
                    isCheckOut: false,
                    checkOutAt: null,
                    gift: null,
                });
                res.status(201).json({
                    message: "Invite was created.",
                    data: newInvite,
                });
            }
            catch (err) {
                console.error("Create Invite Error:", err);
                next(err);
            }
        });
    }
    getUserInvitaion(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.inviteService.getUserInvitations();
                res.json({ message: "Get all users invited.", data: result });
                return;
            }
            catch (error) {
                next(error);
            }
        });
    }
    getInvitationById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cacheKey = `invitation:${req.method}:${req.originalUrl}`;
                const cacheData = yield cacheService_1.default.get(cacheKey);
                if (cacheData) {
                    res.json({
                        message: "Cache: Get invitee by eventId",
                        data: JSON.parse(cacheData),
                    });
                    return;
                }
                const { eventId } = req.params;
                console.log(eventId);
                const result = yield this.inviteService.getInvitationById(eventId);
                if (result) {
                    yield cacheService_1.default.set(cacheKey, JSON.stringify(result), 360);
                    res.json({ message: "Api: Get invitatee by eventId", data: result });
                }
                else {
                    res.status(404).json({ message: "Invitee not found" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    countStatusByEventId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cacheKey = `invitation:${req.method}:${req.originalUrl}`;
                const cacheData = yield cacheService_1.default.get(cacheKey);
                if (cacheData) {
                    res.json({
                        message: "Cache: Get invitee by eventId",
                        data: JSON.parse(cacheData),
                    });
                    return;
                }
                const { eventId } = req.params;
                console.log(eventId);
                const result = yield this.inviteService.countStatusByEventId(eventId);
                if (result) {
                    yield cacheService_1.default.set(cacheKey, JSON.stringify(result), 360);
                    res.json({ message: "Api: Get total invitatees ", data: result });
                }
                else {
                    res.status(404).json({ message: "Invitee not found" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateStatusById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId } = req.params;
                const { status } = req.body;
                const updatedInvite = yield this.inviteService.updateStatusById(eventId, status);
                if (!updatedInvite) {
                    res.status(404).json({ message: "Invitation not found" });
                }
                res.json(updatedInvite);
                return;
            }
            catch (error) {
                console.error("Error updating status:", error);
                next(error);
            }
        });
    }
    createCheckin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId, inviteeId } = req.params;
                console.log("Event ID:", eventId);
                console.log("Invitee ID:", inviteeId);
                const checkin = yield this.inviteService.createCheckin(eventId, inviteeId);
                res.json(checkin);
                return;
            }
            catch (error) {
                console.error("Error check-in:", error);
                next(error);
            }
        });
    }
    createCheckOut(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { eventId, inviteeId } = req.params;
                const { gift } = req.body;
                console.log("Event ID:", eventId);
                console.log("Invitee ID:", inviteeId);
                const checkout = yield this.inviteService.createCheckOut(eventId, inviteeId, gift);
                res.json(checkout);
                return;
            }
            catch (error) {
                console.error("Error check-out:", error);
                next(error);
            }
        });
    }
}
exports.InviteController = InviteController;
