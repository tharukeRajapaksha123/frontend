import React, { useContext, useEffect, useState } from 'react';
import { RoomContext } from '../../contexts/RoomContext';
import { Button, Popconfirm, Table } from 'antd';
import room_service from '../../services/room_service';

import EditRoom from './EditRoom';
import Loading from '../common/Loading,';

function RoomList() {
  const [state, dispatch] = useContext(RoomContext);
  const [shouldShowEdit, setShouldShowEdit] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    room_service.fetchRooms(dispatch);
  }, [dispatch]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Number of Beds',
      dataIndex: 'num_of_beds',
      key: 'numOfBeds',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            onClick={() => {
              setShouldShowEdit(true);
              setSelectedRoom(record);
            }}
          >
            Edit
          </Button>
          <span>{" "}</span>
          <Popconfirm
            title="Are you sure you want to delete this room?"
            okText="Yes"
            okButtonProps={{ danger: true }}
            cancelText="No"
            onConfirm={() => {
              handleDelete(record._id);
            }}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const handleDelete = async (id) => {
    await room_service.deleteRoom(id, dispatch);
  };

  const handleEditModal = () => {
    setShouldShowEdit(false);
  };

  if (state.loading) {
    return <Loading />;
  }

  if (state.error) {
    return <p>{state.error}</p>;
  }

  return (
    <>
      <EditRoom visible={shouldShowEdit} onOk={handleEditModal} room={selectedRoom} />
      <Table dataSource={state.rooms} columns={columns} rowKey="_id" />
    </>
  );
}

export default RoomList;
