import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, InputNumber, Button, message } from 'antd';
import { ActivityContext } from '../../contexts/ActivityContext';
import activity_service from '../../services/activity_service';

function AddActivity() {
  const [state, dispatch] = useContext(ActivityContext);
  const history = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    await activity_service.addActivity(values, dispatch);

    if (state.error) {
      message.error('Add Activity failed ' + state.error);
    } else {
      message.success('Activity added successfully');
      form.resetFields();
      history('/activities');
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
          { required: true, message: 'Please input the activity image URL!' },
          { type: 'url', message: 'Please enter a valid URL.' },
        ]}
      >
        <Input />
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
