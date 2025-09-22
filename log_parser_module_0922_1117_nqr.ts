// 代码生成时间: 2025-09-22 11:17:32
import { Module } from '@nestjs/common';
    import { LogParserService } from './log-parser.service';
    import { LogParserController } from './log-parser.controller';
    import { MulterModule } from '@nestjs/platform-express';
    import { diskStorage } from 'multer';
# 扩展功能模块
    import { extname } from 'path';

    // 配置Multer文件存储
# 扩展功能模块
    const multerStorage = diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            // 确保文件名不包含非法字符
            cb(null, `log-file-${Date.now()}${extname(file.originalname)}`);
        }
    });

    // 日志文件解析模块
    @Module({
        imports: [
            MulterModule.register({
                storage: multerStorage,
                fileFilter: (req, file, cb) => {
                    // 只允许上传日志文件
                    if (file.mimetype !== 'text/plain') {
                        cb(new Error('Unsupported file type'), false);
                    } else {
                        cb(null, true);
                    }
# 增强安全性
                }
            })
        ],
        controllers: [LogParserController],
        providers: [LogParserService]
    })
    export class LogParserModule {}

    // 日志文件解析服务
    import { Injectable } from '@nestjs/common';
    import { Readable } from 'stream';

    @Injectable()
    export class LogParserService {
        constructor() {}

        // 解析日志文件
        async parseLogFile(fileStream: Readable): Promise<string[]> {
            const lines: string[] = [];
            return new Promise((resolve, reject) => {
                fileStream
                    .on('data', (chunk) => {
                        const data = chunk.toString();
                        lines.push(...data.split('\
'));
                    })
                    .on('end', () => resolve(lines))
# 扩展功能模块
                    .on('error', (err) => reject(err));
            });
        }
    }

    // 日志文件解析控制器
    import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
    import { FileInterceptor } from '@nestjs/platform-express';
    import { LogParserService } from './log-parser.service';

    @Controller('log-parser')
    export class LogParserController {
        constructor(private readonly logParserService: LogParserService) {}

        // 上传并解析日志文件
        @Post('upload')
        @UseInterceptors(FileInterceptor('file'))
        async uploadLogFile(@UploadedFile() file: Express.Multer.File): Promise<string[]> {
            if (!file) {
                throw new Error('No file uploaded');
            }

            const fileStream = file.createReadStream();
            try {
                return await this.logParserService.parseLogFile(fileStream);
            } catch (err) {
                throw new Error('Failed to parse log file');
            }
        }
    }