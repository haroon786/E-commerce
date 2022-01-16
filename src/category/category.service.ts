/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(@InjectModel(Category.name) private readonly categoryModel:Model<Category>)
  {

  }
  create(createCategoryDto: CreateCategoryDto) {
    console.log(createCategoryDto)
    const category=new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async findAll() {
    return this.categoryModel.find();
  }

  async findOne(id: string) {
    console.log(id);
    const post = await this.categoryModel.findById(id);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }




  // Thanks to using the new: true parameter, the findByIdAndUpdate method returns an updated version of our entity.
  // By using overwrite: true, we indicate that we want to replace a whole document instead of performing a partial update. 
  // This is what differentiates the PUT and PATCH HTTP methods.


  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const post = await this.categoryModel
    .findByIdAndUpdate(id, updateCategoryDto)
    .setOptions({ overwrite: true, new: true });
  if (!post) {
    throw new NotFoundException();
  }
  return post;  }

  async remove(id: string) {
     const result = await this.categoryModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException();
    }
  }
}
