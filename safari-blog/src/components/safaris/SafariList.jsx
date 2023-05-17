import React, { useContext, useEffect, useState } from 'react';
import EditSafari from "./EditSafari"
import { Button, Table, Spin, Popconfirm } from 'antd';
import safari_service from '../../services/safari_service';
import SafariContext from '../../contexts/SafariContext';

function SafariList() {
    const [state, dispatch] = useContext(SafariContext);
    const [shouldShowEdit, setShouldShowEdit] = useState(false);
    const [selectedSafari, setSelectedSafari] = useState(null);

    useEffect(() => {
        safari_service.fetchSafarise(dispatch);
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

                            setSelectedSafari(record);
                            setShouldShowEdit(true);
                        }}
                    >
                        Edit
                    </Button>
                    <span>{" "}</span>
                    <Popconfirm
                        title="Are you sure you want to delete this safari?"
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
        await safari_service.deleteSafari(id, dispatch);
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
            <EditSafari visible={shouldShowEdit} onSave={handleEditModal} safari={selectedSafari} dispatch={dispatch} />
            <Table dataSource={state.safaris} columns={columns} rowKey="_id" />
        </>
    );
}

export default SafariList;
