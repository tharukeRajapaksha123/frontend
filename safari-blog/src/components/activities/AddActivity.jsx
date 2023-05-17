import React, { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, InputNumber, Button, message, Upload } from 'antd';
import { ActivityContext } from '../../contexts/ActivityContext';
import activity_service from '../../services/activity_service';
import { UploadOutlined } from '@ant-design/icons';
import LoadingContext from '../../contexts/LoadingContext';
import file_upload_service from '../../services/file_upload_service';
function AddActivity() {
  const [state, dispatch] = useContext(ActivityContext);
  const [loadingState, loadingDispatch] = useContext(LoadingContext)
  const history = useNavigate();
  const [form] = Form.useForm();
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageUrl, setImageUrl] = useState(null);
  const handleSubmit = async (values) => {
    await file_upload_service.uploadImage(selectedImage, loadingDispatch).then(async url => {
      await activity_service.addActivity({...values,image : url}, dispatch);
      if (state.error) {
        message.error('Add Activity failed ' + state.error);
      } else {
        message.success('Activity added successfully');
        form.resetFields();
        history('/activities');
      }
    }).catch(err => {
      message.error('Add Activity failed ');
    })
  };
  const handleImageUpload = (info) => {
    if (info.file.status === 'done') {
      const imageUrl = URL.createObjectURL(info.file.originFileObj);
      setSelectedImage(info.file)
      setImageUrl(imageUrl);
    }
  };

  return (
    <Form
      form={form}
      name="add-activity"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      autoComplete="off"
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: 'Please input the activity name!' },
          { min: 3, message: 'Activity name must be minimum 3 characters.' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          { required: true, message: 'Please input the activity price!' },
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
        ]}
      >
        <Upload
          name="image"
          accept="image/*"
          beforeUpload={() => false}
          onChange={handleImageUpload}
        >
          <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>
        {imageUrl && <img src={imageUrl} alt="Safari" style={{ width: '100%', marginTop: 10 }} />}
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: 'Please input the activity description!' },
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

export default AddActivity;
