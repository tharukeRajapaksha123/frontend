import React, { useContext, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button } from 'antd';
import { ActivityContext } from '../../contexts/ActivityContext';
import activity_service from '../../services/activity_service';

function EditActivity({ activity, onOk, visible }) {
  const [state, dispatch] = useContext(ActivityContext);
  const [form] = Form.useForm();

  useEffect(() => {
    if (activity) {
      form.setFieldsValue({
        name: activity.name,
        image: activity.image,
        price: activity.price,
        description: activity.description,
      });
    }
  }, [activity]);

  const handleSave = () => {
    form.validateFields()
      .then(async values => {
        if (activity) {
          await activity_service.updateActivity(activity._id, values, dispatch);
          await activity_service.fetchActivitys(dispatch);
        }
        onOk();
      })
      .catch(error => {
        console.log('Validation error:', error);
      });
  };

  const handleCancel = () => {
    onOk();
  };

  return (
    <Modal
      title="Edit Activity"
      visible={visible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      {activity && <img src={activity.image} style={{ width: "100%", height: "100%" }} />}
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: 'Please enter the activity name' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="image"
          label="Image URL"
          rules={[
            { required: true, message: 'Please enter the activity image URL' },
            { type: 'url', message: 'Please enter a valid URL' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: 'Please enter the activity price' },
            { type: 'number', min: 0, message: 'Price must be a positive number' },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: 'Please enter the activity description' },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditActivity;
