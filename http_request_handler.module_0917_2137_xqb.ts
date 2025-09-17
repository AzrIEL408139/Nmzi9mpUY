// 代码生成时间: 2025-09-17 21:37:49
import { Module } from '@nestjs/common';
import { HttpService } from './http.service';
import { HttpController } from './http.controller';

@Module({
  imports: [],
  controllers: [HttpController],
  providers: [HttpService],
})
export class HttpModule {}

/**
 * HTTP Service
 * This service is responsible for handling HTTP requests and responses.
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpEntity } from './http.entity';
import axios from 'axios';

@Injectable()
export class HttpService {
  constructor(
    @InjectRepository(HttpEntity)
    private readonly httpRepository: Repository<HttpEntity>,
  ) {}

  /**
   * Fetch data from a given URL
   * @param url The URL to fetch data from
   * @returns A promise that resolves with the fetched data
   */
  async fetchData(url: string): Promise<any> {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
    }
  }
}

/**
 * HTTP Controller
 * This controller handles incoming HTTP requests.
 */
import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { HttpService } from './http.service';
import { Response } from 'express';
import { HttpException } from '@nestjs/common';

@Controller('http')
export class HttpController {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Get data from a URL
   * @param url The URL to get data from
   * @returns The fetched data
   */
  @Get('get-data')
  async getData(@Query('url') url: string, @Res() res: Response): Promise<void> {
    if (!url) {
      throw new HttpException('URL parameter is required', HttpStatus.BAD_REQUEST);
    }
    try {
      const data = await this.httpService.fetchData(url);
      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
}

/**
 * HTTP Entity
 * This entity represents the HTTP data to be stored or retrieved.
 */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class HttpEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  data: string;
}
