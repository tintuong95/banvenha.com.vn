import {extname, join, parse} from 'path';
import {diskStorage} from 'multer';
import {HttpException, HttpStatus} from '@nestjs/common';
import {existsSync, mkdirSync} from 'fs-extra';
import createSlug from '~util/createSlug';

// Multer configuration
// export const multerConfig = {
// 	dest: process.env.UPLOAD_LOCATION,
// };

// Multer upload options

export const uploadFileConfig = (
	size: number,
	type: RegExp,
	pathUpload: string
) => ({
	// Enable file size limits
	limits: {
		fileSize: size, // 1048576 10 Mb
	},
	// Check the mimetypes to allow for upload
	fileFilter: (req: any, file: any, cb: any) => {
		if (file.mimetype.match(type)) {
			// Allow storage of file
			cb(null, true);
		} else {
			// Reject file
			cb(
				new HttpException(
					`Unsupported file type ${extname(file.originalname)}`,
					HttpStatus.BAD_REQUEST
				),
				false
			);
		}
	},
	// Storage properties
	storage: diskStorage({
		// Destination storage path details
		destination: (req: any, file: any, cb: any) => {
			const uploadPath = join(__dirname, '..', '..', 'uploads', pathUpload);
			// console.log(existsSync(uploadPath));

			// Create folder if doesn't exist
			if (!existsSync(uploadPath)) {
				mkdirSync(uploadPath, {recursive: true});
			}
			cb(null, uploadPath);
		},
		// File modification details
		filename: (req: any, file: any, cb: any) => {
			const name = parse(file.originalname).name;
			const ext = parse(file.originalname).ext;
			const newFilename = `${createSlug(name)}${ext}`;
			// Calling the callback passing the random name generated with the original extension name
			cb(null, newFilename);
		},
	}),
});
