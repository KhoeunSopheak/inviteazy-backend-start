import { InvitationStatus } from "../utils/enum";

export interface IInvitation {
  id: string;
  eventId: string;
  inviteeId: string;
  status: InvitationStatus;
  qrCode: string;
  isCheckIn: boolean;
  checkInAt: Date | null;
  gift: string | null;
  
}

export interface IInvitationRepository {
  create(invitation: Omit<IInvitation, "id">): Promise<IInvitation>;
  findByEventIdAndUserId(eventId: string, inviteeId: string): Promise<IInvitation | null>;
  updateStatusById(id: string, status: IInvitation["status"]): Promise<IInvitation>;
  findUserInvitation(): Promise<IInvitation[]>;
  findInvitationById(eventId: string): Promise<IInvitation[]>;
  countStatusByEventId(eventId: string): Promise<Record<InvitationStatus, number>>;
  createCheckin(eventId: string, inviteeId: string): Promise<IInvitation>;
}

export interface IInvitationService {
  createInvite(invitation: Omit<IInvitation, "id">): Promise<IInvitation>;
  getByEventIdAndUserId(eventId: string, inviteeId: string): Promise<IInvitation | null>;
  updateStatusById(id: string, status: IInvitation["status"]): Promise<IInvitation>;
  getUserInvitations(): Promise<IInvitation[]>;
  getInvitationById(eventId: string): Promise<IInvitation[]>;
  countStatusByEventId(eventId: string): Promise<Record<InvitationStatus, number>>;
  createCheckin(eventId: string, inviteeId: string): Promise<IInvitation>;
}
