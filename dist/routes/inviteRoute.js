"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = inviteRoutes;
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
function inviteRoutes(controller) {
    const router = (0, express_1.Router)();
    router.post("/:eventId/invite", authMiddleware_1.authMiddleware, validationMiddleware_1.validateInviteBody, controller.createInvite.bind(controller));
    router.get("/invitations", authMiddleware_1.authMiddleware, controller.getUserInvitaion.bind(controller));
    router.get("/:eventId/invitees", authMiddleware_1.authMiddleware, controller.getInvitationById.bind(controller));
    router.patch("/:eventId/status", authMiddleware_1.authMiddleware, validationMiddleware_1.validateStatus, controller.updateStatusById.bind(controller));
    router.get("/:eventId/status-count", authMiddleware_1.authMiddleware, controller.countStatusByEventId.bind(controller));
    router.patch("/:eventId/:inviteeId/check-in", authMiddleware_1.authMiddleware, controller.createCheckin.bind(controller));
    router.patch("/:eventId/:inviteeId/check-out", authMiddleware_1.authMiddleware, controller.createCheckOut.bind(controller));
    return router;
}
