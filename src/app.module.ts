import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ProductModule,
    OrderModule,
    UserModule,
    CategoryModule,

    MongooseModule.forRoot(
      'mongodb+srv://haroon:haroon@nest-mongo.rqf0v.mongodb.net/Nest-Mongo?retryWrites=true&w=majority',
    ),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
