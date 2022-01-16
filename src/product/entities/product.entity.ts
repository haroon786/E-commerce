import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import * as mongoose from 'mongoose';

@Schema({
  toJSON: {
    getters: true,
  },
})
export class Product extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  richDescription: string;

  @Prop()
  image: string;

  @Prop()
  images: string[];

  @Prop()
  brand: string;

  @Prop()
  price: string;

  @Prop()
  countInStock: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop()
  rating: number;

  @Prop()
  numReviews: number;

  @Prop()
  isFeatured: boolean;

  @Prop()
  dateCreated: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

