import mongoose, { Schema, Document } from "mongoose";

export interface Event extends Document {
  userId: string;
  name: string;
  date: Date;
  time: Date;
  location: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
}, {
  timestamps: true, // ✅ Enable createdAt and updatedAt
});

export const EventModel = mongoose.model<Event>("Event", eventSchema);
