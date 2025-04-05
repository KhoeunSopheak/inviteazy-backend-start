export interface IInvitation {
    id?: string;
    eventId: string;
    inviteeId: string;
    status: "accept" | "maybe" | "no" | "busy";
  }
  
  export interface IInvitationRepository {
    create(invitation: Omit<IInvitation, "id">): Promise<IInvitation>;
    Status(
      inviteeId: string,
      eventId: string,
      status: IInvitation["status"]
    ): Promise<IInvitation | null>;
    findByInviteeId(inviteeId: string): Promise<IInvitation[]>;
  }
  
  export interface IInvitationService {
    createInvite(eventId: string, inviteeId: string[]): Promise<IInvitation[]>;
    statusInvitation(
      eventId: string,
      inviteeId: string,
      status: IInvitation["status"]
    ): Promise<IInvitation>;
    getUserInvitations(inviteeId: string): Promise<IInvitation[]>;
  }
  