import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VvproductsController } from './vvproducts.controller';
import { VvproductsService } from './vvproducts.service';
import { VvproductSchema } from './schemas/vvproduct.schema';
@Module({
    imports: [MongooseModule.forFeature([{ name: 'Vvproduct', schema: VvproductSchema }])],
    controllers: [VvproductsController],
    providers: [VvproductsService],
})
export class VvproductsModule {}