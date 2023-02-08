import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';

export const dbConfig = (
	configService: ConfigService
): TypeOrmModuleOptions => ({
	autoLoadEntities: true,
	type: configService.get<any>('database.type'),
	host: configService.get<string>('database.host'),
	port: configService.get<number>('database.port'),
	username: configService.get<string>('database.username'),
	password: configService.get<string>('database.password'),
	database: configService.get<string>('database.name'),
	migrations: ['src/database/migration/*{.ts,.js}'],
	// cli: {
	// 	migrationsDir: 'src/database/migration',
	// },
	synchronize: true,
	migrationsRun: false,
	dropSchema: true,
});

export const ormConfig = {
	type: process.env.DB_TYPE,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: ['dist/module/**/entity/*{.ts,.js}'],
	migrations: ['dist/database/migrations/*{.ts,.js}'],
	cli: {
		migrationsDir: 'dist/database/migrations',
	},

	seeds: ['dist/database/seeders/*.js'],
	factories: ['dist/database/factories/*.js'],
	synchronize: true,
};
