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
exports.InviteService = void 0;
class InviteService {
    constructor(inviteRepository) {
        this.inviteRepository = inviteRepository;
    }
    createInvite(invite) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.inviteRepository.create(invite);
        });
    }
    getByEventIdAndUserId(eventId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inviteRepository.findByEventIdAndUserId(eventId, userId);
        });
    }
    getUserInvitations() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inviteRepository.findUserInvitation();
        });
    }
    getInvitationById(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const invitation = yield this.inviteRepository.findInvitationById(eventId);
            if (!invitation) {
                throw Object.assign(new Error("Invitation not found"), { status: 404 });
            }
            return invitation;
        });
    }
    countStatusByEventId(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const countStatus = yield this.inviteRepository.countStatusByEventId(eventId);
            if (!countStatus) {
                throw Object.assign(new Error("Invitees not found"), { status: 404 });
            }
            return countStatus;
        });
    }
    updateStatusById(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield this.inviteRepository.updateStatusById(id, status);
            if (!updated) {
                throw new Error("Invitation not found or status update failed.");
            }
            return updated;
        });
    }
    createCheckin(eventId, inviteeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkin = yield this.inviteRepository.createCheckin(eventId, inviteeId);
            if (!checkin) {
                throw new Error("Check-in failed.");
            }
            return checkin;
        });
    }
    createCheckOut(eventId, inviteeId, gift) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkout = yield this.inviteRepository.createCheckOut(eventId, inviteeId, gift);
            if (!checkout) {
                throw new Error("Check-out failed.");
            }
            return checkout;
        });
    }
}
exports.InviteService = InviteService;
