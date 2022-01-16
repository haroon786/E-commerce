import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('demo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  findAll(@Query() paginationQuery) {

    const {limit,offset}=paginationQuery
    return `this action will sen ${limit} and ${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id:string) {
    return `return ${id} from`;
  }

  @Post()
  // @HttpCode(HttpStatus.GONE)
  create(@Body() body)
  {
      return body;
  }
  @Patch(':id')
  update(@Param('id') id:string,@Body() body:any)
  {
      return  `${id} , update ${body}`
  }

  @Delete(':id')
  remove(@Param('id') id:string)
  {
      return ` the ${id} has been deleted`
  }


}
