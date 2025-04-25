import mongoose, { Schema, Document } from "mongoose";

export interface IInvitation extends Document {
  eventId: string;
  inviteeId: string;
  status: "pending" | "accept" | "maybe" | "no" | "busy";
  qrCode: string;
  isCheckIn: boolean;
  checkInAt: Date | null;
  isCheckOut: boolean;
  checkOutAt: Date | null;
  gift: string | null;
  createdAt: Date;
}

const InvitationSchema: Schema = new Schema<IInvitation>(
  {
    eventId: { type: String, required: true },
    inviteeId: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accept", "maybe", "no", "busy"],
      default: "pending",
      required: true,
    },
    qrCode: { type: String, required: true },
    isCheckIn: { type: Boolean, required: true, default: false },
    checkInAt: { type: Date, default: null },
    isCheckOut: { type: Boolean, required: true, default: false },
    checkOutAt: { type: Date, default: null },
    gift: { type: String, default: null },
  },
  {
    timestamps: { createdAt: true},
  }
);

export const InvitationModel = mongoose.model<IInvitation>("Invitation", InvitationSchema);
