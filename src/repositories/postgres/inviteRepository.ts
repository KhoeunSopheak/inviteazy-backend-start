import { Pool } from "pg";
import { IInvitation, IInvitationRepository } from "../../interfaces/inviteInterface";
import { queryWithLogging } from "./utils";
import { InvitationStatus } from "../../utils/enum";

export class PostgresInvitationRepository implements IInvitationRepository {
  constructor(private pool: Pool) { }
  async create(invitation: Omit<IInvitation, "id">): Promise<IInvitation> {
    const { eventId, inviteeId, status, qrCode, isCheckIn, checkInAt, gift } = invitation;
    const { rows } = await queryWithLogging(
      this.pool,
      `
      INSERT INTO invitations (
      event_id,
      invitee_id,
      status,
      qr_code,
      is_check_in,
      check_in_at,
      gift
   )
   VALUES ($1, $2, $3, $4, $5, $6, $7)
   RETURNING id, event_id, invitee_id, status, qr_code, is_check_in, check_in_at, gift, created_at`,
      [eventId, inviteeId, status, qrCode, isCheckIn, checkInAt, gift]
    );
    return rows[0];
  }

  async findByEventIdAndUserId(eventId: string, userId: string): Promise<IInvitation | null> {
    const result = await this.pool.query(
      `
      SELECT * FROM invitations 
      WHERE event_id = $1 
      AND invitee_id = $2
      `,
      [eventId, userId]
    );
    return result.rows[0] || null;
  }

  async findInvitationById(eventId: string): Promise<IInvitation[]> {
    const { rows } = await queryWithLogging(
      this.pool,
      `
       SELECT invitee_id, status
       FROM invitations
       WHERE event_id = $1
      `,
      [eventId]
    );
    return rows;
  }

  async countStatusByEventId(eventId: string): Promise<Record<InvitationStatus, number>> {
    const { rows } = await queryWithLogging(
      this.pool,
      `
        SELECT status, COUNT(*) as count
        FROM invitations
        WHERE event_id = $1
        GROUP BY status
      `,
      [eventId]
    );
    const result: Record<InvitationStatus, number> = {
      [InvitationStatus.ACCEPT]: 0,
      [InvitationStatus.MAYBE]: 0,
      [InvitationStatus.NO]: 0,
      [InvitationStatus.BUSY]: 0,
    };
    for (const row of rows) {
      const status = row.status as InvitationStatus;
      result[status] = parseInt(row.count, 10);
    }
  
    return result;
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
      `
       SELECT id, event_id, invitee_id, status, qr_code, is_check_in, check_in_at, gift, created_at
       FROM invitations`
    );
    return rows;
  }

  async createCheckin(eventId: string, inviteeId: string): Promise<IInvitation> {
    const { rows } = await queryWithLogging(
      this.pool,
      `
        UPDATE invitations
        SET is_check_in = true, check_in_at = NOW()
        WHERE event_id = $1 AND invitee_id = $2
        RETURNING *`,
      [eventId, inviteeId]
    );
    if (rows.length === 0) {
      throw new Error("No invitation found for the given eventId and inviteeId");
    }
    return rows[0];
  }
}
