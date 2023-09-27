import React from 'react';

import { Table } from 'antd';
import PropTypes from 'prop-types';

import ExportStatus from '../ExportStatus';
import formatDatetimeColumn from './format/format-datetime-column';

const SCROLL = {
    x: 'max-content',
};

const COLUMNS_CONFIG = [
    {
        dataIndex: 'name',
        title: 'Serviço',
    },
    {
        dataIndex: 'ticket',
        title: 'Ticket',
    },
    {
        dataIndex: 'createdAt',
        title: 'Data/Hora Solicitação',
        render: formatDatetimeColumn,
    },
    {
        dataIndex: 'updatedAt',
        title: 'Data/Hora Finalização',
        render: formatDatetimeColumn,
    },
    {
        dataIndex: 'status',
        title: 'Status',
        render: status => <ExportStatus status={status} />,
    },
];

const ExportStatusTable = ({ dataSource }) => {
    return (
        <Table
            columns={COLUMNS_CONFIG}
            dataSource={dataSource}
            rowKey="id"
            pagination={false}
            scroll={SCROLL}
        />
    );
};

ExportStatusTable.propTypes = {
    dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExportStatusTable;
