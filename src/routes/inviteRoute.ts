import { Router } from "express";
import { InviteController } from "../controllers/inviteController";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  validateIdInURLParam,
  validateUser,
} from "../middlewares/validationMiddleware";


export default function inviteRoutes(controller: InviteController): Router {
  const router = Router();

  router.get("/", authMiddleware, controller.getUserInvitations.bind(controller));
  router.get(
    "/:id",
    authMiddleware,
    validateIdInURLParam,
    controller.getUserInvitations.bind(controller)
  );
  router.post("/", controller.createInvite.bind(controller));

  return router;
}
