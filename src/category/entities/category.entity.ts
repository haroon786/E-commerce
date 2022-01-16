/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from "mongoose";



@Schema({
  toJSON: {
    getters: true,
  },
})
export class Category extends Document {

 

    @Prop()
    name:string;

    @Prop()
    icon:string;

    @Prop()
    color:string;

   
}

export const CategorySchema=SchemaFactory.createForClass(Category)
