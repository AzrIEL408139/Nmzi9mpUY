// 代码生成时间: 2025-10-02 18:27:53
import { Module, HttpModule, Controller, Get, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { EnvironmentData } from './models/environment-data.model';
import { Model } from 'mongoose';

// 环境监测系统的模块
@Module({
  imports: [HttpModule],
  controllers: [EnvironmentMonitoringController],
  providers: [EnvironmentDataService],
})
export class EnvironmentMonitoringModule {}

// 环境监测系统控制器
@Controller('environment')
export class EnvironmentMonitoringController {
  constructor(private readonly environmentDataService: EnvironmentDataService) {}

  // 获取环境数据
  @Get('data')
  async getEnvironmentData(@Res() res): Promise<any> {
    try {
      const data = await this.environmentDataService.getEnvironmentData();
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw new NotFoundException('Environment data not found');
    }
  }
}

// 环境数据服务
export class EnvironmentDataService {
  constructor(@InjectModel(EnvironmentData.modelName) private model: ReturnModelType<typeof EnvironmentData>) {}

  // 获取环境数据
  async getEnvironmentData(): Promise<EnvironmentData[]> {
    try {
      return await this.model.find().exec();
    } catch (error) {
      console.error('Error fetching environment data:', error);
      throw error;
    }
  }
}

// 环境数据模型
import { prop, modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class EnvironmentData extends TimeStamps {
  @prop({ required: true })
  temperature: number;

  @prop({ required: true })
  humidity: number;

  // 可以添加更多的环境监测数据属性
}
