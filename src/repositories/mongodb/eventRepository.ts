import { EventModel } from "../../models/eventModel";
import { IEvent, IEventRepository } from "../../interfaces/eventInterface";

export class MongoEventRepository implements IEventRepository {
  async create(event: Omit<IEvent, "id" | "createdAt" | "updatedAt">): Promise<IEvent> {
    const newEvent = new EventModel({
      userId: event.userId,
      name: event.name,
      date: new Date(event.date),
      time: new Date(event.date),
      location: event.location,
      description: event.description,
    });

    const savedEvent = await newEvent.save();

    return {
      id: (savedEvent._id as unknown as string).toString(), // 👈 safely cast
      userId: savedEvent.userId,
      name: savedEvent.name,
      date: savedEvent.date.toISOString(),
      time: savedEvent.date.toISOString(),
      location: savedEvent.location,
      description: savedEvent.description,
      createdAt: savedEvent.createdAt?.toISOString() ?? new Date().toISOString(),
      updatedAt: savedEvent.updatedAt?.toISOString() ?? new Date().toISOString(),
    };
    
  }
}
