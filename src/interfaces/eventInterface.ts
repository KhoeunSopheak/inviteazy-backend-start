export interface IEvent {
  id: string;
  userId: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface IEventRepository {
  create(event: Omit<IEvent, "id">): Promise<IEvent>;
}
export interface IEventService {
  createEvent(event: Omit<IEvent, "id">): Promise<IEvent>;
}