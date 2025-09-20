// 代码生成时间: 2025-09-20 13:38:25
import { Controller, Get, Query, HttpException, HttpStatus } from '@nestjs/common';

@Controller('math')
export class MathToolboxController {
  
  // Adds two numbers
  @Get('add')
  async add(
    @Query('a') a: number,
    @Query('b') b: number,
  ): Promise<number> {
    if (isNaN(a) || isNaN(b)) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }
    return a + b;
  }

  // Subtracts one number from another
  @Get('subtract')
  async subtract(
    @Query('a') a: number,
    @Query('b') b: number,
  ): Promise<number> {
    if (isNaN(a) || isNaN(b)) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }
    return a - b;
  }

  // Multiplies two numbers
  @Get('multiply')
  async multiply(
    @Query('a') a: number,
    @Query('b') b: number,
  ): Promise<number> {
    if (isNaN(a) || isNaN(b)) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }
    return a * b;
  }

  // Divides one number by another
  @Get('divide')
  async divide(
    @Query('a') a: number,
    @Query('b') b: number,
  ): Promise<number> {
    if (isNaN(a) || isNaN(b)) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }
    if (b === 0) {
      throw new HttpException('Cannot divide by zero', HttpStatus.BAD_REQUEST);
    }
    return a / b;
  }
}
