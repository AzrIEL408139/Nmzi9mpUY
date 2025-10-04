// 代码生成时间: 2025-10-05 00:00:38
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreatePrivacyCoinDto } from './dto/create-privacy-coin.dto';
import { UpdatePrivacyCoinDto } from './dto/update-privacy-coin.dto';
import { PrivacyCoin } from './schemas/privacy-coin.schema';

// PrivacyCoinService 提供隐私币的创建、读取、更新和删除功能。
@Injectable()
export class PrivacyCoinService {
  constructor(private readonly prismaService: PrismaService) {}

  // 根据条件创建一个新的隐私币记录。
  async create(createPrivacyCoinDto: CreatePrivacyCoinDto): Promise<PrivacyCoin> {
    try {
      // 使用PrismaService来创建隐私币记录。
      return await this.prismaService.privacyCoin.create({
        data: createPrivacyCoinDto,
      });
    } catch (error) {
      // 错误处理：如果创建失败，抛出异常。
      throw new Error('Failed to create privacy coin');
    }
  }

  // 查找所有隐私币记录。
  findAll(): Promise<PrivacyCoin[]> {
    try {
      // 使用PrismaService来获取所有隐私币记录。
      return this.prismaService.privacyCoin.findMany();
    } catch (error) {
      // 错误处理：如果获取失败，抛出异常。
      throw new Error('Failed to find privacy coins');
    }
  }

  // 查找一个特定的隐私币记录。
  async findOne(id: string): Promise<PrivacyCoin> {
    try {
      // 使用PrismaService来查找特定的隐私币记录。
      return await this.prismaService.privacyCoin.findUnique({
        where: { id },
      });
    } catch (error) {
      // 错误处理：如果查找失败，抛出异常。
      throw new Error('Failed to find privacy coin');
    }
  }

  // 更新一个特定的隐私币记录。
  async update(id: string, updatePrivacyCoinDto: UpdatePrivacyCoinDto): Promise<PrivacyCoin> {
    try {
      // 使用PrismaService来更新特定的隐私币记录。
      return await this.prismaService.privacyCoin.update({
        where: { id },
        data: updatePrivacyCoinDto,
      });
    } catch (error) {
      // 错误处理：如果更新失败，抛出异常。
      throw new Error('Failed to update privacy coin');
    }
  }

  // 删除一个特定的隐私币记录。
  async remove(id: string): Promise<{ message: string }> {
    try {
      // 使用PrismaService来删除特定的隐私币记录。
      await this.prismaService.privacyCoin.delete({
        where: { id },
      });
      return { message: 'Privacy coin deleted successfully' };
    } catch (error) {
      // 错误处理：如果删除失败，抛出异常。
      throw new Error('Failed to delete privacy coin');
    }
  }
}
