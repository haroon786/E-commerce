/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto,"aeffsfsf");

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const createdUser = new this.userModel({
      ...createUserDto,
      passwordHash: hashedPassword,
    });
    return createdUser.save();
  }
  async login(email:string,password:string)
{
  console.log(email)

  const userExist = await this.userModel.findOne({email:email});
  if(userExist && bcrypt.compareSync(password,userExist.passwordHash))
  {
    console.log(userExist)

    return userExist
  }
  else
  {
    throw new UnauthorizedException();
  }
}
  findAll() {
    return this.userModel.find();
  }

  UserCount()
  {
    const userCount = this.userModel.countDocuments((count) => count)

    if(!userCount) {
      throw new NotFoundException();

    } 
      return  userCount

  }

  async findOne(id: string) {
    console.log(id);
    const post = await this.userModel.findById(id).select('-passwordHash');
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userExist = await this.userModel.findById(id);
    let newPassword;
    if (updateUserDto.password) {
      newPassword = await bcrypt.hash(updateUserDto.password, 10);
    } else 
    {
      newPassword=userExist.passwordHash;
    }

    const post = await this.userModel
      .findByIdAndUpdate(id, {
        ...updateUserDto,
        passwordHash: newPassword,
      })
      .setOptions({ overwrite: true, new: true });
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
