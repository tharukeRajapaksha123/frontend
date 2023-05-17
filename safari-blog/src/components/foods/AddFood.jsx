import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, InputNumber, Button, message } from 'antd';
import { FoodContext } from '../../contexts/FoodContext';
import food_service from '../../services/food_service';

function AddFood() {
  const [state, dispatch] = useContext(FoodContext);
  const history = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    await food_service.addFood(values, dispatch);

    if (state.error) {
      message.error('Add Food failed ' + state.error);
    } else {
      message.success('Food added successfully');
      form.resetFields();
      history('/foods');
    }
  };

  return (
    <Form
      form={form}
      name="add-food"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: 'Please input the food name!' },
          { min: 3, message: 'Food name must be minimum 3 characters.' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          { required: true, message: 'Please input the food price!' },
          { type: 'number', min: 0, message: 'Price must be a positive number.' },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Image URL"
        name="image"
        rules={[
          { required: true, message: 'Please input the food image URL!' },
          { type: 'url', message: 'Please enter a valid URL.' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: 'Please input the food description!' },
          { min: 10, message: 'Description must be minimum 10 characters.' },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddFood;
