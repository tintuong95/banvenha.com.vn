import {INestApplication} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {configOpenApi} from '~config/open-api.config';
import {AppModule} from './app.module';
import helmet from 'helmet';

async function bootstrap() {
	const app: INestApplication = await NestFactory.create(AppModule, {
		rawBody: true, //application/json
	});
	/**
	 * open api
	 */
	configOpenApi(app);
	/**
	 * setup cors
	 */
	app.enableCors();
	/**
	 * setup csurf
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
	await app.listen(5000);
}
bootstrap();
