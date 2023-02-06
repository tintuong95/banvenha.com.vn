import {ConfigModuleOptions} from '@nestjs/config';

export const configuration = () => ({
	port: parseInt(process.env.PORT, 10) || 3000,
	database: {
		host: process.env.DB_HOST || 'localhost',
		port: parseInt(process.env.DB_PORT, 10) || 3306,
		type: process.env.DB_TYPE || 'mysql',
		username: process.env.DB_USERNAME || 'root',
		password: process.env.DB_PASSWORD || '',
		name: process.env.DB_NAME || 'test',
	},
});

export const envConfig: ConfigModuleOptions = {
	isGlobal: true,
	load: [configuration],
	envFilePath: '.env',
};
