import { Model, model, models, Schema } from "mongoose";

import { IOrganizer } from "./organizer.definition";

export type OrganizerModel = Model<IOrganizer>;

const OrganizerSchema = new Schema<IOrganizer, OrganizerModel>({
    name: { type: String, require: true },
    logo: { type: String, require: true },
    email: { type: String, required: true },
    contact: { type: String, require: true },

    events: [{ type: Schema.Types.ObjectId, ref: "Event" }]
})

const Organizer: OrganizerModel = models.Organizer || model<IOrganizer, OrganizerModel>('Organizer', OrganizerSchema)

export default Organizer;
