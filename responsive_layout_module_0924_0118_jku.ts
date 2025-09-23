// 代码生成时间: 2025-09-24 01:18:46
import { Module } from '@nestjs/common';
import { LayoutService } from './layout.service';
import { LayoutController } from './layout.controller';

@Module({
  providers: [LayoutService],
  controllers: [LayoutController],
  exports: [LayoutService],
})
export class ResponsiveLayoutModule {}

/*
 * LayoutService - Service to handle logic related to responsive layout design.
 */
import { Injectable } from '@nestjs/common';
import { Query, Resolver, Mutation } from '@nestjs/graphql';
import { Request } from 'express';

@Injectable()
@Resolver()
export class LayoutService {
  constructor() {}

  /*
   * Method to determine the layout based on the client's screen size.
   */
  @Query('layout')
  getLayout(@Args('request') req: Request): string {
    const width = req.headers['x-device-width'];
    if (!width) {
      throw new Error('Device width header is missing');
    }

    return width > 768 ? 'desktop' : 'mobile';
  }
}

/*
 * LayoutController - Controller to handle HTTP requests for responsive layout.
 */
import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { LayoutService } from './layout.service';
import { Request, Response } from 'express';

@Controller('layout')
export class LayoutController {
  constructor(private readonly layoutService: LayoutService) {}

  /*
   * GET endpoint to return the layout type based on the client's screen size.
   */
  @Get()
  getLayout(@Req() req: Request, @Res() res: Response): void {
    try {
      const layout = this.layoutService.getLayout(req);
      res.status(HttpStatus.OK).json({ layout });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
}
