import { NextFunction, Request, Response } from "express";
import redisCache from "../services/cacheService";
import { IInvitation, IInvitationService } from "../interfaces/inviteInterface";

export class InviteController {
  private inviteService: IInvitationService;

  constructor(inviteService: IInvitationService) {
    this.inviteService = inviteService;
  }

  async getUserInvitations(req: Request, res: Response, next: NextFunction) {
    try {
      const cacheKey = `data:${req.method}:${req.originalUrl}`;

      const cacheData = await redisCache.get(cacheKey);
      if (cacheData) {
        res.json({
          message: "Cache: Get invitations by Id",
          data: JSON.parse(cacheData),
        });
        return;
      }

      const { id } = req.params;
      const result = await this.inviteService.getUserInvitations(id);

      await redisCache.set(cacheKey, JSON.stringify(result), 360);

      res.json({ message: "Api: Get invitations by Id", data: result });
    } catch (error) {
      next(error);
    }
  }

  async createInvite(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId, inviteeId}: {eventId: string, inviteeId: string[]}= req.body;
      const newInvite = await this.inviteService.createInvite(
        eventId,
        inviteeId,
      );
      res
        .status(201)
        .json({ message: "Invites were created.", data: newInvite });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
