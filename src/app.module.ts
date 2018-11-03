import { Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ToolsService } from './tools/tools.service';
import { ToolsController } from './tools/tools.controller';
import { VvproductsModule } from "./vvproducts/vvproducts.module";
import { VvticketsModule } from "./vvtickets/vvtickets.module";

@Module({
                  imports: [
                    MongooseModule.forRoot('mongodb://localhost:27017/dbtodo'),
    TodosModule,
    UsersModule,VvticketsModule,VvproductsModule,
    AuthModule],
  controllers: [ToolsController],
  providers: [ToolsService],
})
export class AppModule {}
