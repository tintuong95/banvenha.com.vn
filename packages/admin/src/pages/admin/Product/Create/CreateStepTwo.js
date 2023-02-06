import { Form, Input } from 'antd'
import React from 'react'

export default function CreateStepTwo() {
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
            <Form.Item label="Chiều rộng">
                <Input />
            </Form.Item>
            <Form.Item label="Chiều dài">
                <Input />
            </Form.Item>
            <Form.Item label="Diện tích ">
                <Input />
            </Form.Item>
            <Form.Item label="Số phòng ngủ">
                <Input />
            </Form.Item>
            <Form.Item label="Số tầng">
                <Input />
            </Form.Item>
            <Form.Item label="File">
                <Input />
            </Form.Item>
        </Form>
    )
}
