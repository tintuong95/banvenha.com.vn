import {forwardRef, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {envConfig} from '~config/configuration';
import {dbConfig} from '~config/db.config';
import {AccountModule} from '~module/account/account.module';
import {APP_FILTER, APP_PIPE} from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common/pipes';
import {HttpExceptionFilter} from '~util/exception.filter';

import {NewsModule} from '~module/news/news.module';
import {NewsImageModule} from '~module/news-images/news-image.module';

import {OrderModule} from '~module/orders/order.module';
import {ProductModule} from '~module/products/product.module';
import {ProductDetailsModule} from '~module/product-details/product-details.module';
import {ProductFilesModule} from '~module/product-files/product-files.module';
import {ProductImagesModule} from '~module/product-images/product-images.module';

import {NewsGroupModule} from '~module/news-groups/news-group.module';
import {ProductGroupsModule} from '~module/product-groups/group-product.module';
import {MessageModule} from '~module/message/message.module';
import {PaymentModule} from '~module/payment/payment.module';
import {AdminModule} from '~module/admin/admin.module';
import {AuthModule} from '~module/auth/auth.module';
import {UploadModule} from '~module/upload/upload.module';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'uploads'),
		}),
		/**
		 * import configuration
		 */
		ConfigModule.forRoot(envConfig),
		/**
		 * import typeorm
		 */
		TypeOrmModule.forRootAsync({
			useFactory: (configService: ConfigService) => dbConfig(configService),
			inject: [ConfigService],
		}),
		/**
		 * import modules
		 */
		AdminModule,
		AccountModule,
		AuthModule,
		NewsModule,
		NewsImageModule,
		NewsGroupModule,
		OrderModule,
		ProductModule,
		ProductDetailsModule,
		ProductFilesModule,
		ProductImagesModule,
		ProductGroupsModule,
		MessageModule,
		PaymentModule,
		AuthModule,
		UploadModule,
	],
	controllers: [],
	providers: [
		/**
		 * import validator pipeline
		 */
		{
			provide: APP_PIPE,
			useFactory: () =>
				new ValidationPipe({
					whitelist: true,
					transform: true,
					forbidNonWhitelisted: true,
					transformOptions: {
						enableImplicitConversion: true,
					},
				}),
		},
		/**
		 * import exceptions
		 */
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter,
		},
	],
})
export class AppModule {}
