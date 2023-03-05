import BaseBreadcrumb from '../../../components/BaseBreadcrumb';
import BaseDivide from '../../../components/BaseDivide';
import BaseIcon from '../../../components/BaseIcon';
import {AuthorIcon, ClockIcon, LabelIcon} from '../../../contants/icon';
import PropTypes from 'prop-types';
import {getNewsDetails} from '../../../apis/news';
import Image from 'next/image';
import BaseCardAuthor from '../../../components/BaseCardAuthor';

export default async function ProductDetails({params}) {
	const newsDetailsPromise = getNewsDetails(params.slug);
	const [newsDetails] = await Promise.all([newsDetailsPromise]);
	const {
		title,
		description,
		content,
		photo,
		account,
		news_group,
		updatedAt,
		param,
	} = newsDetails;
	const options = [
		{name: 'Trang chủ', path: '/'},
		{name: 'Tin Tức', path: '/blog'},
		{name: title, path: '/' + param},
	];
	return (
		<>
			<div className='grid grid-cols-7 gap-5 w-max-1250 m-auto'>
				<div className='col-span-4  p-3  rounded-md '>
					<div className='mt-5'>
						<BaseBreadcrumb options={options} />
					</div>

					<div className='text-3xl text-center text-slate-600 font-bold mt-7 mb-2'>
						{title}
					</div>

					<div className='text-center text-sm text-gray-400 pb-4 flex items-center gap-2 justify-center'>
						<BaseIcon width={20} name={'author icon'} icon={AuthorIcon} />
						{account.fullName} -
						<BaseIcon width={20} name={'clock icon'} icon={ClockIcon} />
						{new Date(updatedAt).toLocaleDateString('vi-VN')}
					</div>
					<div className='text-center my-2 text-slate-600  '>{description}</div>
					<div className='my-5'>
						<Image
							width={700}
							height={300}
							src={'http://localhost:5000/images/' + photo}
							alt='hd'
						/>
					</div>

					<div
						dangerouslySetInnerHTML={{__html: content}}
						className='pt-0 m-auto leading-8 tracking-wide'></div>
					<div className='px-10'></div>

					<div className='text-center flex gap-3 mt-5'>
						<span className=' flex items-center gap-1 text-gray-600 text-sm  p-1 px-2'>
							<BaseIcon width={20} icon={LabelIcon} />
							nhà cấp 4
						</span>
						<span className=' flex items-center gap-1 text-gray-600 text-sm  p-1 px-2'>
							<BaseIcon width={20} icon={LabelIcon} />
							nhà đẹp
						</span>
						<span className=' flex items-center gap-1 text-gray-600 text-sm  p-1 px-2'>
							<BaseIcon width={20} icon={LabelIcon} />
							bản vẽ
						</span>
					</div>
				</div>

				<div className='col-span-2 mt-7'>
					<div className=' w-full'>
						<BaseCardAuthor />
						<div className='my-5'>MỚI NHẤT</div>
						<ul className='flex flex-col list-disc gap-3 ml-3'>
							<li href='h' className='text-sm'>
								Mẫu nhà cấp 4 năm 2019 hot nhất hiện nay
							</li>
							<li href='h' className='text-sm'>
								Mẫu nhà cấp 4 năm 2019 hot nhất hiện nay
							</li>
							<li href='h' className='text-sm'>
								Mẫu nhà cấp 4 năm 2019 hot nhất hiện nay
							</li>
							<li href='h' className='text-sm'>
								Mẫu nhà cấp 4 năm 2019 hot nhất hiện nay
							</li>
							<li href='h' className='text-sm'>
								Mẫu nhà cấp 4 năm 2019 hot nhất hiện nay
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

ProductDetails.propTypes = {
	param: PropTypes.object,
};
