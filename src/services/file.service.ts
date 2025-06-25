import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileService {
  private readonly PRODUCT_IMAGES_PATH = path.join(
    process.cwd(),
    'uploads',
    'product-images',
  );

  private async saveFile(
    uploadPath: string,
    buffer: Buffer,
    originalName: string,
  ): Promise<string> {
    // 1. Kengaytmani olish
    const ext = path.extname(originalName); // masalan: .png, .pdf

    // 2. UUID asosida yangi nom
    const filename = `${uuidv4()}${ext}`;

    // 3. To‘liq path
    const fullPath = path.join(uploadPath, filename);

    // 4. Faylni diskka yozish
    await fs.promises.mkdir(uploadPath, { recursive: true }); // papkani yaratadi agar yo‘q bo‘lsa
    await fs.promises.writeFile(fullPath, buffer);

    // 5. Faqat nomini qaytarish
    return filename;
  }

  async uploadProductImages(images: Array<Express.Multer.File>) {
    const urls: string[] = [];

    for (const image of images) {
      const url = await this.saveFile(
        this.PRODUCT_IMAGES_PATH,
        image.buffer,
        image.originalname,
      );

      urls.push(url);
    }

    return urls;
  }
}
