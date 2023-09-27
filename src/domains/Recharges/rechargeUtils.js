import React from 'react';

import { Tag } from 'antd';
import moment from 'moment-timezone';

import { getRechargeStatusConfig } from '../helpers/account-helper';
import { maskMoney, maskTelefone } from '../helpers/masks';

import ButtonMoreInfo from './components/ButtonMoreInfo';

export const RECHARGE_LIST_TABLE_COLUMNS = [
    {
        title: 'Ponto de Venda',
        dataIndex: 'codigoPDV',
        key: 'codigoPDV',
        sorter: (a, b) => a.codigoPDV - b.codigoPDV,
    },
    {
        title: 'Id de Op. de Recarga',
        dataIndex: 'idRechargeOperator',
        key: 'idRechargeOperator',
    },
    {
        title: 'Valor rec.',
        key: 'valueRechargeOperator',
        dataIndex: 'valueRechargeOperator',
        render: valueRechargeOperator => {
            return maskMoney(valueRechargeOperator);
        },
    },
    {
        title: 'Telefone',
        key: 'cellphoneRecharge',
        dataIndex: 'cellphoneRecharge',
        render: cellphoneRecharge => {
            return maskTelefone(cellphoneRecharge);
        },
    },
    {
        title: 'Status',
        key: 'phoneRechargeLogs',
        dataIndex: 'phoneRechargeLogs',
        sorter: (a, b) => a.phoneRechargeLogs[0]?.status > b.phoneRechargeLogs[0]?.status,
        render: phoneRechargeLogs => {
            if (!phoneRechargeLogs[0]?.status) return '-';
            return (
                <span>
                    {[phoneRechargeLogs[0]?.status].map(statusItem => {
                        const config = getRechargeStatusConfig(statusItem);
                        return (
                            <Tag color={config?.color} key={statusItem}>
                                {config?.label}
                            </Tag>
                        );
                    })}
                </span>
            );
        },
    },
    {
        title: 'Data e Hora',
        dataIndex: 'createdAt',
        key: 'createdAt',
        sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
        render: createdAt => {
            return moment(createdAt).format('llll');
        },
    },
    {
        title: 'Observação',
        dataIndex: 'phoneRechargeLogs',
        key: 'phoneRechargeLogs',
        width: '13%',
        render: phoneRechargeLogs => {
            if (!phoneRechargeLogs[0]?.exception) return '-';

            return phoneRechargeLogs[0]?.exception;
        },
    },
    {
        title: 'Resposta',
        dataIndex: 'phoneRechargeLogs',
        key: 'phoneRechargeLogs',
        render: phoneRechargeLogs => {

            if (phoneRechargeLogs[0]?.status !== 'COMPLETE') {
                return phoneRechargeLogs[0]?.response;
            }

            return (
                <ButtonMoreInfo
                    id={phoneRechargeLogs[0]?.id}
                    dataModal={phoneRechargeLogs[0]?.response}
                />
            );
        },
    },
];

export const CSV_HEADER = [
    {
        label: 'Ponto de Venda', key: 'codigoPDV',
    },
    {
        label: 'Id de Op. de Recarga', key: 'idRechargeOperator',
    },
    {
        label: 'Valor rec.', key: 'valueRechargeOperator',
    },
    {
        label: 'Telefone', key: 'cellphoneRecharge',
    },
    {
        label: 'Status', key: 'status',
    },
    {
        label: 'Data e Hora', key: 'createdAt',
    },
    {
        label: 'Observação', key: 'exception',
    },
    {
        label: 'Resposta', key: 'response',
    },
];
