// 代码生成时间: 2025-09-20 01:23:05
import { Module } from '@nestjs/common';
import { ProcessManagerService } from './process_manager.service';
import { ProcessManagerController } from './process_manager.controller';

/**
 * ProcessManagerModule module
 * Handles process management functionalities such as listing, starting, and stopping processes.
 */
@Module({
  imports: [],
  controllers: [ProcessManagerController],
  providers: [ProcessManagerService],
})
export class ProcessManagerModule {}

/**
 * ProcessManagerService class
 * Provides services for managing system processes.
 */
import { Injectable } from '@nestjs/common';
import { ChildProcess, exec } from 'child_process';
import { fork } from 'child_process';

@Injectable()
export class ProcessManagerService {
  private processes: Map<string, ChildProcess> = new Map();

  /**
   * Starts a process with the given command.
   * @param command The command to execute.
   * @returns Promise<string> The process ID.
   */
  async startProcess(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const childProcess = fork(command);
        this.processes.set(command, childProcess);
        childProcess.on('message', (msg) => {
          console.log('Received message from child process:', msg);
        });
        childProcess.on('error', (err) => {
          console.error('Error in child process:', err);
          reject(err);
        });
        childProcess.on('close', (code) => {
          console.log(`Child process exited with code ${code}`);
        });
        resolve(command);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Stops a process with the given command.
   * @param command The command to stop.
   */
  async stopProcess(command: string): Promise<void> {
    const process = this.processes.get(command);
    if (!process) {
      throw new Error('Process not found');
    }
    process.kill();
    this.processes.delete(command);
  }

  /**
   * Lists all active processes.
   * @returns Promise<Map<string, ChildProcess>> A map of command to ChildProcess.
   */
  async listProcesses(): Promise<Map<string, ChildProcess>> {
    return new Promise((resolve) => {
      resolve(this.processes);
    });
  }
}

/**
 * ProcessManagerController class
 * Handles HTTP requests for process management.
 */
import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { ProcessManagerService } from './process_manager.service';

@Controller('process-manager')
export class ProcessManagerController {
  constructor(private readonly processManagerService: ProcessManagerService) {}

  /**
   * Starts a new process.
   * @param command The command to execute.
   * @returns Promise<string> The process ID.
   */
  @Post('/start')
  async startProcess(@Body('command') command: string): Promise<string> {
    return this.processManagerService.startProcess(command);
  }

  /**
   * Stops an existing process.
   * @param command The command to stop.
   * @returns Promise<void>
   */
  @Delete('/stop')
  async stopProcess(@Body('command') command: string): Promise<void> {
    return this.processManagerService.stopProcess(command);
  }

  /**
   * Lists all active processes.
   * @returns Promise<Map<string, ChildProcess>> A map of command to ChildProcess.
   */
  @Get('/list')
  async listProcesses(): Promise<Map<string, ChildProcess>> {
    return this.processManagerService.listProcesses();
  }
}