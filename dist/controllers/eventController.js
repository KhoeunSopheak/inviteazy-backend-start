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
exports.EventController = void 0;
class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    createEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user || !req.user.id) {
                    res.status(401).json({ error: 'Unauthorized: No user ID found' });
                    return;
                }
                const userId = req.user.id;
                console.log('User ID:', userId); // Debugging line to check user ID
                // Cast req.body to the expected shape
                const { name, date, time, location, description } = req.body;
                // const eventData: Omit<IEvent, 'id'> = {
                //   ...body,
                //   userId, // This must match the column name in your database
                // };
                const newEvent = yield this.eventService.createEvent({
                    name,
                    date,
                    time,
                    location,
                    description,
                    userId: userId, // This must match the column name in your database 
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                });
                res.status(201).json(newEvent);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'An unknown error occurred' });
                }
            }
        });
    }
}
exports.EventController = EventController;
