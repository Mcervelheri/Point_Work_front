import React from 'react';

import { Card } from 'antd';

import styles from './styles.module.scss';

const CardNotice = ({ title, message }) => {
    return (
        <Card title={title} className={styles.container}>
            <p>{message}</p>
        </Card>
    );
};

export default CardNotice;
