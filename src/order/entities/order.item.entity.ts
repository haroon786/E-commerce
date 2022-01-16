/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from "mongoose";
import * as mongoose from 'mongoose';
import { Product } from "src/product/entities/product.entity";


@Schema({
    toJSON: {
      getters: true,
    },
})
export class OrderItem extends Document
{
    @Prop()
    quantity:string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    product:Product
}

export const OrderItemSchema=SchemaFactory.createForClass(OrderItem)
