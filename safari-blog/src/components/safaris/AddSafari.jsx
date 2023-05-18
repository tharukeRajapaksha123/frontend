import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, InputNumber, Button, Upload, message } from 'antd';
import { SafariContext } from '../../contexts/SafariContext';
import { UploadOutlined } from '@ant-design/icons';
import file_upload_service from '../../services/file_upload_service';
import LoadingContext from '../../contexts/LoadingContext';
import safari_service from '../../services/safari_service';

function AddSafari() {
  const [state, dispatch] = useContext(SafariContext);
  const [loadingState, loadingDispatch] = useContext(LoadingContext)
  const history = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = async (values) => {
    if (selectedImage != null) {
      await file_upload_service.uploadImage(selectedImage, loadingDispatch).then(async url => {
        await safari_service.addSafari({ ...values, image: url }, dispatch).then((value) => {
          message.success("Safari Added Successfully")
          history("/safaris")
        }).catch(err => {
          console.log("add safari failed " + err)
          message.error("Safari Adding Failed")
        })
      });
    }
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
      name="add-safari"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: 'Please input the safari name!' },
          { min: 3, message: 'Safari name must be minimum 3 characters.' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name='image' label="Image">
        <Upload accept="image/*"
          beforeUpload={() => false}
          onChange={(info) => handleImageUpload(info.file)}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          { required: true, message: 'Please input the safari price!' },
          { type: 'number', min: 0, message: 'Price must be a positive number.' },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: 'Please input the safari description!' },
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

export default AddSafari;
