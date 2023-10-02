import React, { useCallback, useMemo } from 'react';

import { Card } from 'antd';

import Icon, { AntDesign } from '../../../../components/Icon';

import styles from './styles.module.scss';

const InfoCompany = ({ onEdit, accountCompany }) => {

    const handleEdit = useCallback(() => {
        onEdit('COMPANY');
    }, [onEdit]);

    const actionsIcon = useMemo(() => ([
        <Icon
            family={AntDesign}
            name="FillEdit"
            size={16}
            onClick={handleEdit}
        />,
    ]), [handleEdit]);

    if (!accountCompany) return null;

    return (
        <Card
            actions={actionsIcon}
            className={styles.container}
        >
            <p className={styles.nameCompany}>{accountCompany?.company?.tradeName}</p>
            <p className={styles.cnpjCompany}>{accountCompany?.company?.nationalRegistration}</p>
        </Card>
    );
};

export default InfoCompany;
