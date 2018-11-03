import { IVvproduct } from './vvproducts.interface';

export interface IVvproductService {
    findAll(): Promise<IVvproduct[]>;
    findById(ID: number): Promise<IVvproduct | null>;
    findOne(options: object): Promise<IVvproduct | null>;
    create(vvproducts: IVvproduct): Promise<IVvproduct>;
    update(ID: number, newValue: IVvproduct): Promise<IVvproduct | null>;
    delete(ID: number): Promise<string>;
}