'use client'
import { Breadcrumb, Card, Divider, Image, Space, Tag } from 'antd';
import React from 'react'
import {
	FacebookOutlined,
	LinkedinOutlined,
	TwitterOutlined,
	YoutubeOutlined,
	ClockCircleOutlined,
	UserOutlined,
	DownloadOutlined,
} from '@ant-design/icons';
import {Carousel} from 'antd';
const contentStyle = {
	margin: 0,
	height: '360px',
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	background: '#364d79',
};
export default function ProductDetails() {
    const onChange = (currentSlide) => {
					console.log(currentSlide);
				};
  return (
			<>
				<div className='mt-5'>
					<Breadcrumb>
						<Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
						<Breadcrumb.Item>
							<a href='#d'>Sản phẩm</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>
							<a href='#d'>Nhà cấp 4</a>
						</Breadcrumb.Item>
						<Breadcrumb.Item>Nhà cấp 4 4x20 1 phòng ngủ 1</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<div className='grid grid-cols-6 gap-5 py-5 '>
					<div className='col-span-4  p-3  rounded-md px-10'>
						<div className='text-3xl text-center text-slate-600 font-bold mt-5 mb-2'>
							MẪU NHÀ CẤP 4 4X20 1 TẦNG 2 PHÒNG NGỦ
						</div>
						<div className='text-center text-sm text-gray-600 flex items-center gap-2 justify-center'>
							<UserOutlined />
							KTS. Phan Tu Tin - <ClockCircleOutlined />
							10/10/2020
						</div>
						<div className='my-5'>
							<Carousel afterChange={onChange}>
								<div>
									<h3 style={contentStyle}>
										<Image width={970} src='https://picsum.photos/970/360' />
									</h3>
								</div>
								<div>
									<h3 style={contentStyle}>
										<Image width={970} src='https://picsum.photos/970/360' />
									</h3>
								</div>
								<div>
									<h3 style={contentStyle}>
										<Image width={970} src='https://picsum.photos/970/360' />
									</h3>
								</div>
								<div>
									<h3 style={contentStyle}>
										<Image width={970} src='https://picsum.photos/970/360' />
									</h3>
								</div>
							</Carousel>
						</div>
						<div className='px-10'>
							<div className='relative overflow-x-auto'>
								<p className='mb-5'>THÔNG SỐ KỸ THUẬT</p>
								<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
									<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
										<tr>
											<th scope='col' className='px-6 py-3'>
												Product name
											</th>
											<th scope='col' className='px-6 py-3'>
												Color
											</th>
											<th scope='col' className='px-6 py-3'>
												Category
											</th>
											<th scope='col' className='px-6 py-3'>
												Price
											</th>
										</tr>
									</thead>
									<tbody>
										<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
											<th
												scope='row'
												className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
												Apple MacBook Pro 17
											</th>
											<td className='px-6 py-4'>Sliver</td>
											<td className='px-6 py-4'>Laptop</td>
											<td className='px-6 py-4'>$2999</td>
										</tr>
										<tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
											<th
												scope='row'
												className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
												Microsoft Surface Pro
											</th>
											<td className='px-6 py-4'>White</td>
											<td className='px-6 py-4'>Laptop PC</td>
											<td className='px-6 py-4'>$1999</td>
										</tr>
										<tr className='bg-white dark:bg-gray-800'>
											<th
												scope='row'
												className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
												Magic Mouse 2
											</th>
											<td className='px-6 py-4'>Black</td>
											<td className='px-6 py-4'>Accessories</td>
											<td className='px-6 py-4'>$99</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<p className='mb-5 px-10 mt-10'>THÔNG SỐ KỸ THUẬT</p>
						<div className='p-10 pt-0 m-auto leading-7 '>
							The standard Lorem Ipsum passage, used since the 1500s Lorem ipsum dolor
							sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
							ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
							exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
							Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
							dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
							proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45
							BC Sed ut perspiciatis unde omnis iste natus error sit voluptatem
							accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
							illo inventore veritatis et quasi architecto beatae vitae dicta sunt
							explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
							odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
							voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
							quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
							eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
							voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
							corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
							Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
							nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
							voluptas nulla pariatur? 1914 translation by H. Rackham But I must
							explain to you how all this mistaken idea of denouncing pleasure and
							praising pain was born and I will give you a complete account of the
							system, and expound the actual teachings of the great explorer of the
							truth, the master-builder of human happiness. No one rejects, dislikes,
							or avoids pleasure itself, because it is pleasure, but because those who
							do not know how to pursue pleasure rationally encounter consequences that
							are extremely painful. Nor again is there anyone who loves or pursues or
							desires to obtain pain of itself, because it is pain, but because
							occasionally circumstances occur in which toil and pain can procure him
							some great pleasure. To take a trivial example, which of us ever
							undertakes laborious physical exercise, except to obtain some advantage
							from it? But who has any right to find fault with a man who chooses to
							enjoy a pleasure that has no annoying consequences, or one who avoids a
							pain that produces no resultant pleasure? Section 1.10.33 of de Finibus
							Bonorum et Malorum, written by Cicero in 45 BC At vero eos et accusamus
							et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
							deleniti atque corrupti quos dolores et quas molestias excepturi sint
							occaecati cupiditate non provident, similique sunt in culpa qui officia
							deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem
							rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta
							nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
							placeat facere possimus, omnis voluptas assumenda est, omnis dolor
							repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum
							necessitatibus saepe eveniet ut et voluptates repudiandae sint et
							molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
							delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
							perferendis doloribus asperiores repellat. 1914 translation by H. Rackham
							On the other hand, we denounce with righteous indignation and dislike men
							who are so beguiled and demoralized by the charms of pleasure of the
							moment, so blinded by desire, that they cannot foresee the pain and
							trouble that are bound to ensue; and equal blame belongs to those who
							fail in their duty through weakness of will, which is the same as saying
							through shrinking from toil and pain. These cases are perfectly simple
							and easy to distinguish. In a free hour, when our power of choice is
							untrammelled and when nothing prevents our being able to do what we like
							best, every pleasure is to be welcomed and every pain avoided. But in
							certain circumstances and owing to the claims of duty or the obligations
							of business it will frequently occur that pleasures have to be repudiated
							and annoyances accepted. The wise man therefore always holds in these
							matters to this principle of selection: he rejects pleasures to secure
							other greater pleasures, or else he endures pains to avoid worse pains.
						</div>
						<div className='px-10'>
							<Tag>Tag 1</Tag> <Tag>Tag 1</Tag>
							<Tag>Tag 1</Tag> <Tag>Tag 1</Tag>
						</div>
						<Divider />
						<div className='text-center'>
							<Space size={[0, 8]} wrap>
								<Tag icon={<TwitterOutlined />} color='#55acee'>
									Twitter
								</Tag>
								<Tag icon={<YoutubeOutlined />} color='#cd201f'>
									Youtube
								</Tag>
								<Tag icon={<FacebookOutlined />} color='#3b5999'>
									Facebook
								</Tag>
								<Tag icon={<LinkedinOutlined />} color='#55acee'>
									LinkedIn
								</Tag>
							</Space>
						</div>
						<Divider />
					</div>

					<div className='col-span-2'>
						<div className='w-5/6'>
							<Card title='MUA BẢN VẼ' bordered={false}>
								<p>Thanh toán bảo mật</p>
								<p>Hỗ trợ 24/7 </p>
								<p>Đảm bảo chất lượng</p>
								<button className='bg-rose-500 text-white p-2 w-full rounded-md shadow-md mt-5 flex items-center gap-2 justify-center'>
									<DownloadOutlined />
									DOWNLOAD
								</button>
							</Card>
						</div>
						<div className='mt-5 w-full'>
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
						</div>
					</div>
				</div>
			</>
		);
}
