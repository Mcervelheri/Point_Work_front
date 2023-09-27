import React, { useCallback } from 'react';

import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import EditClientVipDialog from '../EditClientVipDialog';

const ButtonEditClientVip = ({
    name, nationalRegistration, id,
    onRefresh, disabled,
}) => {

    const handleEditClient = useCallback(() => {
        EditClientVipDialog.show({
            id,
            currentName: name,
            currentNationalRegistration: nationalRegistration,
            onRefresh,
        });
    }, [id, name, nationalRegistration, onRefresh]);

    return (
        <Button
            icon={<EditOutlined />}
            size="small"
            onClick={handleEditClient}
            disabled={disabled}
        >
            Editar
        </Button>
    );
};

export default ButtonEditClientVip;
