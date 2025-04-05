import { Pool } from "pg";
import { IInvitation, IInvitationRepository } from "../../interfaces/inviteInterface";
import { queryWithLogging } from "./utils";

export class PostgresInvitationRepository implements IInvitationRepository {
  constructor(private pool: Pool) {}

  async create(invitation: Omit<IInvitation, "id">): Promise<IInvitation> {
    const { eventId, inviteeId, status } = invitation;
    const { rows } = await queryWithLogging(
      this.pool,
      `INSERT INTO invitations (event_id, invitee_id, status)
       VALUES ($1, $2, $3)
       RETURNING id, event_id AS "eventId", invitee_id AS "inviteeId", status, created_at AS "createdAt"`,
      [eventId, inviteeId, status]
    );
    return rows[0];
  }

  async Status(
    inviteeId: string,
    eventId: string,
    status: IInvitation["status"]
  ): Promise<IInvitation | null> {
    const { rows } = await queryWithLogging(
      this.pool,
      `UPDATE invitations
       SET status = $1
       WHERE invitee_id = $2 AND event_id = $3
       RETURNING id, event_id AS "eventId", invitee_id AS "inviteeId", status, created_at AS "createdAt"`,
      [status, inviteeId, eventId]
    );
    return rows[0] || null;
  }

  async findByInviteeId(inviteeId: string): Promise<IInvitation[]> {
    const { rows } = await queryWithLogging(
      this.pool,
      `SELECT id, event_id AS "eventId", invitee_id AS "inviteeId", status, created_at AS "createdAt"
       FROM invitations
       WHERE invitee_id = $1`,
      [inviteeId]
    );
    return rows;
  }
}
