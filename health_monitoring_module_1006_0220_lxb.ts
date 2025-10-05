// 代码生成时间: 2025-10-06 02:20:28
import { Module, HttpException, HttpStatus } from '@nestjs/common';
import { HealthMonitoringService } from './health_monitoring.service';
import { HealthMonitoringController } from './health_monitoring.controller';
import { HealthMonitoringRepository } from './health_monitoring.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([HealthMonitoringRepository]),
  ],
  controllers: [HealthMonitoringController],
  providers: [HealthMonitoringService],
})
export class HealthMonitoringModule {}

/*
 * health_monitoring.controller.ts
 * This controller handles HTTP requests for health monitoring.
 */
import { Controller, Get, Res, HttpStatus, Query, NotFoundException } from '@nestjs/common';
import { HealthMonitoringService } from './health_monitoring.service';
import { HealthDataDto } from './dtos/health_data.dto';

@Controller('health-monitoring')
export class HealthMonitoringController {
  constructor(private readonly healthMonitoringService: HealthMonitoringService) {}

  @Get()
  async getHealthData(@Query() query): Promise<HealthDataDto> {
    const { deviceId } = query;
    const healthData = await this.healthMonitoringService.getHealthData(deviceId);

    if (!healthData) {
      throw new NotFoundException(`Health data for device ${deviceId} not found`);
    }

    return healthData;
  }
}

/*
 * health_monitoring.service.ts
 * This service provides business logic for health monitoring.
 */
import { Injectable } from '@nestjs/common';
import { HealthMonitoringRepository } from './health_monitoring.repository';
import { HealthDataDto } from './dtos/health_data.dto';

@Injectable()
export class HealthMonitoringService {
  constructor(private readonly healthMonitoringRepository: HealthMonitoringRepository) {}

  async getHealthData(deviceId: string): Promise<HealthDataDto> {
    try {
      const healthData = await this.healthMonitoringRepository.findHealthDataByDeviceId(deviceId);
      return healthData ? new HealthDataDto(healthData) : null;
    } catch (error) {
      throw new HttpException('Health data retrieval failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

/*
 * health_monitoring.repository.ts
 * This repository provides data access for health monitoring.
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthDataEntity } from './entities/health_data.entity';

@Injectable()
export class HealthMonitoringRepository {
  constructor(
    @InjectRepository(HealthDataEntity)
    private readonly healthDataRepository: Repository<HealthDataEntity>,
  ) {}

  async findHealthDataByDeviceId(deviceId: string): Promise<HealthDataEntity> {
    return this.healthDataRepository.findOneBy({ deviceId });
  }
}

/*
 * entities/health_data.entity.ts
 * This entity represents health data in the database.
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class HealthDataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  deviceId: string;

  @Column('float')
  heartRate: number;

  @Column('float')
  bloodPressure: number;

  @Column('datetime')
  timestamp: Date;
}

/*
 * dtos/health_data.dto.ts
 * This DTO is used to transfer health data.
 */
export class HealthDataDto {
  id: number;
  deviceId: string;
  heartRate: number;
  bloodPressure: number;
  timestamp: Date;

  constructor(entity: HealthDataEntity) {
    this.id = entity.id;
    this.deviceId = entity.deviceId;
    this.heartRate = entity.heartRate;
    this.bloodPressure = entity.bloodPressure;
    this.timestamp = entity.timestamp;
  }
}
