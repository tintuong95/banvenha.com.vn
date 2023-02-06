import {Button, Input, Pagination, QRCode, Table, Tag} from 'antd';
import { SearchOutlined, DownCircleOutlined, ClearOutlined, FileExcelOutlined, PrinterOutlined } from '@ant-design/icons';
const columns = [
	{
		title: 'QRCode',
		dataIndex: 'qrcode',
		key: 'qrcode',
		render: () => <QRCode size={60} value='https://ant.design/' />,
	},
	{
		title: 'Mã',
		dataIndex: 'code',
		key: 'code',
	},
    {
        title: 'Người mua',
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
		title: 'Giá bán',
		dataIndex: 'price',
		key: 'price',
		render: (text) => <Tag color="red">{text}</Tag>
	},
    {
        title: 'Thanh toán',
        dataIndex: 'payment',
        key: 'payment',
        render:()=>{
            return <div className='w-full text-center'>
                <DownCircleOutlined style={{color:"green"}}/>
            </div>
        }
    },
	{
		title: 'Thời gian',
		dataIndex: 'updated_at',
		key: 'updated_at',
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
        email:'xxxx@mail.com'
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
        email: 'xxxx@mail.com'
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
        email: 'xxxx@mail.com'
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

const OrderList = () => {
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
                Người mua :
                <Input
                    style={{
                        width: 200,
                    }}
                    placeholder='Basic usage'
                />
                Đối tác :
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
					
                    <Button type='link' icon={<PrinterOutlined />}>In</Button>
                    <Button type='link' icon={<FileExcelOutlined />}>Excel</Button>
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
export default OrderList;
