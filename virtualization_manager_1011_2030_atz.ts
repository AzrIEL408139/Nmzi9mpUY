// 代码生成时间: 2025-10-11 20:30:10
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VirtualMachine } from './virtual-machine.entity';
import { CreateVirtualMachineDto } from './dto/create-virtual-machine.dto';
import { UpdateVirtualMachineDto } from './dto/update-virtual-machine.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class VirtualizationManagerService {
  
  constructor(
    @InjectRepository(VirtualMachine)
    private virtualMachineRepository: Repository<VirtualMachine>,
  ) {}

  /**
   * Create a new virtual machine
   * @param createVirtualMachineDto virtual machine data
   * @returns the created virtual machine
   */
  async create(createVirtualMachineDto: CreateVirtualMachineDto): Promise<VirtualMachine> {
    const vm = this.virtualMachineRepository.create(createVirtualMachineDto);
    return this.virtualMachineRepository.save(vm);
  }

  /**
   * Find all virtual machines
   * @returns an array of virtual machines
   */
  findAll(): Promise<VirtualMachine[]> {
    return this.virtualMachineRepository.find();
  }

  /**
   * Find a single virtual machine by ID
   * @param id virtual machine ID
   * @returns the virtual machine if found, otherwise throws NotFoundException
   */
  async findOne(id: number): Promise<VirtualMachine> {
    const vm = await this.virtualMachineRepository.findOne(id);
    if (!vm) {
      throw new NotFoundException(`Virtual machine with ID ${id} not found`);
    }
    return vm;
  }

  /**
   * Update an existing virtual machine
   * @param id virtual machine ID
   * @param updateVirtualMachineDto updated data
   * @returns the updated virtual machine
   */
  async update(id: number, updateVirtualMachineDto: UpdateVirtualMachineDto): Promise<VirtualMachine> {
    const vm = await this.findOne(id);
    this.virtualMachineRepository.merge(vm, updateVirtualMachineDto);
    return this.virtualMachineRepository.save(vm);
  }

  /**
   * Remove a virtual machine
   * @param id virtual machine ID
   * @returns the deleted virtual machine
   */
  async remove(id: number): Promise<void> {
    const vm = await this.findOne(id);
    await this.virtualMachineRepository.remove(vm);
  }
}