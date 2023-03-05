import {forwardRef, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {envConfig} from '~config/configuration';
import {dbConfig} from '~config/db.config';
import {AccountModule} from '~module/account/account.module';
import {APP_FILTER, APP_PIPE} from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common/pipes';
import {HttpExceptionFilter} from '~util/exception.filter';

import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import {BlogModule} from '~module/blog/blog.module';
import {BlogGroupModule} from '~module/blogGroup/blogGroup.module';
import {BlogTagModule} from '~module/blogTag/blogTag.module';
import {BlogTagRelationModule} from '~module/blogTagRelation/blogTagRelation.module';
import {MessageModule} from '~module/message/message.module';
import {OrderModule} from '~module/orders/order.module';
import {PaymentModule} from '~module/payment/payment.module';
import {ProductModule} from '~module/product/product.module';
import {ProductGroupsModule} from '~module/productGroup/productGroup.module';
import {ProductTagsModule} from '~module/productTag/productTag.module';
import {ProductTagRelationsModule} from '~module/productTagRelation/productTagRelation.module';
import {AuthModule} from '~module/auth/auth.module';
import {ProductPhotoListsModule} from '~module/productPhotoList/productPhotoList.module';
import {UploadModule} from '~module/upload/upload.module';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'uploads'),
			serveStaticOptions: {
				setHeaders(res, path, stat) {
					res.header('Cross-Origin-Resource-Policy', 'cross-origin');
				},
			},
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

		AuthModule,
		BlogModule,
		OrderModule,
		UploadModule,
		AccountModule,
		BlogTagModule,
		MessageModule,
		PaymentModule,
		ProductModule,
		BlogGroupModule,
		ProductTagsModule,
		ProductGroupsModule,
		BlogTagRelationModule,
		ProductTagRelationsModule,
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
