import { Avatar, Button, Input, Pagination, Select, Space, Table, Tag } from 'antd';
import ButtonAdd from '../../../components/button-add';
import { SearchOutlined, UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
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
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size='middle'>
                <Button icon={<EditOutlined />}></Button>
                <Button danger icon={<DeleteOutlined />}></Button>

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
      
    },
    {
        key: '2',
        name: 'John Brown',
        tel: "098.xxx.xxx.34",
        birthday: "10/10/1992",
        province: "Tp HCM",
    },
    {
        key: '3',
        name: 'John Brown',
        tel: "098.xxx.xxx.34",
        birthday: "10/10/1992",
        province: "Tp HCM",
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
            <div className='flex gap-4 mb-5'>
                <Input
                    style={{
                        width: 200,
                    }}
                    placeholder='Basic usage'
                />
                <Select
                    defaultValue='lucy'
                    style={{
                        width: 200,
                    }}
                    loading
                    options={[
                        {
                            value: 'lucy',
                            label: 'Lucy',
                        },
                    ]}
                />
                <Select
                    defaultValue='lucy'
                    style={{
                        width: 200,
                    }}
                    loading
                    options={[
                        {
                            value: 'lucy',
                            label: 'Lucy',
                        },
                    ]}
                />
                <Select
                    defaultValue='lucy'
                    style={{
                        width: 200,
                    }}
                    loading
                    options={[
                        {
                            value: 'lucy',
                            label: 'Lucy',
                        },
                    ]}
                />
                <Button icon={<SearchOutlined />}>Tìm kiếm</Button>
            </div>
            <div className='hidden-cover mb-4' id='list-action'>
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
            <ButtonAdd />
        </>
    );
};
export default PartnerList;
