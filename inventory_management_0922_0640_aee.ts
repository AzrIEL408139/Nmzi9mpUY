// 代码生成时间: 2025-09-22 06:40:56
import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { Inventory } from './schemas/inventory.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryRepository } from './repositories/inventory.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Inventory', schema: Inventory }])
  ],
  controllers: [InventoryController],
  providers: [InventoryService, InventoryRepository],
})
export class InventoryModule {}

/* Inventory Service */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory, InventoryDocument } from './schemas/inventory.schema';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Inventory.name) private inventoryModel: Model<InventoryDocument>,
  ) {}

  async create(createInventoryDto: Inventory): Promise<Inventory> {
    const createdInventory = new this.inventoryModel(createInventoryDto);
    return createdInventory.save();
  }

  async findAll(): Promise<Inventory[]> {
    return this.inventoryModel.find().exec();
  }

  async findOne(id: string): Promise<Inventory> {
    return this.inventoryModel.findById(id).exec();
  }

  async update(id: string, updateInventoryDto: Inventory): Promise<Inventory> {
    return this.inventoryModel.findByIdAndUpdate(id, updateInventoryDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Inventory> {
    return this.inventoryModel.findByIdAndRemove(id).exec();
  }
}

/* Inventory Controller */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './schemas/inventory.schema';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    return this.inventoryService.create(createInventoryDto);
  }

  @Get()
  findAll(): Promise<Inventory[]> {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto): Promise<Inventory> {
    return this.inventoryService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.remove(id);
  }
}

/* Inventory Schema */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InventoryDocument = Inventory & Document;

@Schema()
export class Inventory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quantity: number;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);

/* DTOs */
import { ApiProperty } from '@nestjs/swagger';

export class CreateInventoryDto {
  @ApiProperty({ example: 'Product Name', description: 'The name of the product' })
  readonly name: string;

  @ApiProperty({ example: 100, description: 'The quantity of the product' })
  readonly quantity: number;
}

export class UpdateInventoryDto {
  @ApiProperty({ example: 'New Product Name', description: 'The new name of the product' })
  readonly name?: string;

  @ApiProperty({ example: 200, description: 'The new quantity of the product' })
  readonly quantity?: number;
}

/* Repository */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from '../schemas/inventory.schema';

@Injectable()
export class InventoryRepository {
  constructor(@InjectModel(Inventory.name) private readonly inventoryModel: Model<Inventory>) {}

  async createInventory(createInventoryDto: Inventory): Promise<Inventory> {
    const createdInventory = new this.inventoryModel(createInventoryDto);
    return createdInventory.save();
  }

  async getInventories(): Promise<Inventory[]> {
    return this.inventoryModel.find().exec();
  }

  async getInventory(id: Types.ObjectId): Promise<Inventory> {
    return this.inventoryModel.findById(id).exec();
  }

  async updateInventory(id: Types.ObjectId, updateInventoryDto: Inventory): Promise<Inventory> {
    return this.inventoryModel.findByIdAndUpdate(id, updateInventoryDto, { new: true }).exec();
  }

  async deleteInventory(id: Types.ObjectId): Promise<Inventory> {
    return this.inventoryModel.findByIdAndRemove(id).exec();
  }
}