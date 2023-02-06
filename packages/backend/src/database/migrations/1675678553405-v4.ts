import {MigrationInterface, QueryRunner} from 'typeorm';

export class v41675678553405 implements MigrationInterface {
	name = 'v41675678553405';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`messages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`code\` varchar(20) NOT NULL, \`name\` varchar(255) NOT NULL, \`content\` varchar(255) NOT NULL, \`status\` enum ('1', '0') NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`CREATE TABLE \`news_group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(50) NOT NULL, \`param\` varchar(50) NOT NULL, \`description\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`CREATE TABLE \`accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`reference_id\` int NOT NULL, \`email\` varchar(25) NOT NULL, \`password\` varchar(100) NOT NULL, \`role\` enum ('0', '1', '2') NOT NULL, UNIQUE INDEX \`IDX_ee66de6cdc53993296d1ceb8aa\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`CREATE TABLE \`news_images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`news_id\` int NOT NULL, \`name\` varchar(50) NOT NULL, \`param\` varchar(50) NOT NULL, \`path\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`CREATE TABLE \`admins\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(30) NOT NULL, \`nickname\` varchar(30) NOT NULL, \`address\` varchar(100) NOT NULL, \`tel\` varchar(20) NOT NULL, \`avatar\` varchar(50) NOT NULL, \`status\` enum ('0', '1') NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`code\` varchar(20) NOT NULL, \`product_id\` int NOT NULL, \`partner_id\` int NOT NULL, \`email\` varchar(20) NOT NULL, \`price\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`CREATE TABLE \`partners\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(20) NOT NULL, \`nickname\` varchar(20) NOT NULL, \`address\` varchar(100) NOT NULL, \`tel\` varchar(20) NOT NULL, \`avatar\` varchar(50) NOT NULL, \`email\` varchar(25) NOT NULL, \`bank_code\` varchar(50) NULL, \`bank_name\` varchar(50) NULL, \`bank_account_type\` varchar(50) NULL, \`bank_account_number\` varchar(50) NULL, \`bank_holder\` varchar(50) NULL, \`status\` enum ('0', '1') NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`CREATE TABLE \`product_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`product_id\` int NOT NULL, \`floor\` int NOT NULL, \`bedroom\` int NOT NULL, \`width\` int NOT NULL, \`long\` int NOT NULL, \`area\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`CREATE TABLE \`news\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(50) NOT NULL, \`param\` varchar(50) NOT NULL, \`description\` varchar(100) NOT NULL, \`content\` varchar(255) NOT NULL, \`image\` varchar(50) NOT NULL, \`status\` enum ('0', '1') NOT NULL DEFAULT '0', \`state\` enum ('0', '1') NOT NULL DEFAULT '0', \`likes\` int NOT NULL DEFAULT '0', \`views\` int NOT NULL DEFAULT '0', \`creator_id\` int NOT NULL, \`group_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`CREATE TABLE \`payments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`code\` varchar(20) NOT NULL, \`bank_name\` varchar(255) NOT NULL, \`bank_number\` varchar(255) NOT NULL, \`bank_transaction\` varchar(255) NOT NULL, \`money\` int NOT NULL, \`partner_id\` int NOT NULL, \`status\` enum ('0', '1') NOT NULL DEFAULT '1', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`CREATE TABLE \`product_files\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`product_id\` int NOT NULL, \`path\` varchar(50) NOT NULL, \`type\` varchar(20) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`CREATE TABLE \`product_images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`product_id\` int NOT NULL, \`name\` varchar(50) NOT NULL, \`param\` varchar(50) NOT NULL, \`path\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`CREATE TABLE \`product_group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(50) NOT NULL, \`param\` varchar(50) NOT NULL, \`description\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
		await queryRunner.query(
			`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`code\` varchar(20) NOT NULL, \`name\` varchar(50) NOT NULL, \`param\` varchar(50) NOT NULL, \`description\` varchar(100) NOT NULL, \`content\` varchar(255) NOT NULL, \`creator_id\` int NOT NULL, \`group_id\` int NOT NULL, \`status\` enum ('0', '1') NOT NULL DEFAULT '0', \`state\` enum ('0', '1') NOT NULL DEFAULT '0', \`image\` varchar(50) NOT NULL, \`likes\` int NOT NULL DEFAULT '0', \`views\` int NOT NULL DEFAULT '0', \`price\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE \`products\``);
		await queryRunner.query(`DROP TABLE \`product_group\``);
		await queryRunner.query(`DROP TABLE \`product_images\``);
		await queryRunner.query(`DROP TABLE \`product_files\``);
		await queryRunner.query(`DROP TABLE \`payments\``);
		await queryRunner.query(`DROP TABLE \`news\``);
		await queryRunner.query(`DROP TABLE \`product_details\``);
		await queryRunner.query(`DROP TABLE \`partners\``);
		await queryRunner.query(`DROP TABLE \`orders\``);
		await queryRunner.query(`DROP TABLE \`admins\``);
		await queryRunner.query(`DROP TABLE \`news_images\``);
		await queryRunner.query(
			`DROP INDEX \`IDX_ee66de6cdc53993296d1ceb8aa\` ON \`accounts\``
		);
		await queryRunner.query(`DROP TABLE \`accounts\``);
		await queryRunner.query(`DROP TABLE \`news_group\``);
		await queryRunner.query(`DROP TABLE \`messages\``);
	}
}
