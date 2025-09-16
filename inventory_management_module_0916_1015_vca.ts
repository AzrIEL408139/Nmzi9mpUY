// 代码生成时间: 2025-09-16 10:15:05
import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { InventoryRepository } from './inventory.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryEntity } from './inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryEntity])],
  controllers: [InventoryController],
  providers: [InventoryService, InventoryRepository],
})
export class InventoryModule {}

/*
 * Inventory Service
 *
 * This service handles business logic for inventory operations.
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryEntity } from './inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryEntity)
    private inventoryRepository: Repository<InventoryEntity>,
  ) {}

  async addInventoryItem(item: InventoryEntity): Promise<InventoryEntity> {
    return this.inventoryRepository.save(item);
  }

  async removeInventoryItem(id: number): Promise<void> {
    const result = await this.inventoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Inventory item with ID ${id} not found`);
    }
  }

  async updateInventoryItem(id: number, updateData: Partial<InventoryEntity>): Promise<InventoryEntity> {
    await this.inventoryRepository.update(id, updateData);
    return this.inventoryRepository.findOne(id);
  }
}

/*
 * Inventory Controller
 *
 * This controller handles HTTP requests related to inventory items.
 */
import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryEntity } from './inventory.entity';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  async addInventoryItem(@Body() item: InventoryEntity): Promise<InventoryEntity> {
    return this.inventoryService.addInventoryItem(item);
  }

  @Delete(':id')
  async removeInventoryItem(@Param('id') id: number): Promise<void> {
    return this.inventoryService.removeInventoryItem(id);
  }

  @Put(':id')
  async updateInventoryItem(@Param('id') id: number, @Body() updateData: Partial<InventoryEntity>): Promise<InventoryEntity> {
    return this.inventoryService.updateInventoryItem(id, updateData);
  }
}

/*
 * Inventory Repository
 *
 * This interface defines methods that can be used to interact with the inventory data.
 */
import { EntityRepository, Repository } from 'typeorm';
import { InventoryEntity } from './inventory.entity';

@EntityRepository(InventoryEntity)
export class InventoryRepository extends Repository<InventoryEntity> {}

/*
 * Inventory Entity
 *
 * This entity represents an inventory item.
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('inventory')
export class InventoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('double')
  price: number;

  @Column()
  quantity: number;
}
