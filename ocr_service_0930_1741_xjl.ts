// 代码生成时间: 2025-09-30 17:41:48
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TesseractService } from './tesseract.service'; // 假设这是与TesseractOCR的接口

@Injectable()
export class OcrService {
  constructor(private readonly tesseractService: TesseractService) {}

  /**
   * Performs OCR on an image and returns the recognized text.
   * @param imageUrl URL of the image to be processed.
   * @returns A promise that resolves with the recognized text or an error.
   */
  async recognizeTextFromImage(imageUrl: string): Promise<string> {
    try {
      // Validate the imageUrl to ensure it's a valid URL
      if (!this.isValidUrl(imageUrl)) {
        throw new HttpException('Invalid URL provided.', HttpStatus.BAD_REQUEST);
      }

      // Call the OCR service to process the image
      const recognizedText = await this.tesseractService.recognize(imageUrl);
      return recognizedText;
    } catch (error) {
      // Handle any errors that occur during the OCR process
      throw new HttpException('Failed to recognize text from image.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Validates if the provided string is a URL.
   * @param str The string to validate.
   * @returns True if it's a URL, false otherwise.
   */
  private isValidUrl(str: string): boolean {
    const pattern = new RegExp('^(https?:\/\/)?'+ // protocol
      '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
      '((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
      '(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
      '(\?[;&a-z\d%_.~+=-]*)?'+ // query string
      '(\#[-a-z\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
}