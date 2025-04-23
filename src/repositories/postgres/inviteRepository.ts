import { Pool } from "pg";
import { IInvitation, IInvitationRepository } from "../../interfaces/inviteInterface";
import { queryWithLogging } from "./utils";

export class PostgresInvitationRepository implements IInvitationRepository {
  constructor(private pool: Pool) { }

  async create(invitation: Omit<IInvitation, "id">): Promise<IInvitation> {
    const { eventId, userId, status, qrCode, isCheckIn, checkInAt } = invitation;
    const { rows } = await queryWithLogging(
      this.pool,
      `INSERT INTO invitations (
     event_id,
     user_id,
     status,
     qr_code,
     is_check_in,
     check_in_at
   )
   VALUES ($1, $2, $3, $4, $5, $6)
   RETURNING id, event_id, user_id, status, qr_code, is_check_in, check_in_at, created_at`,
      [eventId, userId, status, qrCode, isCheckIn, checkInAt]
    );
    return rows[0];
  }

  async findByEventIdAndUserId(eventId: string, userId: string): Promise<IInvitation | null> {
    const result = await this.pool.query(
      `SELECT * FROM invitations WHERE event_id = $1 AND user_id = $2`,
      [eventId, userId]
    );
    return result.rows[0] || null;
  }

  async findInvitationById(eventId: string): Promise<IInvitation | null> {
    const { rows } = await queryWithLogging(
      this.pool,
      `SELECT user_id, status
       FROM invitations
       WHERE event_id = $1`,
      [eventId]
    );
    return rows[0] || null;
  }

  async updateStatusById(id: string, status: IInvitation["status"]): Promise<IInvitation> {
    const { rows } = await queryWithLogging(
      this.pool,
      `
        UPDATE invitations
        SET status = $1
        WHERE id = $2
        RETURNING *
      `,
      [status, id]
    );
    return rows[0] || null;
  }

  async findUserInvitation(): Promise<IInvitation[]> {
    const { rows } = await queryWithLogging(
      this.pool,
      `SELECT id, event_id, user_id, status, qr_code, is_check_in, check_in_at, created_at
       FROM invitations`
    );
    return rows;
  }
}
