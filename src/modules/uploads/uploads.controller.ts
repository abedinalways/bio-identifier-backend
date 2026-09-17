import {
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import type { Response } from 'express';

const UPLOADS_DIR = join(process.cwd(), 'uploads');
if (!existsSync(UPLOADS_DIR)) {
  mkdirSync(UPLOADS_DIR, { recursive: true });
}

@ApiTags('File Uploads')
@Controller('uploads')
export class UploadsController {
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          if (!existsSync(UPLOADS_DIR)) {
            mkdirSync(UPLOADS_DIR, { recursive: true });
          }
          cb(null, UPLOADS_DIR);
        },
        filename: (_req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const extension = extname(file.originalname) || '.jpg';
          cb(null, `specimen-${uniqueSuffix}${extension}`);
        },
      }),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp|avif|bmp|svg\+xml)$/)) {
          return cb(
            new BadRequestException(
              'Unsupported file format. Please upload an image (PNG, JPG, WebP, AVIF).',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload specimen photo to backend server' })
  @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No image file was provided');
    }

    // Return the relative URL routed through Next.js proxy
    return {
      url: `/api/v1/uploads/${file.filename}`,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  @Get(':filename')
  @ApiOperation({ summary: 'Retrieve uploaded image by filename' })
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    // Sanitize filename to prevent path traversal
    const safeFilename = filename.replace(/[^a-zA-Z0-9_.-]/g, '');
    const filePath = join(UPLOADS_DIR, safeFilename);

    if (!existsSync(filePath)) {
      throw new NotFoundException(`File '${filename}' not found`);
    }

    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return res.sendFile(filePath);
  }
}

