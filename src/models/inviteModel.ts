import mongoose, { Schema, Document } from "mongoose";


export interface IInvitation extends Document {
  eventId: string;
  inviteeId: string;
  status: "accept" | "maybe" | "no" | "busy";
  createdAt: Date;
}

const InvitationSchema: Schema = new Schema<IInvitation>(
  {
    eventId: {type: String, required: true,},
    inviteeId: {type: String, required: true,},
    status: {type: String, required: true, default: "maybe",},
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const InvitationModel = mongoose.model<IInvitation>("Invitation", InvitationSchema);

