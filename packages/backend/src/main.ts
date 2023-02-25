import {INestApplication} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {configOpenApi} from '~config/open-api.config';
import {AppModule} from './app.module';
import helmet from 'helmet';
import {NestExpressApplication} from '@nestjs/platform-express';

async function bootstrap() {
	const app: INestApplication =
		await NestFactory.create<NestExpressApplication>(AppModule, {
			rawBody: true, //application/json
		});

	/**
	 * setup cors
	 */
	app.enableCors();

	/**
	 * open api
	 */
	configOpenApi(app);
	/**
	 * setup csur
	 */
	// app.use(csurf());
	/**
	 * setup helmet
	 */
	app.use(helmet());

	/**
	 * setup prefix
	 */
	app.setGlobalPrefix('v1/api');
	/**
	 * cors  static files
	 */

	await app.listen(5000);
}
bootstrap();
