import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IVvticket,IVvticketsService } from './interfaces/index';
import { CreateVvticketDto } from './dto/createVvticket.dto';
import { debug } from 'console';

@Injectable()
export class VvticketsService implements IVvticketsService{
    constructor(@InjectModel('Vvticket') private readonly vvticketModel: Model<IVvticket>) { }

    async findAll(): Promise<IVvticket[]> {
        return await this.vvticketModel.find().exec();
    }

    async findOne(options: object): Promise<IVvticket> {
        return await this.vvticketModel.findOne(options).exec();
    }

    async findById(ID: number): Promise<IVvticket> {
        return await this.vvticketModel.findById(ID).exec();
    }
    async create(createVvticketDto: CreateVvticketDto): Promise<IVvticket> {
        const createdVvticket = new this.vvticketModel(createVvticketDto);
        return await createdVvticket.save();
    }

    async update(ID: number, newValue: IVvticket): Promise<IVvticket> {
        const vvticket = await this.vvticketModel.findById(ID).exec();

        if (!vvticket._id) {
            debug('vvticket not found');
        }

        await this.vvticketModel.findByIdAndUpdate(ID, newValue).exec();
        return await this.vvticketModel.findById(ID).exec();
    }
    async delete(ID: number): Promise<string> {
        try {
            await this.vvticketModel.findByIdAndRemove(ID).exec();
            return 'The vvticket has been deleted';
        }
        catch (err){
            debug(err);
            return 'The vvticket could not be deleted';
        }
    }
}
