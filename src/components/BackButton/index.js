import React, { useCallback } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

import styles from './styles.module.scss';

const BackButton = ({ redirect }) => {
    const history = useHistory();

    const handleBack = useCallback(() => {
        if (redirect) return history.push(redirect);

        return history.goBack();
    }, [history, redirect]);

    return (
        <Button
            type="text"
            shape="circle"
            onClick={handleBack}
            icon={<ArrowLeftOutlined className={styles.icon} />}
            className={styles.button}
        />
    );
};

export default BackButton;
