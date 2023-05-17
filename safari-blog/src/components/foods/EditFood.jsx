import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button } from 'antd';
import { FoodContext } from '../../contexts/FoodContext';
import food_service from '../../services/food_service';

function EditFood({ food, onOk, visible }) {
  const [state, dispatch] = useContext(FoodContext);
  const [form] = Form.useForm();

  useEffect(() => {
    if (food) {
      form.setFieldsValue({
        name: food.name,
        image: food.image,
        price: food.price,
        description: food.description,
      });
    }
  }, [food]);

  const handleSave = () => {
    form.validateFields()
      .then(async values => {
        if (food) {
          await food_service.updateFood(food._id, values, dispatch);
          await food_service.fetchFoods(dispatch);
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
      title="Edit Food"
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
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: 'Please enter the food name' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="image"
          label="Image URL"
          rules={[
            { required: true, message: 'Please enter the food image URL' },
            { type: 'url', message: 'Please enter a valid URL' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: 'Please enter the food price' },
            { type: 'number', min: 0, message: 'Price must be a positive number' },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: 'Please enter the food description' },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditFood;
