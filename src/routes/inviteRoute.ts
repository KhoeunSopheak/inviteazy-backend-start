import { Router } from "express";
import { InviteController } from "../controllers/inviteController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  validateStatus,
  validateInviteBody
} from "../middlewares/validationMiddleware";


export default function inviteRoutes(controller: InviteController): Router {
  const router = Router();
  
  router.post("/:eventId/invite", authMiddleware, validateInviteBody, controller.createInvite.bind(controller));
  router.get("/invitations", authMiddleware, controller.getUserInvitaion.bind(controller));
  router.get("/:eventId/invitees", authMiddleware, controller.getInvitationById.bind(controller));
  router.patch("/:eventId/status", authMiddleware, validateStatus, controller.updateStatusById.bind(controller));
  router.get("/:eventId/status-count", authMiddleware, controller.countStatusByEventId.bind(controller));
  router.patch("/:eventId/:inviteeId/check-in", authMiddleware, controller.createCheckin.bind(controller));
  router.patch("/:eventId/:inviteeId/check-out", authMiddleware, controller.createCheckOut.bind(controller));

  return router;
}
