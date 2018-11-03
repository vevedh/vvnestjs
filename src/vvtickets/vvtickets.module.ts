import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VvticketsController } from './vvtickets.controller';
import { VvticketsService } from './vvtickets.service';
import { VvticketSchema } from './schemas/vvticket.schema';
@Module({
    imports: [MongooseModule.forFeature([{ name: 'Vvticket', schema: VvticketSchema }])],
    controllers: [VvticketsController],
    providers: [VvticketsService],
})
export class VvticketsModule {}