// 代码生成时间: 2025-10-06 22:38:53
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity'; // Assuming Member entity is defined in member.entity.ts

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  // Create a new member
  async createMember(memberData: any): Promise<Member> {
    try {
      const member = this.membersRepository.create(memberData);
      return await this.membersRepository.save(member);
    } catch (error) {
      throw new Error('Failed to create member: ' + error.message);
    }
  }

  // Find all members
  async findAllMembers(): Promise<Member[]> {
    try {
      return await this.membersRepository.find();
    } catch (error) {
      throw new Error('Failed to find all members: ' + error.message);
    }
  }

  // Find a member by ID
  async findMemberById(memberId: number): Promise<Member> {
    try {
      return await this.membersRepository.findOne(memberId);
    } catch (error) {
      throw new Error('Failed to find member by ID: ' + error.message);
    }
  }

  // Update a member
  async updateMember(memberId: number, updateData: any): Promise<Member> {
    try {
      const member = await this.membersRepository.findOne(memberId);
      if (!member) {
        throw new Error('Member not found');
      }
      await this.membersRepository.update(memberId, updateData);
      return await this.membersRepository.findOne(memberId);
    } catch (error) {
      throw new Error('Failed to update member: ' + error.message);
    }
  }

  // Delete a member
  async deleteMember(memberId: number): Promise<void> {
    try {
      const result = await this.membersRepository.delete(memberId);
      if (result.affected === 0) {
        throw new Error('Member not found');
      }
    } catch (error) {
      throw new Error('Failed to delete member: ' + error.message);
    }
  }
}
