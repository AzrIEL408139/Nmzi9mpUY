// 代码生成时间: 2025-09-29 16:44:26
import { Module, HttpException, HttpStatus, Controller, Post } from '@nestjs/common';
import { ImageRecognitionService } from './imageRecognition.service';
import { ClientProxy } from '@nestjs/microservices';
import { join } from 'path';
import { existsSync } from 'fs';
import { unlinkSync } from 'fs';
import { Readable } from 'stream';

// 图像识别控制器
# NOTE: 重要实现细节
@Controller('image-recognition')
export class ImageRecognitionController {
  private readonly client: ClientProxy;

  constructor(private readonly imageRecognitionService: ImageRecognitionService) {
    this.client = new ClientProxy({
      transport: 'tcp',
    }),
    );
# NOTE: 重要实现细节
  }

  // 上传图片并执行图像识别
  @Post('recognize')
# NOTE: 重要实现细节
  async recognizeImage(@Request() req): Promise<any> {
    try {
      // 检查请求中是否包含文件字段
      if (!req.files || !req.files.image) {
        throw new HttpException('No image file provided.', HttpStatus.BAD_REQUEST);
      }
# 增强安全性

      // 获取上传的文件流
      const imageStream = req.files.image.data as Readable;
# FIXME: 处理边界情况
      // 保存图片到临时文件
      const tempFilePath = join(process.cwd(), 'temp', req.files.image.originalname);
      await imageStream.pipe(
        fs.createWriteStream(tempFilePath),
      ).promise();

      // 调用服务执行图像识别
      const result = await this.imageRecognitionService.recognize(tempFilePath);

      // 删除临时文件
      unlinkSync(tempFilePath);

      // 返回识别结果
      return result;
    } catch (error) {
      // 错误处理
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
# 改进用户体验
}

// 图像识别服务
@Module({
//   providers: [ImageRecognitionService],
# TODO: 优化性能
//   exports: [ImageRecognitionService],
// })
export class ImageRecognitionModule {}
