import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, InputNumber, Button, message, Upload } from 'antd';
import { RoomContext } from '../../contexts/RoomContext';
import room_service from '../../services/room_service';
import { UploadOutlined } from '@ant-design/icons';

import LoadingContext from '../../contexts/LoadingContext';
import file_upload_service from '../../services/file_upload_service';
function AddRoom() {
  const [state, dispatch] = useContext(RoomContext);
  const [loadingState, loadingDispatch] = useContext(LoadingContext)
  const history = useNavigate();
  const [form] = Form.useForm();
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = async (values) => {
    console.log(selectedImage)
    await file_upload_service.uploadImage(selectedImage, loadingDispatch).then(async url => {
      await room_service.addRoom({ ...values, image: url }, dispatch).then((val) => {
        message.success('Room added successfully');
        form.resetFields();
        history('/rooms');

      }).catch(err => {
        dispatch({
          type: "ERROR",
          payload: err
        })
      });

    }).catch(err => {
      console.log("add safari failed " + err)
      message.error("Room Adding Failed")
    })
      ;

  };

  const handleImageUpload = async (file) => {
    try {
      setSelectedImage(file)
      console.log("file seted")
    } catch (error) {
      message.error('Failed to upload image');
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
        label="Image"
        name="image"
        rules={[
          { required: true, message: 'Please select an image!' },
        ]}
      >
        <Upload
          name="image"
          accept="image/*"
          beforeUpload={() => false}
          onChange={(info) => handleImageUpload(info.file)}
        >
          <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>
        {imageUrl && <img src={imageUrl} alt="Safari" style={{ width: '100%', marginTop: 10 }} />}
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
