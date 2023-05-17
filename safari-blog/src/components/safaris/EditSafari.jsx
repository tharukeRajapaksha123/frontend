import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Button, Popconfirm, message } from 'antd';
import safari_service from '../../services/safari_service';

function EditSafari({ safari, onSave, visible, dispatch }) {

  const [form] = Form.useForm();

  useEffect(() => {
    if (safari) {
      form.setFieldsValue({
        name: safari.name,
        image: safari.image,
        price: safari.price,
        description: safari.description,
      });
    }
  })

  const handleSave = async () => {
    form.validateFields()
      .then(async values => {
        await safari_service.updateSafari(safari._id, values, dispatch).catch(err => {
          message.error("Error updating safari")
        })
        await safari_service.fetchSafarise(dispatch);
        onSave();
      })
      .catch(error => {
        console.log('Validation error:', error);
      });
  };

  const handleDelete = async () => {
    await safari_service.deleteSafari(safari._id, dispatch)

  };



  return (
    <>
      <Modal
        title="Edit Safari"
        visible={visible}
        onCancel={onSave}
        footer={[
          <Button key="cancel" onClick={onSave}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        {safari && <img src={safari.image} style={{ width: "100%", height: "100%", margin: "8px 0" }} />}

        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: 'Please enter the safari name' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: 'Please enter the safari price' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please enter the safari description' },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

        </Form>
      </Modal>
    </>
  );
}

export default EditSafari;
