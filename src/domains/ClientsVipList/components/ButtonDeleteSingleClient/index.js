import React, { useCallback } from 'react';

import { UserDeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import DeleteClientVipDialog from '../DeleteClientVipDialog';
import styles from './styles.module.scss';

const ButtonDeleteSingleClient = ({ ids, onRefresh, disabled }) => {

    const handleDeleteClient = useCallback(() => {
        DeleteClientVipDialog.show({
            ids,
            onRefresh,
        });
    }, [ids, onRefresh]);

    return (
        <Button
            icon={<UserDeleteOutlined />}
            size="small"
            className={styles.buttonDelete}
            onClick={handleDeleteClient}
            danger
            disabled={disabled}
        >
            Excluir
        </Button>
    );
};

export default ButtonDeleteSingleClient;
