import { UUID } from "crypto";
import mongoose, { Schema, Document } from "mongoose";

export interface IInvitation extends Document {
  eventId: string;
  userId: string;
  status: "pending" | "accept" | "maybe" | "no" | "busy";
  qrCode: string;
  isCheckIn: boolean;
  checkInAt: Date | null;
  createdAt: Date;
}

const InvitationSchema: Schema = new Schema<IInvitation>(
  {
    eventId: { type: String, required: true },
    userId: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accept", "maybe", "no", "busy"],
      default: "pending",
      required: true,
    },
    qrCode: { type: String, required: true },
    isCheckIn: { type: Boolean, required: true, default: false },
    checkInAt: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: true},
  }
);

export const InvitationModel = mongoose.model<IInvitation>("Invitation", InvitationSchema);
