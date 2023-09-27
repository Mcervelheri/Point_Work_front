import React from 'react';

import TagResultOperation from '../domains/PasswordChangeHistory/components/TagResultOperation';
import TagTypeOperation from '../domains/PasswordChangeHistory/components/TagTypeOperation';
import { formatDate } from '../helpers/date-helper';
import { maskCPF } from '../helpers/masks';

export const PASSWORD_CHANGE_HISTORY_TABLE_COLUMNS = [
    {
        title: 'CPF',
        dataIndex: 'clientIdentification',
        key: 'clientIdentification',
        render: value => maskCPF(value),
        sorter: true,
    },
    {
        title: 'Código do dispositivo',
        dataIndex: 'deviceId',
        key: 'deviceId',
        sorter: true,
    },
    {
        title: 'Data/hora',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: value => formatDate(value, 'DD/MM/YYYY HH:mm:ss'),
        sorter: true,
    },
    {
        title: 'Operação',
        key: 'operation',
        dataIndex: 'operation',
        render: type => {
            return (
                <TagTypeOperation type={type} />
            );
        },
        sorter: true,
    },
    {
        title: 'Resultado da operação',
        key: 'operationResult',
        dataIndex: 'operationResult',
        render: result => {
            return (
                <TagResultOperation isSuccess={result} />
            );
        },
        sorter: true,
    },
];
