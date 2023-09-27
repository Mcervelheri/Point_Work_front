import React, {
    useCallback, useEffect, useState,
} from 'react';

import { Table } from 'antd';

import Breadcrumb from '../components/Breadcrumb';
import ContentPage from '../components/ContentPage';
import { formatDate } from '../helpers/date-helper';
import useDidMount from '../hooks/use-did-mount';
import useUrlState from '../hooks/use-url-state';
import { DEFAULT_PAGINATION_CONFIG } from '../values/defaultConfigs';

import PasswordChangeHistoryFilter from '../../components/PasswordChangeHistoryFilter';
import { sanitizePasswordChangeHistoryQueries } from '../../helpers/sanatize-queries-helpers';
import useListPasswordChangeHistory from '../../hooks/use-list-password-change-history';
import styles from './styles.module.scss';
import { PASSWORD_CHANGE_HISTORY_TABLE_COLUMNS } from './utils/passwordChangeHistoryConsts';

const AMERICAN_FORMAT = 'YYYY-MM-DD';

const TOOLTIP_CONFIG = {
    title: 'Clique para ordenar a lista de forma ascendente ou descendente',
};

const BREADCRUMB_PATHS = [
    {
        path: '/app',
        name: 'Início',
    },
    {
        name: 'Histórico de alterações de senha',
    },
];

const PasswordChangeHistoryPage = () => {

    const {
        requestDataPasswordChangeHistory,
        passwordChangeHistory,
        totalItems,
        loading,
    } = useListPasswordChangeHistory();

    const [tablePagination, setTablePagination] = useState(DEFAULT_PAGINATION_CONFIG);

    const [urlState, setUrlState] = useUrlState({
        sanitize: sanitizePasswordChangeHistoryQueries,
    });

    useDidMount(() => {
        setUrlState(
            state => ({
                order: state?.order ?? null,
                orderBy: state?.orderBy ?? null,
                operation: state?.operation ?? null,
                operationResult: state?.operationResult ?? null,
                clientIdentification: state?.clientIdentification ?? null,
                page: state?.page ?? 1,
                totalItemsPerPage: state?.totalItemsPerPage ?? 10,
                initialDate: state?.initialDate ?? null,
                endDate: state?.endDate ?? null,
            }),
            'replace',
        );
    });

    const handleTableChange = useCallback((changedPagination, _, sorter) => {

        setUrlState({
            page: changedPagination.current,
            totalItemsPerPage: changedPagination.pageSize,
        });

        setTablePagination(prevState => ({
            ...prevState,
            current: changedPagination.current,
        }));

        const sortField = sorter?.columnKey;

        if (sortField) {
            setUrlState({
                page: changedPagination.current,
                totalItemsPerPage: changedPagination.pageSize,
                order: sorter.order === 'ascend' ? 'ASC' : 'DESC',
                orderBy: sorter.columnKey,
            });
        }
    }, [setUrlState]);

    useEffect(() => {
        const { totalItemsPerPage, page } = urlState;

        requestDataPasswordChangeHistory(urlState);

        setTablePagination(prevState => ({
            ...prevState,
            pageSize: totalItemsPerPage,
            current: Number(page),
            total: totalItems,
        }));
    }, [setUrlState, urlState, totalItems, requestDataPasswordChangeHistory]);

    const handleFilter = useCallback(values => {
        const {
            typeOperation,
            resultOperation,
            nationalRegistration,
            createdAt,
        } = values;

        setUrlState({
            operation: typeOperation?.key,
            initialDate: createdAt ? formatDate(createdAt[0], AMERICAN_FORMAT) : null,
            endDate: createdAt ? formatDate(createdAt[1], AMERICAN_FORMAT) : null,
            operationResult: resultOperation?.key,
            clientIdentification: nationalRegistration,
        });
    }, [setUrlState]);

    return (
        <>
            <Breadcrumb routes={BREADCRUMB_PATHS} />
            <ContentPage
                headerTitle="Histórico de alterações de senha"
            >
                <div className={styles.contentContainer}>
                    <PasswordChangeHistoryFilter
                        onSearch={handleFilter}
                        initialFilters={urlState}
                    />
                    <Table
                        rowKey="id"
                        columns={PASSWORD_CHANGE_HISTORY_TABLE_COLUMNS}
                        dataSource={passwordChangeHistory}
                        pagination={tablePagination}
                        loading={loading}
                        showSorterTooltip={TOOLTIP_CONFIG}
                        onChange={handleTableChange}
                    />
                </div>
            </ContentPage>
        </>
    );
};

export default PasswordChangeHistoryPage;
