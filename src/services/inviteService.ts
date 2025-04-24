import {
  IInvitation,
  IInvitationRepository,
  IInvitationService,
} from "../interfaces/inviteInterface";
import { InvitationStatus } from "../utils/enum";

export class InviteService implements IInvitationService {
  private inviteRepository: IInvitationRepository;

  constructor(inviteRepository: IInvitationRepository) {
    this.inviteRepository = inviteRepository;
  }

  async createInvite(invite: Omit<IInvitation, "id">): Promise<IInvitation> {
    return await this.inviteRepository.create(invite);
  }

  async getByEventIdAndUserId(eventId: string, userId: string): Promise<IInvitation | null> {
    return this.inviteRepository.findByEventIdAndUserId(eventId, userId);
  }


  async getUserInvitations(): Promise<IInvitation[]> {
    return this.inviteRepository.findUserInvitation();
  }

  async getInvitationById(eventId: string) {
    const invitation = await this.inviteRepository.findInvitationById(eventId);
    if (!invitation) {
      throw Object.assign(new Error("Invitation not found"), { status: 404 });
    }
    return invitation;
  }

  async countStatusByEventId(eventId: string): Promise<Record<InvitationStatus, number>> {
    const countStatus = await this.inviteRepository.countStatusByEventId(eventId);
    if (!countStatus) {
      throw Object.assign(new Error("Invitees not found"), { status: 404 });
    }
    return countStatus;
  }

  async updateStatusById(id: string, status: IInvitation["status"]): Promise<IInvitation> {
    const updated = await this.inviteRepository.updateStatusById(id, status);
    if (!updated) {
      throw new Error("Invitation not found or status update failed.");
    }
    return updated;
  }

}







