import {
    IInvitation,
    IInvitationRepository,
    IInvitationService,
  } from "../interfaces/inviteInterface";
  
  export class InviteService implements IInvitationService {
    constructor(private inviteRepository: IInvitationRepository) {}
  
    async createInvite(eventId: string, inviteeIds: string[]): Promise<IInvitation[]> {
      const createdInvites: IInvitation[] = [];
  
      for (const inviteeId of inviteeIds) {
        const invite = await this.inviteRepository.create({
          eventId,
          inviteeId,
          status: "maybe",
        });
        createdInvites.push(invite);
      }
  
      return createdInvites;
    }
  
    async statusInvitation(
      eventId: string,
      inviteeId: string,
      status: IInvitation["status"]
    ): Promise<IInvitation> {
      const updated = await this.inviteRepository.Status(inviteeId, eventId, status);
      if (!updated) throw new Error("Invitation not found.");
      return updated;
    }
  
    async getUserInvitations(inviteeId: string): Promise<IInvitation[]> {
      return this.inviteRepository.findByInviteeId(inviteeId);
    }
  }
  
  