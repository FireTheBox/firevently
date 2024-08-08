import { Model, model, models, Schema } from "mongoose";

import { codaPageTypes } from "@/constants";

import { ICodaPage } from "./coda-page.definition";

export type CodaPageModel = Model<ICodaPage>;

const CodaPageSchema = new Schema({
    type: { type: String, enum: codaPageTypes, require: true },
    url: { type: String, require: true },
    tableId: { type: String },

    event: { type: Schema.Types.ObjectId, ref: "Event" }
})

const CodaPage: CodaPageModel = models.CodaPage || model<ICodaPage, CodaPageModel>('CodaPage', CodaPageSchema)

export default CodaPage;