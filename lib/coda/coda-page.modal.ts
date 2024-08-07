import { model, models, Schema } from "mongoose";

const CodaPageSchema = new Schema({
    type: { type: String, enum: ["Detalhes", "Projetos", "Cronograma", "Participants"], require: true },
    url: { type: String, require: true },
    tableId: { type: String },

    event: { type: Schema.Types.ObjectId, ref: "Event" }
})

const CodaPage = models.CodaPage || model('CodaPage', CodaPageSchema);

export default CodaPage;