import React, { useContext, useEffect, useState } from 'react';
import { FoodContext } from '../../contexts/FoodContext';
import { Button, Popconfirm, Table } from 'antd';


import EditFood from './EditFood';
import food_service from '../../services/food_service';
import Loading from '../common/Loading,';

function FoodList() {
  const [state, dispatch] = useContext(FoodContext);
  const [shouldShowEdit, setShouldShowEdit] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    food_service.fetchFoods(dispatch);
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
              setSelectedFood(record);
            }}
          >
            Edit
          </Button>
          <span>{" "}</span>
          <Popconfirm
            title="Are you sure you want to delete this food?"
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
    await food_service.deleteFood(id, dispatch);
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
      <EditFood visible={shouldShowEdit} onOk={handleEditModal} food={selectedFood} />
      <Table dataSource={state.foods} columns={columns} rowKey="_id" />
    </>
  );
}

export default FoodList;
