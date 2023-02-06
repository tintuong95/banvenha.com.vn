import {INestApplication} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

const config = new DocumentBuilder()
	.setTitle('Banvenha.com')
	.setDescription('Banvenha.com list API ')
	.setVersion('1.0')
	.addTag('banvenha')
	.build();

export function configOpenApi(app: INestApplication) {
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
}
