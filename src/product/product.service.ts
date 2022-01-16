/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const category = new this.productModel(createProductDto);
    const newcategory = await category.save();

    return newcategory;
  }

  async createwithImage(file:any,createProductDto: CreateProductDto,request:any)
  {
    const imagePath= `${request.protocol}://${request.hostname}/files/`

    createProductDto.image=file.filename
    const newProduct={
         ...createProductDto,
         image: `${imagePath}${file.filename}`,
       }
  
       const newProductsave = new this.productModel(newProduct);
      const product = await newProductsave.save();

    return product;
  }

  async updateWithImage(file:any,id:any,updateProductDto: UpdateProductDto,request:any) {


    const product = await this.productModel.findById(id);

    console.log()
    let imagePath;
    if (file) {
      const fileName = file.filename;
      const basePath=`${request.protocol}://${request.hostname}:3000/files/`
      imagePath=`${basePath}${fileName}`;
    }
    else
    {
      imagePath=product.image
    }

    const post = await this.productModel
      .findByIdAndUpdate(id,{
        image:imagePath,
      })
      .setOptions({ new: true });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async updateWithImages(files:any,id:any,updateProductDto: UpdateProductDto,request:any) {

    const imagesPaths = [];
    const filesarr = files;
    const imagePath= `${request.protocol}://${request.hostname}/files/`


    if (filesarr) {
      filesarr.map((file) => {
          imagesPaths.push(`${imagePath}${file.filename}`);
        });
    }

    console.log(imagesPaths)
    const post = await this.productModel
      .findByIdAndUpdate(id,{
        images:imagesPaths,
      })
      .setOptions({ new: true });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }


  findAll() {
    return this.productModel.find();
  }

  async findOne(id: string) {
    console.log(id);
    const post = await this.productModel.findById(id);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const post = await this.productModel
      .findByIdAndUpdate(id, updateProductDto)
      .setOptions({ overwrite: true, new: true });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

 
  async remove(id: string) {
    const result = await this.productModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException();
    }
  }
}
