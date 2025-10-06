// 代码生成时间: 2025-10-07 02:39:29
import { Module } from '@nestjs/common';
import { MentalHealthAssessmentController } from './mental_health_assessment.controller';
import { MentalHealthAssessmentService } from './mental_health_assessment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentalHealthAssessmentEntity } from './mental_health_assessment.entity';

// Mental health assessment module
@Module({
  imports: [TypeOrmModule.forFeature([MentalHealthAssessmentEntity])],
  controllers: [MentalHealthAssessmentController],
  providers: [MentalHealthAssessmentService],
})
export class MentalHealthAssessmentModule {}

// mental_health_assessment.controller.ts
import { Controller, Get, Post, Body, HttpStatus, Res, NotFoundException, Query } from '@nestjs/common';
import { MentalHealthAssessmentService } from './mental_health_assessment.service';
import { MentalHealthAssessmentDto } from './dto/mental_health_assessment.dto';
import { Response } from 'express';

@Controller('mental-health-assessment')
export class MentalHealthAssessmentController {
  constructor(private readonly mentalHealthAssessmentService: MentalHealthAssessmentService) {}

  // POST endpoint to create a new mental health assessment
  @Post()
  async createMentalHealthAssessment(@Res() res: Response, @Body() mentalHealthAssessmentDto: MentalHealthAssessmentDto): Promise<Response> {
    try {
      const assessment = await this.mentalHealthAssessmentService.createMentalHealthAssessment(mentalHealthAssessmentDto);
      return res.status(HttpStatus.CREATED).json(assessment);
    } catch (error) {
      throw new NotFoundException('Failed to create mental health assessment');
    }
  }

  // GET endpoint to retrieve all mental health assessments
  @Get()
  async getMentalHealthAssessments(@Res() res: Response): Promise<Response> {
    try {
      const assessments = await this.mentalHealthAssessmentService.getAllMentalHealthAssessments();
      return res.status(HttpStatus.OK).json(assessments);
    } catch (error) {
      throw new NotFoundException('Failed to retrieve mental health assessments');
    }
  }
}

// mental_health_assessment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MentalHealthAssessmentEntity } from './mental_health_assessment.entity';
import { MentalHealthAssessmentDto } from './dto/mental_health_assessment.dto';

@Injectable()
export class MentalHealthAssessmentService {
  constructor(
    @InjectRepository(MentalHealthAssessmentEntity)
    private readonly mentalHealthAssessmentRepository: Repository<MentalHealthAssessmentEntity>,
  ) {}

  // Creates a new mental health assessment
  async createMentalHealthAssessment(mentalHealthAssessmentDto: MentalHealthAssessmentDto): Promise<MentalHealthAssessmentEntity> {
    const newAssessment = this.mentalHealthAssessmentRepository.create(mentalHealthAssessmentDto);
    return this.mentalHealthAssessmentRepository.save(newAssessment);
  }

  // Retrieves all mental health assessments
  async getAllMentalHealthAssessments(): Promise<MentalHealthAssessmentEntity[]> {
    return this.mentalHealthAssessmentRepository.find();
  }
}

// mental_health_assessment.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mental_health_assessments')
export class MentalHealthAssessmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;
}

// dto/mental_health_assessment.dto.ts
import { IsString } from 'class-validator';

export class MentalHealthAssessmentDto {
  @IsString()
  question: string;

  @IsString()
  answer: string;
}
