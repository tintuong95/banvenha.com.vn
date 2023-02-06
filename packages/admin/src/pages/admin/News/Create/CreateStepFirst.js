import { Form, Input } from 'antd'
import React from 'react'

export default function CreateStepFirst() {
    return (
        <Form
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"



            
        >
            <Form.Item label="Tên bản vẽ">
                <Input />
            </Form.Item>
            <Form.Item label="Mô tả ">
                <Input />
            </Form.Item>
            <Form.Item label="Nhóm ">
                <Input />
            </Form.Item>
            <Form.Item label="Hình đại diện ">
                <Input />
            </Form.Item>
        </Form>
    )
}
