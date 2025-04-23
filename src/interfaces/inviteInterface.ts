export interface IInvitation {
  id: string;
  eventId: string;
  userId: string;
  status: "accept" | "maybe" | "no" | "busy";
  qrCode: string;
  isCheckIn: boolean;
  checkInAt: Date | null;
}

export interface IInvitationRepository {
  create(invitation: Omit<IInvitation, "id">): Promise<IInvitation>;
  findByEventIdAndUserId(eventId: string, userId: string): Promise<IInvitation | null>;
  updateStatusById(id: string, status: IInvitation["status"]): Promise<IInvitation>;
  findUserInvitation(): Promise<IInvitation[]>;
  findInvitationById(eventId: string): Promise<IInvitation | null>;
}

export interface IInvitationService {
  createInvite(invitation: Omit<IInvitation, "id">): Promise<IInvitation>;
  getByEventIdAndUserId(eventId: string, userId: string): Promise<IInvitation | null>;
  updateStatusById(id: string, status: IInvitation["status"]): Promise<IInvitation>;
  getUserInvitations(): Promise<IInvitation[]>;
  getInvitationById(eventId: string): Promise<IInvitation | null>;
}
