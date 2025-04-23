import { Pool } from "pg";
import { IEvent } from "../../interfaces/eventInterface";
import { queryWithLogging } from "./utils";

export class PostgresEventRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async create(event: Omit<IEvent, "id">): Promise<IEvent> {
    const { rows } = await queryWithLogging(
      this.pool,
      `
        INSERT INTO public.events ( name, date, time, location, description,userid)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, name, date, time, location, description, userid
      `,
      [
        event.name,
        event.date,
        event.time,
        event.location,
        event.description,
        event.userId
      ]
    );

    return rows[0];
}
};
