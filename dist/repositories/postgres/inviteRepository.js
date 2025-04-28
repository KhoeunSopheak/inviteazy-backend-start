"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresInvitationRepository = void 0;
const utils_1 = require("./utils");
const enum_1 = require("../../utils/enum");
class PostgresInvitationRepository {
    constructor(pool) {
        this.pool = pool;
    }
    create(invitation) {
        return __awaiter(this, void 0, void 0, function* () {
            const { eventId, inviteeId, status, qrCode, isCheckIn, checkInAt, isCheckOut, checkOutAt, gift } = invitation;
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, `
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
   RETURNING *`, [eventId, inviteeId, status, qrCode, isCheckIn, checkInAt, isCheckOut, checkOutAt, gift]);
            return rows[0];
        });
    }
    findByEventIdAndUserId(eventId, inviteeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.pool.query(`
      SELECT * FROM invitations 
      WHERE event_id = $1 
      AND invitee_id = $2
      `, [eventId, inviteeId]);
            return result.rows[0] || null;
        });
    }
    findInvitationById(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, `
       SELECT invitee_id, status
       FROM invitations
       WHERE event_id = $1
      `, [eventId]);
            return rows;
        });
    }
    countStatusByEventId(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, `
        SELECT status, COUNT(*) as count
        FROM invitations
        WHERE event_id = $1
        GROUP BY status
      `, [eventId]);
            const result = {
                [enum_1.InvitationStatus.ACCEPT]: 0,
                [enum_1.InvitationStatus.MAYBE]: 0,
                [enum_1.InvitationStatus.NO]: 0,
                [enum_1.InvitationStatus.BUSY]: 0,
                [enum_1.InvitationStatus.PENDING]: 0,
            };
            for (const row of rows) {
                const status = row.status;
                result[status] = parseInt(row.count, 10);
            }
            return result;
        });
    }
    updateStatusById(eventId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, `
        UPDATE invitations
        SET status = $1
        WHERE event_id = $2
        RETURNING *
      `, [status, eventId]);
            return rows[0] || null;
        });
    }
    findUserInvitation() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, `
       SELECT *
       FROM invitations`);
            return rows;
        });
    }
    createCheckin(eventId, inviteeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, `
        UPDATE invitations
        SET is_check_in = true, check_in_at = NOW()
        WHERE event_id = $1 AND invitee_id = $2
        RETURNING *`, [eventId, inviteeId]);
            if (rows.length === 0) {
                throw new Error("No invitation found for the given eventId and inviteeId");
            }
            return rows[0];
        });
    }
    createCheckOut(eventId, inviteeId, gift) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield (0, utils_1.queryWithLogging)(this.pool, `
        UPDATE invitations
        SET is_check_out = true, check_in_at = NOW(),
        gift = $3
        WHERE event_id = $1 AND invitee_id = $2
        RETURNING *`, [eventId, inviteeId, gift]);
            if (rows.length === 0) {
                throw new Error("No invitation found for the given eventId and inviteeId");
            }
            return rows[0];
        });
    }
}
exports.PostgresInvitationRepository = PostgresInvitationRepository;
