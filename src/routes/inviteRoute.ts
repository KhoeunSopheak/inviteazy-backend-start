import { Router } from "express";
import { InviteController } from "../controllers/inviteController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  validateStatus,
  validateInviteBody
} from "../middlewares/validationMiddleware";


export default function inviteRoutes(controller: InviteController): Router {
  const router = Router();
  
  router.post("/events/:eventId",validateInviteBody, controller.createInvite.bind(controller));
  router.get("/invitations", controller.getUserInvitaion.bind(controller));
  router.get("/invitation/:eventId", controller.getInvitationById.bind(controller));
  router.get("/events/:eventId/status", controller.countStatusByEventId.bind(controller));
  router.patch("/invitations/:eventId",validateStatus, controller.updateStatusById.bind(controller));
  router.get("/events/:eventId/status", controller.countStatusByEventId.bind(controller));
  
  return router;
}
