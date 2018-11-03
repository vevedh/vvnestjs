import { IVvticket } from './vvtickets.interface';

export interface IVvticketService {
    findAll(): Promise<IVvticket[]>;
    findById(ID: number): Promise<IVvticket | null>;
    findOne(options: object): Promise<IVvticket | null>;
    create(vvtickets: IVvticket): Promise<IVvticket>;
    update(ID: number, newValue: IVvticket): Promise<IVvticket | null>;
    delete(ID: number): Promise<string>;
}