import {Factory, Seeder} from 'typeorm-seeding';
import {Connection} from 'typeorm';
import {Account} from '~module/account/entity/account.entity';
import {Admin} from '~module/admin/entity/admin.entity';
import {News} from '~module/news/entity/news.entity';
import {NewsImage} from '~module/news-images/entity/news-images.entity';
import {Order} from '~module/orders/entity/order.entity';
import {ProductFiles} from '~module/product-files/entity/product-files.entity';
import {Product} from '~module/products/entity/product.entity';
import {ProductDetails} from '~module/product-details/entity/product-details.entity';
import {ProductImages} from '~module/product-images/entity/product-images.entity';
import {NewsGroup} from '~module/news-groups/entity/news-group.entity';
import {ProductGroup} from '~module/product-groups/entity/product-group.entity';

export default class CreateSeeders implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		await factory(Account)().createMany(100);
		await factory(Admin)().createMany(100);
		await factory(NewsGroup)().createMany(100);
		await factory(ProductGroup)().createMany(100);
		await factory(News)().createMany(100);
		await factory(NewsImage)().createMany(100);
		await factory(Order)().createMany(100);
		await factory(ProductFiles)().createMany(100);
		await factory(Product)().createMany(100);
		await factory(ProductDetails)().createMany(100);
		await factory(ProductImages)().createMany(100);
	}
}
