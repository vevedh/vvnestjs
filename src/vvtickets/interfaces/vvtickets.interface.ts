import { Document } from 'mongoose';

export interface IVvticket extends Document {
    readonly magasin: String,
readonly  numero: Number,
readonly  probleme: String,

}