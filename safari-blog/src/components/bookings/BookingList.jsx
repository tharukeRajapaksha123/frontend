import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import config from '../../config';

function BookingList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${config.baseUrl}/book-controller`);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Selected Activities',
      dataIndex: 'selectedActivities',
      key: 'selectedActivities',
      render: (selectedActivities) => (
        <ul>
          {selectedActivities.map((activity) => (
            <li key={activity}>{activity}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Selected Foods',
      dataIndex: 'selectedFoods',
      key: 'selectedFoods',
      render: (selectedFoods) => (
        <ul>
          {selectedFoods.map((food) => (
            <li key={food}>{food}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Selected Rooms',
      dataIndex: 'selectedRooms',
      key: 'selectedRooms',
      render: (selectedRooms) => (
        <ul>
          {selectedRooms.map((room) => (
            <li key={room}>{room}</li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Selected Safaris',
      dataIndex: 'selectedSafaris',
      key: 'selectedSafaris',
      render: (selectedSafaris) => (
        <ul>
          {selectedSafaris.map((safari) => (
            <li key={safari}>{safari}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <Table dataSource={bookings} columns={columns} rowKey="_id" />
  );
}

export default BookingList;
