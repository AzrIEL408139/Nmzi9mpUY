// 代码生成时间: 2025-09-21 05:41:15
import { Injectable } from '@nestjs/common';
import { existsSync, promises as fs } from 'fs';
import { join, sep } from 'path';

@Injectable()
export class FolderStructureOrganizerService {

  constructor() {}

  /**
   * Organize the folder structure based on a given configuration.
   * @param basePath The base path of the folder structure to organize.
   * @param folderConfig Configuration object specifying how to organize the folders.
   */
  async organize(basePath: string, folderConfig: {[key: string]: string[]}): Promise<void> {
    try {
      for (const [rootFolder, subfolders] of Object.entries(folderConfig)) {
        const rootFolderPath = join(basePath, rootFolder);
        if (!existsSync(rootFolderPath)) {
          await fs.mkdir(rootFolderPath, { recursive: true });
        }
        for (const subfolder of subfolders) {
          const subFolderPath = join(rootFolderPath, subfolder);
          if (!existsSync(subFolderPath)) {
            await fs.mkdir(subFolderPath, { recursive: true });
          }
        }
      }
    } catch (error) {
      throw new Error(`Failed to organize folder structure: ${error.message}`);
    }
  }
}

// Example usage:
// const organizer = new FolderStructureOrganizerService();
// await organizer.organize('/path/to/base', {
//   'src': ['controllers', 'services'],
//   'dist': ['scripts']
// });