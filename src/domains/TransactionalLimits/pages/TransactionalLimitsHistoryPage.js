import React, {
    useCallback, useState, useMemo, useEffect,
} from 'react';

import { Table } from 'antd';
import moment from 'moment-timezone';
import { useParams, useLocation } from 'react-router-dom';

import Breadcrumb from '../components/Breadcrumb';
import ContentPage from '../components/ContentPage';
import { extractRequestError } from '../helpers/error-helper';
import HistoryHelper from '../helpers/history-helper';
import { maskMoney } from '../helpers/masks';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';
import { routeWithParams } from '../routes/manager';
import { PATH_ACCOUNT_DETAIL } from '../routes/paths';
import { DEFAULT_PAGINATION_CONFIG } from '../values/defaultConfigs';

import LimitGroup from '../components/LimitGroup';
import LimitType from '../components/LimitType';
import RequestStatusTag from '../components/RequestStatusTag';
import TransactionalFilter from '../components/TransactionalFilter';
import styles from './TransactionalLimitsHistoryPage.module.scss';

const TOOLTIP_CONFIG = {
    triggerDesc: 'Clique para ordenar de forma descendente',
    triggerAsc: 'Clique para ordenar de forma ascendente',
    cancelSort: 'Clique para cancelar a ordenação',
};

const SCROLL = {
    x: 'max-content',
};

const COLUMN_CONFIG = [
    {
        title: 'idRequest',
        dataIndex: 'idRequest',
        key: 'idRequest',
        sorter: true,
        defaultSortOrder: HistoryHelper.getQueries().sort === 'asc' ? 'ascend' : 'descend',
    },
    {
        title: 'Data requisição',
        dataIndex: 'requestDate',
        key: 'requestDate',
        render: text => moment(text).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
        title: 'Data retorno',
        dataIndex: 'requestResultData',
        key: 'requestResultData',
        render: value => moment(value).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
        title: 'Grupo do limite',
        dataIndex: 'servicesGroup',
        key: 'servicesGroup',
        render: group => <LimitGroup group={group} />,
    },
    {
        title: 'Tipo do limite',
        dataIndex: 'limitType',
        key: 'limitType',
        render: limitType => <LimitType type={limitType} />,
    },
    {
        title: 'Valor solicitado',
        dataIndex: 'requestLimit',
        key: 'requestLimit',
        render: value => maskMoney(value),
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: status => <RequestStatusTag status={status} />,
    },
];

const getRowKey = record => record.idRequest;

const TransactionalLimitsHistoryPage = () => {

    const [dataSource, setDataSource] = useState();
    const [tablePagination, setTablePagination] = useState(DEFAULT_PAGINATION_CONFIG);
    const [filters, setFilters] = useState({});
    const axios = useAxios();
    const location = useLocation();

    const { idAccount, idClientCompany } = useParams();

    const { call: requestTransactionHistory, loading } = useAsync(async () => {
        try {
            const {
                status, date, sort, page, limit,
            } = HistoryHelper.getQueries();

            const response = await axios.get(
                `/bff/private/v1/back-office/transactional-limits/requests/${idAccount}`, {
                    params: {
                        status,
                        requestDate: date ? moment(date).toISOString() : null,
                        sort,
                        limit,
                        page,
                    },
                },
            );

            const currentPage = response.data.totalItemsPage > 0
                ? response.data.currentPage
                : DEFAULT_PAGINATION_CONFIG.current;

            setTablePagination(prevState => ({
                ...prevState,
                current: currentPage,
                total: response.data.totalItems,
            }));

            setDataSource(response.data.items);

        } catch (exception) {
            return extractRequestError(exception);
        }

        return null;
    }, [axios, idAccount]);

    const handleTableChange = useCallback((changedPagination, _, sorter) => {
        HistoryHelper.updateQuery({
            page: changedPagination.current,
            limit: changedPagination.pageSize,
            sort: sorter.order === 'ascend' ? 'asc' : 'desc',
        });
        setTablePagination(prevState => ({
            ...prevState,
            current: changedPagination.current,
            pageSize: changedPagination.pageSize,
        }));
    }, []);

    const handleFilter = useCallback(values => {
        HistoryHelper.updateQuery({
            status: values?.status?.key,
            date: values?.date || undefined,
        });
    }, []);

    useEffect(() => {

        const { sort, status, date } = HistoryHelper.getQueries();

        if (!sort) {
            HistoryHelper.updateQuery({
                status: undefined,
                date: undefined,
                sort: 'asc',
                page: DEFAULT_PAGINATION_CONFIG.current,
                limit: DEFAULT_PAGINATION_CONFIG.pageSize,
            });
        }

        setFilters({ status, date });

        requestTransactionHistory();

    }, [location, requestTransactionHistory]);

    const breadcrumbPaths = useMemo(() => [
        {
            path: routeWithParams(PATH_ACCOUNT_DETAIL, { idClientCompany }),
            name: 'Contas',
        },
        {
            name: 'Histórico de limites',
        },
    ], [idClientCompany]);

    return (
        <div>
            <Breadcrumb routes={breadcrumbPaths} />
            <ContentPage title="Limites transacionais" pageHeaderClassName={styles.pageHeader}>
                <TransactionalFilter
                    onSearch={handleFilter}
                    status={filters.status}
                    date={filters.date}
                />

                <Table
                    columns={COLUMN_CONFIG}
                    dataSource={dataSource}
                    scroll={SCROLL}
                    locale={TOOLTIP_CONFIG}
                    onChange={handleTableChange}
                    rowKey={getRowKey}
                    pagination={tablePagination}
                    loading={loading}
                />
            </ContentPage>
        </div>
    );
};

export default TransactionalLimitsHistoryPage;
