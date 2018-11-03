import * as mongoose from 'mongoose';

export const VvproductSchema = new mongoose.Schema({
   nom:String,
description:String,
prix:Number,
vendu:Boolean,
reserver:Boolean,

});