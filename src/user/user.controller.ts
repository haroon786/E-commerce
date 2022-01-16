/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Request,
  UseGuards,
  OnModuleInit,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate } from 'class-validator';
import { AuthService } from 'src/auth/service/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/auth.guard';
import { ModuleRef } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('user')
export class UserController  {
  constructor(private readonly userService: UserService,
    private readonly authService:AuthService,
    ) {}

  
  @Post()
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async login(@Request() req) {
    return this.authService.login(req.user);
  }
@UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/count')
  UserCount() {
    return this.userService.UserCount();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
