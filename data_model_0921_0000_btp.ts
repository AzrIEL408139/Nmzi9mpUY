// 代码生成时间: 2025-09-21 00:00:51
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DataModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @Column({ type: 'datetime' })
  updatedAt: Date;

  /**
   * Creates a new instance of DataModel.
   *
   * @param name The name of the data model.
   * @param description The description of the data model.
   */
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  /**
   * Validates the data model instance.
   * Throws an error if the name or description is missing.
   */
  validate(): void {
    if (!this.name) {
      throw new Error('Name is required');
    }

    if (!this.description) {
      throw new Error('Description is required');
    }
  }
}
