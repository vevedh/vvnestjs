import * as mongoose from 'mongoose';

export const VvticketSchema = new mongoose.Schema({
   magasin: String,
 numero: Number,
 probleme: String,

});