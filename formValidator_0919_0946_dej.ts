// 代码生成时间: 2025-09-19 09:46:59
import { Injectable, BadRequestException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class FormValidator {
  /**
   * Validates a class instance against a set of constraints.
   * @param {T} classInstance The class instance to validate.
   * @returns {Promise<T>} A promise that resolves with the validated instance.
   * @throws {BadRequestException} If validation fails, throws BadRequestException with the errors.
   */
  async validate<T>(classInstance: T): Promise<T> {
    const errors: ValidationError[] = await validate(classInstance, { skipMissingProperties: true });
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed', errors);
    }
    return classInstance;
  }

  /**
   * Validates a plain object against a class instance.
   * @param {Class<T>} classType The class type to transform the plain object into.
   * @param {object} plainObject The plain object to validate and transform.
   * @returns {Promise<T>} A promise that resolves with the transformed and validated instance.
   * @throws {BadRequestException} If validation fails, throws BadRequestException with the errors.
   */
  async validateAndTransform<T>(classType: new () => T, plainObject: object): Promise<T> {
    const classInstance = plainToClass(classType, plainObject);
    return this.validate(classInstance);
  }
}