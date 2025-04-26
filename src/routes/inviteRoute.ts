import { Router } from "express";
import { InviteController } from "../controllers/inviteController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  validateStatus,
  validateInviteBody
} from "../middlewares/validationMiddleware";


export default function inviteRoutes(controller: InviteController): Router {
  const router = Router();
  
  router.post("/events/:eventId", authMiddleware, validateInviteBody, controller.createInvite.bind(controller));
  router.get("/invitations", authMiddleware, controller.getUserInvitaion.bind(controller));
  router.get("/invitation/:eventId", authMiddleware, controller.getInvitationById.bind(controller));
  router.patch("/invitations/:id", authMiddleware, validateStatus, controller.updateStatusById.bind(controller));
  router.patch("/invitations/:eventId", authMiddleware, validateStatus, controller.updateStatusById.bind(controller));
  router.get("/events/:eventId/status", authMiddleware, controller.countStatusByEventId.bind(controller));
  router.patch("/checkin/:eventId/:inviteeId", authMiddleware, controller.createCheckin.bind(controller));
  router.patch("/checkout/:eventId/:inviteeId", authMiddleware, controller.createCheckOut.bind(controller));

  return router;
}
