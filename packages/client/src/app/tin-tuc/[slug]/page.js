import BaseBreadcrumb from '../../../components/BaseBreadcrumb';
import BaseDivide from '../../../components/BaseDivide';
import BaseIcon from '../../../components/BaseIcon';
import {AuthorIcon, ClockIcon} from '../../../contants/icon';
import PropTypes from 'prop-types';
import {getNewsDetails} from '../../../apis/news';
import Image from 'next/image';

export default async function ProductDetails({params}) {
	const newsDetailsPromise = getNewsDetails(params.slug);
	const [newsDetails] = await Promise.all([newsDetailsPromise]);
	const {
		name,
		description,
		content,
		image,
		admin,
		news_group,
		updated_at,
		param,
	} = newsDetails;
	const options = [
		{name: 'Trang chủ', path: '/'},
		{name: 'Tin Tức', path: '/tin-tuc'},
		{name: name, path: '/' + param},
	];
	return (
		<>
			<div className='grid grid-cols-7 gap-5 w-max-1250 m-auto'>
				<div className='col-span-4  p-3  rounded-md '>
					<div className='mt-5'>
						<BaseBreadcrumb options={options} />
					</div>
					<div className='text-3xl text-center text-slate-600 font-bold mt-7 mb-2'>
						{name}
					</div>

					<div className='text-center text-sm text-gray-600 flex items-center gap-2 justify-center'>
						<BaseIcon name={'author icon'} icon={AuthorIcon} />
						{admin.name} - <BaseIcon name={'clock icon'} icon={ClockIcon} />
						{updated_at}
					</div>
					<div className='text-center my-2 text-slate-600  '>
						{description}
					</div>
					<div className='my-5'>
						<Image
							width={700}
							height={300}
							src={'http://localhost:5000/images/' + image}
							alt='hd'
						/>
					</div>

					<div
						dangerouslySetInnerHTML={{__html: content}}
						className='pt-0 m-auto leading-8 tracking-wide'></div>
					<div className='px-10'></div>
					<BaseDivide />
					<div className='text-center flex gap-3'>
						<span className='bg-white text-slate-500 text-sm border p-1 px-2'>
							nhà cấp 4
						</span>
						<span className='bg-white text-slate-500 text-sm border p-1 px-2'>
							nhà đẹp
						</span>
						<span className='bg-white text-slate-500 text-sm border p-1 px-2'>
							bản vẽ
						</span>
					</div>
					<BaseDivide />
				</div>

				<div className='col-span-2 mt-7'>
					<div className=' w-full'>
						<div className='w-5/6  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
							<div className='flex flex-col items-center pb-10 mt-10'>
								<img
									className='w-24 h-24 mb-3 rounded-full shadow-lg'
									src='https://picsum.photos/200/300'
									alt='Bonnie im'
								/>
								<h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
									Bonnie Green
								</h5>
								<span className='text-sm text-gray-500 dark:text-gray-400'>
									Visual Designer
								</span>
								<div className='flex mt-4 space-x-3 md:mt-6'>
									<a
										href='#a'
										className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
										Add friend
									</a>
									<a
										href='#a'
										className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700'>
										Message
									</a>
								</div>
							</div>
						</div>
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
