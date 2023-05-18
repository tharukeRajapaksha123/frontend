import React, { useContext } from 'react';
import { Spin } from 'antd';

function Loading() {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Spin size="large" />
        </div>
    );
}

export default Loading;
