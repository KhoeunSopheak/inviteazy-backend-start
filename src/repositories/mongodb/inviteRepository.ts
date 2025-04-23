// import { IInvitation, IInvitationRepository } from "../../interfaces/inviteInterface";
// import { InvitationModel } from "../../models/inviteModel";
// import { mongoQueryWithLogging } from "../mongodb/utils";

// export class MongoInvitationRepository implements IInvitationRepository {
//   async create(invitation: Omit<IInvitation, "id">): Promise<IInvitation> {
//     const newInvite = new InvitationModel({
//         eventId: invitation.eventId,
//         userId: invitation.userId,
//         status: invitation.status,
//         qrCode: invitation.qrCode,
//         isCheckIn: invitation.isCheckIn,
//         checkInAt: invitation.checkInAt
//     });
//     newInvite.save();
//     return newInvite;

//   }
// };