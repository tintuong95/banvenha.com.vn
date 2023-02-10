import {
	Controller,
	UploadedFile,
	UseInterceptors,
	Post,
	UploadedFiles,
} from '@nestjs/common';
import {FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import {Express} from 'express';

import {uploadFileConfig} from '~config/multer.config';

@Controller('upload')
export class UploadController {
	@Post('')
	@UseInterceptors(
		FilesInterceptor(
			'images',
			20,
			uploadFileConfig(1048576, /\/(jpg|jpeg|png|gif)$/, 'images/news')
		)
	)
	uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
		console.log(files);
	}

	@Post('single')
	@UseInterceptors(FileInterceptor('file'))
	uploadFile(@UploadedFile() file: Express.Multer.File) {
		console.log(file);
	}
}