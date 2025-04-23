import{
  IEvent,
  IEventRepository,
  IEventService
} from "../interfaces/eventInterface"

export class EventService implements IEventService {
  private eventRepository: IEventRepository;

  constructor(eventRepository: IEventRepository) {
    this.eventRepository = eventRepository;
  }
  async createEvent(event: Omit<IEvent, "id">): Promise<IEvent> {
    return await this.eventRepository.create(event);
  }
}
":"