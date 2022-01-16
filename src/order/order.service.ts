/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { async } from 'rxjs';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order.item.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(OrderItem.name)
    private readonly orderItemModel: Model<OrderItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const orderItems = Promise.all(
      createOrderDto.orderItems.map(async (orderitem) => {
        const newOrderItem = new this.orderItemModel(
          {
            quantity:orderitem.quantity,
            product:orderitem.product
          }
        );
        console.log(newOrderItem)
        const newOrderItems = await newOrderItem.save();

        return newOrderItems._id;
      }),
    );
    const resolvedId = await orderItems;
    const totalPrices = await Promise.all(resolvedId.map(async (orderItemId)=>{
      console.log(orderItemId+"product id's")

      const orderItem:any = await this.orderItemModel.findById(orderItemId).populate('product', 'price');
      console.log(orderItem)
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice
  }))

  const totalPrice = totalPrices.reduce((a,b) => a +b , 0);

    console.log(resolvedId);

    const order = new this.orderModel({
      ...createOrderDto,
      orderItems: resolvedId,
      totalPrice:totalPrice
    });

    const saveOrder = await order.save();

    return saveOrder;
  }

  findAll() {
    return this.orderModel.find().populate('user')
  }

  async findOne(id: string) {
    console.log(id);
    const order = await this.orderModel.findById(id).populate('user')
    .populate({
      path:'orderItems',populate:
    {
      path:'product',populate:'category'
    }
    });
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }

 async getTotalSales()
  {
    const totalSales= await this.orderModel.aggregate([
      { $group: { _id: null , totalsales : { $sum : '$totalPrice'}}}
        ]) 
        if (!totalSales) {
          throw new NotFoundException();
        }
        return totalSales;

  }
  async totCount()
  {
    const orderCount = await this.orderModel.countDocuments((count) => count)
    if (!orderCount) {
      throw new NotFoundException();
    }
    return orderCount;
  }

  async update(id: string, createOrderDto: CreateOrderDto) {
    const post = await this.orderModel
      .findByIdAndUpdate(id,{
        status:createOrderDto.status,
      })
      .setOptions({ new: true });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async remove(id: string) {
     await this.orderModel.findByIdAndDelete(id).then(async (order:any) =>{
      if(order) {
        await order.orderItems.map(async orderItem => {
              await this.orderItemModel.findByIdAndDelete(orderItem)
          })
        }
    if (!order) {
      throw new NotFoundException();
    }
    return order;

  })
}
}
