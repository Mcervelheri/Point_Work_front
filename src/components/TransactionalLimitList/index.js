import React, { useCallback, useMemo } from 'react';

import { FieldTimeOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';

import TransactionalLimitsAmountDialog from '../../domains/TransactionalLimits/components/TransactionalLimitsAmountDialog';
import { maskMoney } from '../../helpers/masks';
import { TRANSACTIONAL_LIMITS_CONFIG, TRANSACTIONAL_LIMITS_TYPE } from '../../values/enums/transactional-limits';

import styles from './styles.module.scss';

const TransactionalLimitList = ({
    data, loading,
    idAccount, updateLimit, activeTab,
}) => {

    const columns = useMemo(() => [
        {
            title: 'Tipo de limite',
            dataIndex: 'limitType',
            render: type => {
                return TRANSACTIONAL_LIMITS_CONFIG[type]?.title;
            },
        },
        {
            title: 'Valor atual',
            dataIndex: 'accountLimit',
            render: value => maskMoney(value),
        },
        {
            title: 'Limite Disponível',
            dataIndex: 'defaultLimit',
            render: value => maskMoney(value),
        },
    ], []);

    const extractLimitType = useCallback((limitTypePram, isDefaultLimit) => {
        let limitType = data.find(l => l.limitType === limitTypePram)?.accountLimit;
        if (isDefaultLimit) {
            limitType = data.find(l => l.limitType === limitTypePram)?.defaultLimit;
        }
        return limitType;
    }, [data]);

    const openAdjustLimitModal = useCallback(() => {
        TransactionalLimitsAmountDialog.show({
            onContinue: updateLimit,
            limit: {
                tab: activeTab,
                defaultTotalMonthlyLimit: extractLimitType(TRANSACTIONAL_LIMITS_TYPE.MONTHLY, true),
                currentTotalMonthlyLimit: extractLimitType(TRANSACTIONAL_LIMITS_TYPE.MONTHLY, false),
                defaultTotalDaytimeLimit: extractLimitType(TRANSACTIONAL_LIMITS_TYPE.DAYTIME_TOTAL, true),
                currentTotalDaytimeLimit: extractLimitType(TRANSACTIONAL_LIMITS_TYPE.DAYTIME_TOTAL, false),
                defaultTotalNightTimeLimit: extractLimitType(TRANSACTIONAL_LIMITS_TYPE.NIGHTTIME_TOTAL, true),
                currentTotalNightTimeLimit: extractLimitType(TRANSACTIONAL_LIMITS_TYPE.NIGHTTIME_TOTAL, false),
                defaultDaytimeTransactionalLimit: extractLimitType(TRANSACTIONAL_LIMITS_TYPE.DAYTIME_TRANSACTION, true),
                currentDaytimeTransactionalLimit: extractLimitType(
                    TRANSACTIONAL_LIMITS_TYPE.DAYTIME_TRANSACTION, false,
                ),
                defaulNightTimeTransactionalLimit: extractLimitType(
                    TRANSACTIONAL_LIMITS_TYPE.NIGHTTIME_TRANSACTION, true,
                ),
                currentNightTimeTransactionalLimit: extractLimitType(
                    TRANSACTIONAL_LIMITS_TYPE.NIGHTTIME_TRANSACTION, false,
                ),

            },
        });
    }, [activeTab, updateLimit, extractLimitType]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>Limites</span>
            </div>
            <div className={styles.content}>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    loading={loading}
                    rowKey="limitType"
                />
                <div className={styles.button}>
                    <Button
                        type="primary"
                        disabled={!data}
                        loading={loading}
                        icon={<FieldTimeOutlined />}
                        onClick={openAdjustLimitModal}
                    >
                        Editar Limites
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TransactionalLimitList;
