import { NextFunction, Request, Response } from "express";
import redisCache from "../services/cacheService";
import { IInvitation, IInvitationService } from "../interfaces/inviteInterface";

export class InviteController {
  private inviteService: IInvitationService;

  constructor(inviteService: IInvitationService) {
    this.inviteService = inviteService;
  }

  async createInvite(req: Request, res: Response, next: NextFunction) {
    try {
      const {inviteeId, status, isCheckIn, checkInAt, isCheckOut, checkOutAt, gift}: Omit<IInvitation, "id" | "eventId" | "qrCode"> = req.body;
      const {eventId} = req.params;
      console.log("======>",eventId);
      const existingInvite = await this.inviteService.getByEventIdAndUserId(eventId, inviteeId);
      if (existingInvite) {
        res.status(409).json({
          message: "User is already invited to this event.",
        });
        return;
      }
      const qrCode = `https://e-invitation.com/qr/event=${eventId}/invitee=${inviteeId}`;
      const newInvites = await this.inviteService.createInvite({
        eventId,
        inviteeId,
        status,
        qrCode,
        isCheckIn,
        checkInAt,
        isCheckOut,
        checkOutAt,
        gift
      });
      res.status(201).json({
        message: "Invite was created.",
        data: newInvites,
      });
    } catch (err) {
      console.error("Create Invite Error:", err);
      next(err);
    }
  }
  
  async getUserInvitaion(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.inviteService.getUserInvitations();
      res.json({ message: "Get all users invited.", data: result });
      return;
    } catch (error) {
      next(error);
    }
  }

  async getInvitationById(req: Request, res: Response, next: NextFunction) {
    try {
      const cacheKey = `invitation:${req.method}:${req.originalUrl}`;
      const cacheData = await redisCache.get(cacheKey);
      if (cacheData) {
        res.json({
          message: "Cache: Get invitee by eventId",
          data: JSON.parse(cacheData),
        });
        return;
      }
      const { eventId } = req.params;
      console.log(eventId);
      const result = await this.inviteService.getInvitationById(eventId);
      if (result) {
        await redisCache.set(cacheKey, JSON.stringify(result), 360);
        res.json({ message: "Api: Get invitatee by eventId", data: result });
      } else {
        res.status(404).json({ message: "Invitee not found" });
      }
    } catch (error) {
      next(error);
    }
  }

  async countStatusByEventId(req: Request, res: Response, next: NextFunction) {
    try{
    const cacheKey = `invitation:${req.method}:${req.originalUrl}`;
      const cacheData = await redisCache.get(cacheKey);
      if (cacheData) {
        res.json({
          message: "Cache: Get invitee by eventId",
          data: JSON.parse(cacheData),
        });
        return;
      }
      const { eventId } = req.params;
      console.log(eventId);
      const result = await this.inviteService.countStatusByEventId(eventId);
      if (result) {
        await redisCache.set(cacheKey, JSON.stringify(result), 360);
        res.json({ message: "Api: Get total invitatees ", data: result });
      } else {
        res.status(404).json({ message: "Invitee not found" });
      }
    } catch (error) {
      next(error);
    }
  }
  
  async updateStatusById(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = req.params;
      const { status } = req.body;
      const updatedInvite = await this.inviteService.updateStatusById(eventId, status);
      if (!updatedInvite) {
        res.status(404).json({ message: "Invitation not found" });
      }
        res.json(updatedInvite);
        return; 
    } catch (error) {
      console.error("Error updating status:", error);
      next(error);
    }
  }

  async createCheckin(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId, inviteeId } = req.params;
      console.log("Event ID:", eventId);
      console.log("Invitee ID:", inviteeId);
      const checkin = await this.inviteService.createCheckin(eventId, inviteeId);
      res.json(checkin);
      return;
    } catch (error) {
      console.error("Error check-in:", error);
      next(error);
    }
  }

  async createCheckOut(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId, inviteeId } = req.params;
      const { gift } = req.body;
      console.log("Event ID:", eventId);
      console.log("Invitee ID:", inviteeId);
      const checkout = await this.inviteService.createCheckOut(eventId, inviteeId, gift);
      res.json(checkout);
      return;
    } catch (error) {
      console.error("Error check-out:", error);
      next(error);
    }
  }
}
