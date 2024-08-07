import { Document } from 'mongoose';

export interface CodaPage extends Document {
    type: 'Detalhes' | 'Projetos' | 'Cronograma' | 'Participants';
    url: string;
    tableId?: string;
    event: string;
}
