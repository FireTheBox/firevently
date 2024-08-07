import { Model, model, models, Schema } from "mongoose";

import { IEvent } from "./event.definition";

export type EventModel = Model<IEvent>;

const EventSchema = new Schema(
  {
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    reward: { type: Number, default: 0.0 },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    registrationLink: { type: String, required: true },
    registrationFee: { type: Number, default: 0.0 },
    communityInvitation: { type: String },
    isFeatured: { type: Boolean, default: false },

    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    organizer: { type: Schema.Types.ObjectId, ref: 'Organizer' },
    codaPages: [{ type: Schema.Types.ObjectId, ref: 'CodaPage' }],
  },
  {
    timestamps: true, // assigns createdAt and updatedAt fields
  }
);

const Event: EventModel = models.Event || model<IEvent, EventModel>('Event', EventSchema)

export default Event;