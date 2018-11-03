import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IVvproduct,IVvproductsService } from './interfaces/index';
import { CreateVvproductDto } from './dto/createVvproduct.dto';
import { debug } from 'console';

@Injectable()
export class VvproductsService implements IVvproductsService{
    constructor(@InjectModel('Vvproduct') private readonly vvproductModel: Model<IVvproduct>) { }

    async findAll(): Promise<IVvproduct[]> {
        return await this.vvproductModel.find().exec();
    }

    async findOne(options: object): Promise<IVvproduct> {
        return await this.vvproductModel.findOne(options).exec();
    }

    async findById(ID: number): Promise<IVvproduct> {
        return await this.vvproductModel.findById(ID).exec();
    }
    async create(createVvproductDto: CreateVvproductDto): Promise<IVvproduct> {
        const createdVvproduct = new this.vvproductModel(createVvproductDto);
        return await createdVvproduct.save();
    }

    async update(ID: number, newValue: IVvproduct): Promise<IVvproduct> {
        const vvproduct = await this.vvproductModel.findById(ID).exec();

        if (!vvproduct._id) {
            debug('vvproduct not found');
        }

        await this.vvproductModel.findByIdAndUpdate(ID, newValue).exec();
        return await this.vvproductModel.findById(ID).exec();
    }
    async delete(ID: number): Promise<string> {
        try {
            await this.vvproductModel.findByIdAndRemove(ID).exec();
            return 'The vvproduct has been deleted';
        }
        catch (err){
            debug(err);
            return 'The vvproduct could not be deleted';
        }
    }
}
