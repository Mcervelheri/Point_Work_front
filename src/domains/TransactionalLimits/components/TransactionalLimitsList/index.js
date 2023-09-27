import React, { useCallback, useEffect, useState } from 'react';

import { Tabs } from 'antd';

import TransactionalLimitList from '../components/TransactionalLimitList';
import { extractRequestError } from '../helpers/error-helper';
import { createLimitsBody, validatePendingLimit } from '../helpers/limits-helper';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';
import {
    TRANSACTIONAL_GROUP_LIMITS_CONFIG,
    TRANSACTIONAL_GROUP_TYPE,
} from '../values/enums/transactional-limits';

import styles from './styles.module.scss';

const { TabPane } = Tabs;

const TransactionalLimitsList = ({ idAccount, clientId }) => {

    const axios = useAxios();

    const [limitPixData, setLimitPixData] = useState();
    const [activeTab, setActiveTab] = useState(TRANSACTIONAL_GROUP_TYPE.TED);

    const { call: getTransactionLimits, loading: loadingTransactionLimits } = useAsync(async () => {

        try {
            const response = await axios.get(`/bff/private/v2/back-office/transactional-limits/${idAccount}`, {
                params: {
                    idServicesGroup: activeTab,
                },
            });
            setLimitPixData(response.data);
        } catch (error) {
            extractRequestError(error);
        }
    }, [axios, idAccount, activeTab]);

    const onChangeTab = useCallback(value => {
        setActiveTab(value);
    }, []);

    const { call: updateLimit, loading: updatingLimit } = useAsync(async value => {

        const limits = createLimitsBody(value);

        const body = {
            limits,
            clientId,
            idServicesGroup: activeTab,
            idAccount: idAccount.toString(),
        };

        try {
            const response = await axios.post('/bff/private/v2/back-office/transactional-limits', body);

            const { data, status } = response;

            validatePendingLimit(data?.message, status);

            getTransactionLimits();
        } catch (error) {
            extractRequestError(error);
        }
    }, [activeTab, axios, getTransactionLimits, idAccount, clientId]);

    useEffect(() => {
        getTransactionLimits();
    }, [activeTab, getTransactionLimits]);

    return (
        <Tabs onChange={onChangeTab} type="card">
            <TabPane
                tab={TRANSACTIONAL_GROUP_LIMITS_CONFIG.TED.tabTitle}
                key={TRANSACTIONAL_GROUP_TYPE.TED}
                className={styles.tab}
            >
                <TransactionalLimitList
                    idAccount={idAccount}
                    data={limitPixData}
                    activeTab={activeTab}
                    updateLimit={updateLimit}
                    loading={updatingLimit || loadingTransactionLimits}
                />
            </TabPane>
            <TabPane
                tab={TRANSACTIONAL_GROUP_LIMITS_CONFIG.PIX.tabTitle}
                key={TRANSACTIONAL_GROUP_TYPE.PIX}
                className={styles.tab}
            >
                <TransactionalLimitList
                    idAccount={idAccount}
                    data={limitPixData}
                    activeTab={activeTab}
                    updateLimit={updateLimit}
                    loading={updatingLimit || loadingTransactionLimits}
                />
            </TabPane>
        </Tabs>
    );
};

export default TransactionalLimitsList;
