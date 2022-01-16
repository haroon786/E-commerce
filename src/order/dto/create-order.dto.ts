/* eslint-disable prettier/prettier */
import { User } from "src/user/entities/user.entity"
import { OrderItem } from "../entities/order.item.entity"

export class CreateOrderDto {
    orderItems: OrderItem[]

    shippingAddress1:string

    shippingAddress2:string

    city:string

    zip:string

    country:string

    phone:string

    status:string

    totalPrice:string
   
    user:User

    dateOrdered:string
}
