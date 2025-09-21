// 代码生成时间: 2025-09-21 23:23:16
import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { join } from 'path';
import { existsSync } from 'fs';

@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigManagerModule {
  static forRoot(): DynamicModule {
    const configFilePath = join(process.cwd(), 'config', 'config.json');
    if (!existsSync(configFilePath)) {
      throw new Error('Configuration file does not exist.');
    }

    return {
      module: ConfigManagerModule,
      providers: [
        {
          provide: ConfigService,
          useFactory: async () => {
            const config = await import(configFilePath);
            return new ConfigService(config.default);
          },
        },
      ],
      exports: [ConfigService],
    };
  }
}

/**
 * config.service.ts
 *
 * Service for managing application configuration.
 */
import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';

@Injectable()
export class ConfigService {
  private readonly config: Record<string, any>;

  constructor(private filePath: string) {
    const defaultConfig = JSON.parse(readFileSync(filePath, 'utf8'));
    this.config = { ...defaultConfig };
  }

  /**
   * Gets the configuration value for a given key.
   * @param key The configuration key.
   * @returns The configuration value.
   */
  get(key: string): any {
    return this.config[key];
  }

  /**
   * Sets the configuration value for a given key.
   * @param key The configuration key.
   * @param value The new configuration value.
   */
  set(key: string, value: any): void {
    this.config[key] = value;
    // Optionally, you can write the updated config back to the file.
    // This should be done carefully to avoid data loss.
  }
}

/**
 * config.schema.ts
 *
 * Joi schema for validating configuration data.
 *
 * Note: To use Joi validation, you would need to install the `@hapi/joi` package.
 */
import * as Joi from '@hapi/joi';

export const ConfigSchema = Joi.object({
  // Define your configuration schema here, for example:
  // database: Joi.object({
  //   host: Joi.string().required(),
  //   port: Joi.number().required(),
  // }).required(),
  // Add other configuration properties as needed.
});

/**
 * config.module.ts
 *
 * Module that incorporates the configuration management.
 */
import { Module, DynamicModule } from '@nestjs/common';
import { ConfigManagerModule } from './config_manager.module';
import { ConfigService } from './config.service';
import { ConfigSchema } from './config.schema';

@Module({
  imports: [ConfigManagerModule.forRoot()],
})
export class ConfigModule {
  constructor(private configService: ConfigService) {
    // Here you can use the configService to get and set configuration values.
    // For example, validate the configuration on startup.
    const config = this.configService.get();
    Joi.validate(config, ConfigSchema, (err) => {
      if (err) {
        throw new Error('Invalid configuration: ' + err.message);
      }
    });
  }
}
