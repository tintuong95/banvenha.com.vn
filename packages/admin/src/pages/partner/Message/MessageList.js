import {Avatar, Button, Input, Pagination, Space, Table, Tag, Tooltip, } from 'antd';
import { SearchOutlined, ClearOutlined, EyeOutlined, DeleteOutlined, MailOutlined } from '@ant-design/icons';
const columns = [

	{
		title: '',
		dataIndex: 'code',
		key: 'code',
		render: () => <Avatar shape="square" icon={<MailOutlined />} />
	},
	{
		title: 'Mã',
		dataIndex: 'code',
		key: 'code',
	},
	{
		title: 'Tiêu đề',
		dataIndex: 'title',
		key: 'title',
	},
    {
        title: 'Người nhắn',
        dataIndex: 'user',
        key: 'user',
        render: (_, record) => {
            return (
                <div className='flex flex-col '>
             
                    <span className="">{record.username}</span>
                    <span className="text-slate-400">{record.email}</span>
                </div>
            );
        },
    },

	// {
	// 	title: 'Đối tács',
	// 	dataIndex: 'partner',
	// 	key: 'partner',
	// },
	{
		title: 'Sản phẩm',
		dataIndex: 'product',
		key: 'product',
		render: (_, record) => {
			return (
				<div className='flex flex-col '>
                    <span className="text-slate-400">{record.product}</span>
                    <span className="">{record.product_name}</span>
				</div>
			);
		},
	},
	{
		title: 'Thời gian',
		dataIndex: 'updated_at',
		key: 'updated_at',
	},
	{
		title: 'Trạng thái',
		dataIndex: 'status',
		key: 'status',
		render: () => (
			<Tag color={'green'} key={'green'}>
				ĐÃ XEM
			</Tag>
		),
	},
	{
		title: 'Thao tác',
		key: 'action',
		render: () => (
			<Space size='middle'>
				{/* <Tooltip placement='top' title={'Gửi tin nhắn'}>
					<Button type='link' icon={<MessageOutlined />}></Button>
				</Tooltip> */}
				{/* <Tooltip placement='top' title={'Sửa bài viết'}>
					<Button type='link' icon={<EditOutlined />}></Button>
				</Tooltip> */}
				<Tooltip placement='top' title={'Xóa bài viết'}>
					<Button type='link' danger icon={<DeleteOutlined />}></Button>
				</Tooltip>

				{/* <Button type='link' danger icon={<DeleteOutlined />}></Button> */}
			</Space>
		),
	},


];
const data = [
	{
		key: '1',
		code: 'ZE0101',
		partner: 'John Brown',
		product: 'ZE0101',
		price: '300.000',
		updated_at: '10:10 20/02/2022',
        product_name: 'Bản vẽ nhà cấp 4 5x10m',
        username:"Tin Tưởng",
        email:'xxxx@mail.com',
		title: 'Chỉnh sửa nội dung bài viết',
	},
	{
		key: '2',
		code: 'ZE0101',
		partner: 'Jim Green',
		product: 'ZE0101',
		price: '300.000',
		updated_at: '10:10 20/02/2022',
        product_name: 'Bản vẽ nhà cấp 4 5x10m',
        username: "Tin Tưởng",
        email: 'xxxx@mail.com',
		title: 'Chỉnh sửa nội dung bài viết',
	},
	{
		key: '3',
		code: 'ZE0101',
		partner: 'Joe Black',
		product: 'ZE0101',
		price: '300.000',
		updated_at: '10:10 20/02/2022',
        product_name: 'Bản vẽ nhà cấp 4 5x10m',
        username: "Tin Tưởng",
        email: 'xxxx@mail.com',
		title: 'Chỉnh sửa nội dung bài viết',
	},
];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        if (selectedRows.length > 0) {
            jQuery('#list-action').fadeIn(500);
        } else {
            jQuery('#list-action').hide();
        }
    },
};
const onChange = (pageNumber) => {
	console.log('Page: ', pageNumber);
};

const MessageList = () => {
	return (
		<>
			<div className='flex gap-4 mb-5 items-center'>
                Mã :
				<Input
					style={{
						width: 200,
					}}
					placeholder='Basic usage'
				/>
                Người gửi :
                <Input
                    style={{
                        width: 200,
                    }}
                    placeholder='Basic usage'
                />
              
				
                <Button type='primary' icon={<SearchOutlined />}>Tìm kiếm</Button>
                <Button type='link' icon={<ClearOutlined />}>Clear</Button>
			</div>
			<div className='mb-5  hidden' id='list-action'>
				<div className='flex gap-4'>
					
					<Button type='link' icon={<EyeOutlined />}>Đã xem</Button>
					<Button type='link' icon={<DeleteOutlined />}>Xóa nhiều</Button>
				</div>
			</div>
			<Table
				rowSelection={{
					...rowSelection,
				}}
				pagination={false}
				columns={columns}
				dataSource={data}
			/>
			<div className='my-5'>
				<Pagination
					showQuickJumper
					defaultCurrent={2}
					total={500}
					onChange={onChange}
				/>
			</div>
			
		</>
	);
};
export default MessageList;
