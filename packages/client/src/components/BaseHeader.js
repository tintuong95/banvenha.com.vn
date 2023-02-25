import React, {use} from 'react';
import Link from 'next/link';
import {LoginIcon, MailIcon, PhoneIcon, UserIcon} from '../contants/icon';
import BaseIcon from './BaseIcon';
import BaseDropdown from './BaseDropdown';
import {Logo} from '../contants/image';
import Image from 'next/image';
import {getGroupProductList} from '../apis/product';
import {getGroupNewsList} from '../apis/news';
import BtnLogin from './BtnLogin';

export default async function BaseHeader() {
	const productGroupPromise = getGroupProductList();
	const newsGroupPromise = getGroupNewsList();

	const [newsGroup, productGroup] = await Promise.all([
		newsGroupPromise,
		productGroupPromise,
	]);

	const options = (list) => {
		return list?.map((item) => ({
			name: item.name,
			group_id: item.id,
		}));
	};
	return (
		<>
			<div className='w-max-1250 m-auto flex justify-end gap-3 my-2'>
				<span className='text-sm flex items-center gap-1 text-slate-500'>
					<BaseIcon icon={MailIcon} name={'mail icon'} />
					admin@banvenha.com.vn
				</span>
				|
				<span className='text-sm flex items-center gap-1 text-slate-500'>
					<BaseIcon icon={PhoneIcon} name={'phone icon'} />
					0977.777.77
				</span>
			</div>
			<div className='w-screen bg-gray-800'>
				<nav className='py-6 w-max-1250 m-auto '>
					<div className='container flex flex-wrap items-center justify-between mx-auto'>
						<Link href={{pathname: '/'}}>
							<p className='flex gap-3  items-center text-white shaw text-xl font-semibold m-0'>
								<Image
									className='w-8 hover:animate-spin delay-100'
									src={Logo}
									alt='logo'
								/>
								BANVENHA.COM.VN
							</p>
						</Link>

						<div className='flex gap-5 items-center text-sm'>
							<Link
								className='text-white  py-2   border-b-2 border-gray-800 transform transition duration-500 hover:border-b-rose-500 '
								href={{pathname: '/'}}>
								TRANG CHỦ
							</Link>

							<BaseDropdown
								nameBtn={'SẢN PHẨM'}
								menu={options(productGroup)}
								pathname={'/san-pham'}
							/>
							<BaseDropdown
								nameBtn={'TIN TỨC'}
								menu={options(newsGroup)}
								pathname={'/tin-tuc'}
							/>
							<BaseDropdown
								nameBtn={'ĐỐI TÁC'}
								menu={[
									{name: 'Bản vẽ nhà cấp 4', pathname: '/san-pham/ban-ve-nha-cap-4'},
									{name: 'Bản vẽ phố', pathname: '/san-pham/ban-ve-nha-cap-41'},
									{name: 'Bản vẽ biệt thự', pathname: '/san-pham/ban-ve-nha-cap-42'},
									{name: 'Bản vẽ nhà vườn', pathname: '/san-pham/ban-ve-nha-cap-43'},
									{name: 'Bản vẽ nội thất', pathname: '/san-pham/ban-ve-nha-cap-44'},
									{name: 'Bản vẽ nhà xưởng', pathname: '/san-pham/ban-ve-nha-cap-45'},
									{name: 'Bản vẽ nhà xưởng', pathname: '/san-pham/ban-ve-nha-cap-64'},
									{name: 'Bản vẽ điện nước', pathname: '/san-pham/ban-ve-nha-cap-47'},
									{name: 'Bản vẽ nhà xưởng', pathname: '/san-pham/ban-ve-nha-cap-45'},
									{name: 'Bản vẽ nhà xưởng', pathname: '/san-pham/ban-ve-nha-cap-64'},
									{name: 'Bản vẽ điện nước', pathname: '/san-pham/ban-ve-nha-cap-47'},
								]}
								pathname={'/doi-tac'}
							/>
							<BaseDropdown
								nameBtn={'THÔNG TIN'}
								menu={[
									{name: 'Bản vẽ nhà cấp 4', pathname: '/san-pham/ban-ve-nha-cap-4'},
									{name: 'Bản vẽ phố', pathname: '/san-pham/ban-ve-nha-cap-41'},
									{name: 'Bản vẽ biệt thự', pathname: '/san-pham/ban-ve-nha-cap-42'},
									{name: 'Bản vẽ nhà vườn', pathname: '/san-pham/ban-ve-nha-cap-43'},
									{name: 'Bản vẽ nội thất', pathname: '/san-pham/ban-ve-nha-cap-44'},
									{name: 'Bản vẽ nhà xưởng', pathname: '/san-pham/ban-ve-nha-cap-45'},
									{name: 'Bản vẽ nhà xưởng', pathname: '/san-pham/ban-ve-nha-cap-64'},
									{name: 'Bản vẽ điện nước', pathname: '/san-pham/ban-ve-nha-cap-47'},
									{name: 'Bản vẽ nhà xưởng', pathname: '/san-pham/ban-ve-nha-cap-45'},
									{name: 'Bản vẽ nhà xưởng', pathname: '/san-pham/ban-ve-nha-cap-64'},
									{name: 'Bản vẽ điện nước', pathname: '/san-pham/ban-ve-nha-cap-47'},
								]}
								pathname={'/thong-tin'}
							/>
							<BtnLogin/>
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}
