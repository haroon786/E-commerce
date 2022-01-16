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
  UseInterceptors,
  UploadedFile,
  Req,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express/multer';
import multer, { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './helper/validation-image';
import { truncate } from 'fs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    console.log('controller', createProductDto);

    return this.productService.create(createProductDto);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  func(
    @UploadedFile() file,
    @Body() createProductDto: CreateProductDto,
    @Req() request: any,
  ) {

    return this.productService.createwithImage(file, createProductDto, request);
  }

  @Put('updateImages/:id')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: string,
    @Body() createProductDto: CreateProductDto,
    @Req() request: any,
  ) {
    console.log(files, id, createProductDto);
    return this.productService.updateWithImages(
      files,
      id,
      createProductDto,
      request,
    );
  }

  @Put('updateImage/:id')
   @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(
    @UploadedFile() file: any,
    @Param('id') id: string,
    @Body() createProductDto: CreateProductDto,
    @Req() request: any,
  ) {
    return this.productService.updateWithImage(
      file,
      id,
      createProductDto,
      request,
    );
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
