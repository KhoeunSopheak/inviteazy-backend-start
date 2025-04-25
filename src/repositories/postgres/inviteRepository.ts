import { Pool } from "pg";
import { IInvitation, IInvitationRepository } from "../../interfaces/inviteInterface";
import { queryWithLogging } from "./utils";
import { InvitationStatus } from "../../utils/enum";

export class PostgresInvitationRepository implements IInvitationRepository {
  constructor(private pool: Pool) { }

  async create(invitation: Omit<IInvitation, "id">): Promise<IInvitation> {
    const { eventId, inviteeId, status, qrCode, isCheckIn, checkInAt, isCheckOut, checkOutAt, gift } = invitation;
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
      is_check_out,
      check_out_at,
      gift
   )
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
   RETURNING *`,
      [eventId, inviteeId, status, qrCode, isCheckIn, checkInAt, isCheckOut, checkOutAt, gift]
    );
    return rows[0];
  }

  async findByEventIdAndUserId(eventId: string, inviteeId: string): Promise<IInvitation | null> {
    const result = await this.pool.query(
      `
      SELECT * FROM invitations 
      WHERE event_id = $1 
      AND invitee_id = $2
      `,
      [eventId, inviteeId]
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
  

  async updateStatusById(eventId: string, status: IInvitation["status"]): Promise<IInvitation> {
    const { rows } = await queryWithLogging(
      this.pool,
      `
        UPDATE invitations
        SET status = $1
        WHERE id = $2
        RETURNING *
      `,
      [status, eventId]
    );
    return rows[0] || null;
  }

  async findUserInvitation(): Promise<IInvitation[]> {
    const { rows } = await queryWithLogging(
      this.pool,
      `
       SELECT *
       FROM invitations`
    );
    return rows;
  }
}
