import React, { useContext, useEffect, useState } from 'react';
import { ActivityContext } from '../../contexts/ActivityContext';
import { Button, Popconfirm, Table } from 'antd';
import activity_service from '../../services/activity_service';

import EditActivity from './EditActivity';
import Loading from '../common/Loading,';

function ActivityList() {
  const [state, dispatch] = useContext(ActivityContext);
  const [shouldShowEdit, setShouldShowEdit] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    activity_service.fetchActivitys(dispatch);
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
              setSelectedActivity(record);
            }}
          >
            Edit
          </Button>
          <span>{" "}</span>
          <Popconfirm
            title="Are you sure you want to delete this activity?"
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
    await activity_service.deleteActivity(id, dispatch);
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
      <EditActivity visible={shouldShowEdit} onOk={handleEditModal} activity={selectedActivity} />
      <Table dataSource={state.activities} columns={columns} rowKey="_id" />
    </>
  );
}

export default ActivityList;
