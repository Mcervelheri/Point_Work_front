import React, { useCallback } from 'react';

import { Button } from 'antd';

import RechargeInfoDialog from '../RechargeInfoDialog';

const ButtonMoreInfo = ({ id, dataModal }) => {

    const handleOpenModal = useCallback(() => {
        RechargeInfoDialog.show({
            id,
            dataModal,
        });
    }, [id, dataModal]);

    return (
        <Button onClick={handleOpenModal}>••• Mais informações</Button>
    );
};

export default ButtonMoreInfo;
