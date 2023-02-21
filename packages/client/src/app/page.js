import BaseSection from '../components/BaseSection';
import Keyword from '../components/Keyword';
import PropTypes from 'prop-types';
import TextAnimation from '../components/TextAnimation';
import {getGroupProductList} from '../apis/product';
import BaseSearch from '../components/BaseSearch';

export default async function Home() {
	const productGroupPromise = getGroupProductList();
	const [productGroup] = await Promise.all([productGroupPromise]);

	const RenderProductGroupList = ({groups}) => {
		return groups.map((item) => (
			<BaseSection groupId={item.id} name={item.name} key={item.id} />
		));
	};

	return (
		<div className='r'>
			<div className=' h-96 flex items-center justify-center flex-col gap-5 bg-tranform'>
				<h1 className=' text-4xl font-bold  text-transparent text-white mb-5'>
					<TextAnimation />
				</h1>

				<BaseSearch />
			</div>
			<div className='w-max-1250 m-auto'>
				<RenderProductGroupList groups={productGroup} />

				<Keyword />
				<div className='flex justify-center gap-10 mt-10 p-5'>
					<span className='text-3xl font-extrabold text-gray-300 hover:scale-110 transition-all transform '>
						FETCH.COM.VN
					</span>
					<span className='text-3xl font-extrabold text-gray-300 hover:scale-110 transition-all transform '>
						BLOG.XAYDUNG.COM
					</span>
					<span className='text-3xl font-extrabold text-gray-300 hover:scale-110 transition-all transform '>
						THANH HOA
					</span>
				</div>
			</div>
		</div>
	);
}

Home.propTypes = {
	products: PropTypes.array,
};
