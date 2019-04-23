import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interface/cat.interface';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id): string {
    return `you are looking for ${id}`;
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  // @Roles('admin')
  async create(@Body() createCatDto: CreateCatDto): Promise<any> {
    this.catsService.create(createCatDto);
  }

  @Put(':id')
  async update(
    @Param('id') id,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<any> {
    return `cat ${id} has been updated`;
  }

  @Delete(':id')
  async delete(@Param('id') id): Promise<any> {
    return `cat ${id} has been deleted!`;
  }
}
