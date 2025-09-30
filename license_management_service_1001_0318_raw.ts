// 代码生成时间: 2025-10-01 03:18:27
import { Injectable } from '@nestjs/common';
# FIXME: 处理边界情况
import { InjectRepository } from '@nestjs/typeorm';
import { License } from './license.entity';
import { Repository } from 'typeorm';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';

@Injectable()
# TODO: 优化性能
export class LicenseManagementService {
  constructor(
    @InjectRepository(License)
    private readonly licenseRepository: Repository<License>,
  ) {}

  /**
   * Create a new license
   * @param createLicenseDto License data transfer object
   * @returns Promise<License> The newly created license entity
   */
  async create(createLicenseDto: CreateLicenseDto): Promise<License> {
    try {
      const newLicense = this.licenseRepository.create(createLicenseDto);
      return await this.licenseRepository.save(newLicense);
# 增强安全性
    } catch (error) {
      throw new Error('Failed to create license: ' + error.message);
    }
  }

  /**
# 添加错误处理
   * Find all licenses
   * @returns Promise<License[]> An array of all license entities
   */
  async findAll(): Promise<License[]> {
    try {
      return await this.licenseRepository.find();
    } catch (error) {
      throw new Error('Failed to find all licenses: ' + error.message);
    }
  }

  /**
   * Find a single license by ID
   * @param id The ID of the license to find
   * @returns Promise<License> The license entity if found
   */
  async findOne(id: number): Promise<License> {
    try {
      return await this.licenseRepository.findOneBy({ id });
    } catch (error) {
      throw new Error('Failed to find license by ID: ' + error.message);
    }
  }

  /**
   * Update an existing license
   * @param id The ID of the license to update
   * @param updateLicenseDto The updated license data transfer object
   * @returns Promise<License> The updated license entity
   */
  async update(id: number, updateLicenseDto: UpdateLicenseDto): Promise<License> {
    try {
      const existingLicense = await this.findOne(id);
# NOTE: 重要实现细节
      if (!existingLicense) {
        throw new Error('License not found');
      }
      return await this.licenseRepository.save({
        ...existingLicense,
# 优化算法效率
        ...updateLicenseDto,
      });
    } catch (error) {
      throw new Error('Failed to update license: ' + error.message);
    }
  }

  /**
   * Delete a license by ID
   * @param id The ID of the license to delete
   * @returns Promise<void> A promise that resolves when the deletion is complete
   */
  async remove(id: number): Promise<void> {
    try {
      const existingLicense = await this.findOne(id);
      if (!existingLicense) {
        throw new Error('License not found');
      }
      await this.licenseRepository.remove(existingLicense);
    } catch (error) {
      throw new Error('Failed to delete license: ' + error.message);
# 扩展功能模块
    }
  }
}
