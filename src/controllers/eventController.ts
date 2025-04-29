import { Request, Response } from 'express';
import { IEvent, IEventService } from '../interfaces/eventInterface';

interface AuthRequest extends Request {
  user?: { id: string }; // assuming user ID is a string
}

export class EventController {
  private eventService: IEventService;

  constructor(eventService: IEventService) {
    this.eventService = eventService;
  }

  async createEvent(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ error: 'Unauthorized: No user ID found' });
        return;
      }

      const userId = req.user.id;
      console.log('User ID:', userId); // Debugging line to check user ID

      // Cast req.body to the expected shape
      const {name,date,time,location,description}: Omit<IEvent, 'id' | 'createdAt' | 'updatedAt'> = req.body;

      // const eventData: Omit<IEvent, 'id'> = {
      //   ...body,
      //   userId, // This must match the column name in your database
      // };
      
      const newEvent = await this.eventService.createEvent({
        name,
        date,
        time,
        location,
        description,
        userId: userId, // This must match the column name in your database 
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      res.status(201).json({ message: "Event was created", data: newEvent });
      return;
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred' });
      }
    }
  }
}
