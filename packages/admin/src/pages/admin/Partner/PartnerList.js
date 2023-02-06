import { Avatar, Button, Input, Pagination, Select, Space, Table, Tag, Tooltip } from 'antd';
import { SearchOutlined, UserOutlined, DeleteOutlined, UnlockOutlined, ClearOutlined } from '@ant-design/icons';
const columns = [
    {
        title: 'Hình',
        dataIndex: 'avatar',
        key: 'avatar',
        render: () => <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
    },
    {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Phone',
        dataIndex: 'tel',
        key: 'tel',
    },
    {
        title: 'Ngày sinh',
        key: 'birthday',
        dataIndex: 'birthday',
       
    },
    {
        title: 'Nơi sống',
        key: 'province',
        dataIndex: 'province',

    },
    {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
        render: () => <Tag color={'green'} key={'green'}>
            NORMAL
        </Tag>

    },
    {
        title: 'Ngày tạo',
        key: 'created_at',
        dataIndex: 'created_at',
        

    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size='middle'>
                {/* <Tooltip placement='top' title={'Gửi tin nhắn'}>
                    <Button type='link' icon={<MessageOutlined />}></Button>
                </Tooltip> */}
                <Tooltip placement='top' title={'Khóa sản phẩm'}>
                    <Button type='text' icon={<UnlockOutlined />}></Button>
                </Tooltip>
                <Tooltip placement='top' title={'Xóa sản phẩm'}>
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
        name: 'John Brown',
        tel:"098.xxx.xxx.34",
        birthday: "10/10/1992",
        province:"Tp HCM",
        created_at: "10:10 20/10/2022"
      
    },
    {
        key: '2',
        name: 'John Brown',
        tel: "098.xxx.xxx.34",
        birthday: "10/10/1992",
        province: "Tp HCM",
        created_at: "10:10 20/10/2022"
    },
    {
        key: '3',
        name: 'John Brown',
        tel: "098.xxx.xxx.34",
        birthday: "10/10/1992",
        province: "Tp HCM",
        created_at:"10:10 20/10/2022"
    },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        if (selectedRows.length > 0) {
            jQuery('#list-action').show();
        } else {
            jQuery('#list-action').hide();
        }


    },
};
const onChange = (pageNumber) => {
    console.log('Page: ', pageNumber);
};

const PartnerList = () => {
    return (
        <>
            <div className='flex gap-4 mb-5 items-center'>
                Tên :
                <Input
                    style={{
                        width: 200,
                    }}
                    placeholder='Basic usage'
                />
                Phone :
                <Input
                    style={{
                        width: 200,
                    }}
                    placeholder='Basic usage'
                />
                Tỉnh :
                <Select
                    defaultValue='lucy'
                    style={{
                        width: 200,
                    }}
                    
                    options={[
                        {
                            value: 'lucy',
                            label: 'Lucy',
                        },
                    ]}
                />
               
                <Button type='primary' icon={<SearchOutlined />}>Tìm kiếm</Button>
                <Button type='link' icon={<ClearOutlined />}>Clear</Button>
            </div>
            <div className='mb-5  hidden' id='list-action'>
                <div className='flex gap-4'>
                    <Button>Default Button</Button>
                    <Button>Default Button</Button>
                    <Button>Default Button</Button>
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
export default PartnerList;
