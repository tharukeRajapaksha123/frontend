import React, { useContext, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button } from 'antd';
import { RoomContext } from '../../contexts/RoomContext';
import room_service from '../../services/room_service';

function EditRoom({ room, onOk, visible }) {
  const [state, dispatch] = useContext(RoomContext);
  const [form] = Form.useForm();

  useEffect(() => {
    if (room) {
      form.setFieldsValue({
        name: room.name,
        image: room.image,
        price: room.price,
        numOfBeds: room.num_of_beds,
        description: room.description,
      });
    }
  }, [room]);

  const handleSave = () => {
    form.validateFields()
      .then(async values => {
        if (room) {
          await room_service.updateRoom(room._id, { ...values, num_of_beds: values.numOfBeds }, dispatch);
          await room_service.fetchRooms(dispatch);
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
      title="Edit Room"
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
      {room && <img src={room.image} alt="room" style={{ width: "100%", heght: "100%" }} />}
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: 'Please enter the room name' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="image"
          label="Image URL"
          rules={[
            { required: true, message: 'Please enter the room image URL' },
            { type: 'url', message: 'Please enter a valid URL' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[
            { required: true, message: 'Please enter the room price' },
            { type: 'number', min: 0, message: 'Price must be a positive number' },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="numOfBeds"
          label="Number of Beds"
          rules={[
            { required: true, message: 'Please enter the number of beds' },
            { type: 'number', min: 1, message: 'Number of beds must be a positive number' },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            { required: true, message: 'Please enter the room description' },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditRoom;
