import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, InputNumber, Button, message } from 'antd';
import { RoomContext } from '../../contexts/RoomContext';
import room_service from '../../services/room_service';

function AddRoom() {
  const [state, dispatch] = useContext(RoomContext);
  const history = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    await room_service.addRoom(values, dispatch);

    if (state.error) {
      message.error('Add Room failed ' + state.error);
    } else {
      message.success('Room added successfully');
      form.resetFields();
      history('/rooms');
    }
  };

  return (
    <Form
      form={form}
      name="add-room"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: 'Please input the room name!' },
          { min: 3, message: 'Room name must be minimum 3 characters.' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          { required: true, message: 'Please input the room price!' },
          { type: 'number', min: 0, message: 'Price must be a positive number.' },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Number of Beds"
        name="numOfBeds"
        rules={[
          { required: true, message: 'Please input the number of beds!' },
          { type: 'number', min: 1, message: 'Number of beds must be a positive number.' },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Image URL"
        name="image"
        rules={[
          { required: true, message: 'Please input the room image URL!' },
          { type: 'url', message: 'Please enter a valid URL.' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: 'Please input the room description!' },
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

export default AddRoom;
