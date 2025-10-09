// 代码生成时间: 2025-10-09 20:24:45
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DrugInteractionDto } from './dto/drug-interaction.dto';
import { DrugInteraction, DrugInteractionDocument } from './schemas/drug-interaction.schema';

/**
 * Service responsible for checking drug interactions.
 */
@Injectable()
export class DrugInteractionService {
  
  constructor(@InjectModel(DrugInteraction.name) private drugInteractionModel: Model<DrugInteractionDocument>) {}
  
  /**
   * Checks for drug interactions based on the given list of drugs.
   * @param drugIds list of drug IDs to check for interactions.
   * @returns A list of drug interactions.
   */
  async checkDrugInteractions(drugIds: string[]): Promise<DrugInteraction[]> {
    if (!drugIds || drugIds.length === 0) {
      throw new Error('No drug IDs provided for interaction check.');
    }
    
    try {
      const interactions = await this.drugInteractionModel.find({
        drugs: {
          $all: drugIds,
        },
      });
      return interactions;
    } catch (error) {
      throw new Error('Failed to check drug interactions: ' + error.message);
    }
  }
}
