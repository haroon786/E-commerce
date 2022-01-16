/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Date, Document} from "mongoose";
import { OrderItem } from "./order.item.entity";
import * as mongoose from 'mongoose';
import { User } from "src/user/entities/user.entity";


@Schema({
    toJSON: {
      getters: true,
    },
})
export class Order  extends Document{

    @Prop([{type: mongoose.Schema.Types.ObjectId ,ref: 'OrderItem'}])
    orderItems: OrderItem

    @Prop()
    shippingAddress1:string

    @Prop()
    shippingAddress2:string

    @Prop()
    city:string

    @Prop()
    zip:string

    @Prop()
    country:string

    @Prop()
    phone:string

    @Prop()
    status:string

    @Prop()
    totalPrice:string
   
    @Prop({type: mongoose.Schema.Types.ObjectId ,ref: 'User'})
    user:User

    @Prop({ type: Date})
    dateOrdered:Date
}

export const OrderSchema=SchemaFactory.createForClass(Order)

