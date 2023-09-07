import React from 'react';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { FormInstance } from 'antd/lib/form';
import axiosClient from "./../../API/axios.config";


const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
interface FormLoginProps {
  open: boolean;
  FormRef: React.RefObject<FormInstance>;
  onCancel: () => void;
}
const FormLogin = ({ open, onCancel }: FormLoginProps) => {
  const onFinish = (values: any) => {
    try {
      const info = JSON.stringify(values)
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'mode': 'no-cors',
        },
      };
      // /const res =
       axiosClient.post("/loginToken", info,config).then((response) => {
       // console.log("data"+ response.data.token);
        // Lưu dữ liệu vào Local Storage
        sessionStorage.setItem('Token',response.data.token );
        location.reload();
        return response.data.token
      });
      //  console.log("dattaaa" + getProduct);
    } catch (error) {
      // Xử lý lỗi ở đây (ví dụ: thông báo lỗi, ghi log, ...)
      throw error;
    }
  
  };
  console.log("===========" + open)
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer ={null}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        
      >
        <div className='pe-5 pt-5'>
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  )
};
export default FormLogin