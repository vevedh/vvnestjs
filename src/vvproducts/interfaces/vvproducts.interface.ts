import { Document } from 'mongoose';

export interface IVvproduct extends Document {
    readonly nom:String,
readonly description:String,
readonly prix:Number,
readonly vendu:Boolean,
readonly reserver:Boolean,

}