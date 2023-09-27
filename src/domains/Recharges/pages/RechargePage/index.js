import React, {
    useCallback, useEffect, useState,
} from 'react';

import { DownloadOutlined } from '@ant-design/icons';
import { Alert, Button, Table } from 'antd';
import moment from 'moment-timezone';

import Breadcrumb from '../components/Breadcrumb';
import ContentPage from '../components/ContentPage';
import useDidMount from '../hooks/use-did-mount';
import useUrlState from '../hooks/use-url-state';
import { DEFAULT_PAGINATION_CONFIG } from '../values/defaultConfigs';

import RechargeFilter from '../../components/RechargeFilter';
import { sanitizeRechargesQueries } from '../../helpers/sanitize-queries-helper';
import useGetCsvData from '../../hooks/use-get-csv-data';
import useGetPhoneRecharges from '../../hooks/use-get-phone-recharge';
import { RECHARGE_LIST_TABLE_COLUMNS } from '../../rechargeUtils';
import styles from './styles.module.scss';

const SCROLL = {
    x: 'max-content',
};

const TOOLTIP_CONFIG = {
    title: 'Clique para ordenar a lista de forma ascendente ou descendente',
};

const BREADCRUMB_PATHS = [
    {
        path: '/app',
        name: 'Início',
    },
    {
        name: 'Recargas',
    },
];

const RechargePage = () => {
    const [tablePagination, setTablePagination] = useState(DEFAULT_PAGINATION_CONFIG);

    const [urlState, setUrlState] = useUrlState({
        sanitize: sanitizeRechargesQueries,
    });

    useDidMount(() => {
        setUrlState(
            state => ({
                page: state?.page ?? 1,
                limit: state?.limit ?? 10,
                sort: state?.sort ?? null,
                phone: state?.phone ?? null,
                status: state?.status ?? null,
                endDate: state?.endDate ?? null,
                startDate: state?.startDate ?? null,
            }),
            'replace',
        );
    });

    const {
        phoneTotalItems,
        phoneRechargeData,
        phoneRechargeDataRequest,
        fetchingPhoneRechargeData,
    } = useGetPhoneRecharges(urlState);

    const handleTableChange = useCallback((changedPagination, _, sorter) => {
        setUrlState({
            page: changedPagination.current,
            limit: changedPagination.pageSize,
            sort: sorter.order === 'ascend' ? 'asc' : 'desc',
        });

        setTablePagination(prevState => ({
            ...prevState,
            current: changedPagination.current,
        }));

    }, [setTablePagination, setUrlState]);

    useEffect(() => {
        const { sort, limit, page } = urlState;

        if (!sort) {
            setUrlState({
                sort: 'desc',
                phone: undefined,
                status: undefined,
                endDate: undefined,
                startDate: undefined,
                page: DEFAULT_PAGINATION_CONFIG.current,
                limit: DEFAULT_PAGINATION_CONFIG.pageSize,
            });
        }

        phoneRechargeDataRequest();

        setTablePagination(prevState => ({
            ...prevState,
            pageSize: limit,
            current: Number(page),
            total: phoneTotalItems,
        }));
    }, [phoneRechargeDataRequest, setUrlState, urlState, phoneTotalItems]);

    const handleFilter = useCallback(values => {
        setUrlState({
            status: values?.status?.key,
            phone: values?.phone || undefined,
            startDate: values?.date && moment(values?.date[0]).format('YYYY-MM-DD'),
            endDate: values?.date && moment(values?.date[1]).format('YYYY-MM-DD'),
        });
    }, [setUrlState]);

    const { requestCSVData, fetchingCSVData } = useGetCsvData(urlState);

    return (
        <>
            <Breadcrumb routes={BREADCRUMB_PATHS} />
            <ContentPage
                headerTitle="Recargas"
                containerClassName={styles.container}
            >
                <div className={styles.contentContainer}>
                    <RechargeFilter
                        onSearch={handleFilter}
                        initialFilters={urlState}
                    />

                    <Table
                        rowKey="id"
                        scroll={SCROLL}
                        onChange={handleTableChange}
                        pagination={tablePagination}
                        dataSource={phoneRechargeData}
                        showSorterTooltip={TOOLTIP_CONFIG}
                        loading={fetchingPhoneRechargeData}
                        columns={RECHARGE_LIST_TABLE_COLUMNS}
                    />
                    <div className={styles.downloadContainer}>
                        <Alert
                            showIcon
                            type="info"
                            className={styles.alert}
                            message="Aplique os filtros para baixar a tabela.
                        Limite máx. para exportação: intervalo de 30 dias"
                        />
                        <Button
                            type="primary"
                            onClick={requestCSVData}
                            loading={fetchingCSVData}
                            icon={<DownloadOutlined />}
                            disabled={!phoneRechargeData || phoneRechargeData.length === 0}
                        >
                            Baixar Tabela
                        </Button>
                    </div>

                </div>
            </ContentPage>
        </>
    );
};

export default RechargePage;
