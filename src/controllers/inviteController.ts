import { NextFunction, Request, Response } from "express";
import redisCache from "../services/cacheService";
import { IInvitation, IInvitationService } from "../interfaces/inviteInterface";
import { InvitationStatus } from "../utils/enum";

export class InviteController {
  private inviteService: IInvitationService;

  constructor(inviteService: IInvitationService) {
    this.inviteService = inviteService;
  }

  async createInvite(req: Request, res: Response, next: NextFunction) {
    try {
      const { inviteeId }: Omit<IInvitation, "id" | "eventId"> = req.body;
      const { eventId } = req.params;
  
      console.log("======>", eventId);
  
      const existingInvite = await this.inviteService.getByEventIdAndUserId(eventId, inviteeId);
      if (existingInvite) {
        res.status(409).json({
          message: "User is already invited to this event.",
        });
        return;
      }
  
      const newInvite = await this.inviteService.createInvite({
        eventId,
        inviteeId,
        status: InvitationStatus.PENDING,
        qrCode: `https://e-invitation.com/qr/event=${eventId}/invitee=${inviteeId}`,
        isCheckIn: false,
        checkInAt: null,
        isCheckOut: false,
        checkOutAt: null,
        gift: null,
      });
  
      res.status(201).json({
        message: "Invite was created",
        data: newInvite,
      });
    } catch (err) {
      console.error("Create Invite Error:", err);
      next(err);
    }
  }
  
  
  async getUserInvitaion(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.inviteService.getUserInvitations();
      res.json({ message: "Retrieve all Invitations", data: result });
      return;
    } catch (error) {
      next(error);
    }
  }

  async getInvitationById(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = req.params;
      console.log(eventId);
      const result = await this.inviteService.getInvitationById(eventId);
        res.json({ message: "Retrieve Invitees by Event ID", data: result });
    } catch (error) {
      next(error);
    }
  }

  async countStatusByEventId(req: Request, res: Response, next: NextFunction) {
    try{
      const { eventId } = req.params;
      console.log(eventId);
      const result = await this.inviteService.countStatusByEventId(eventId);
        res.json({ message: "Retrieve total Invitees", data: result });
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
      res.json({ message: "Update status successfully", data: updatedInvite });
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
      res.json({ message: "Check in successfully", data: checkin });
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
      res.json({ message: "Check out successfully", data: checkout });
      return;
    } catch (error) {
      console.error("Error check-out:", error);
      next(error);
    }
  }
}
