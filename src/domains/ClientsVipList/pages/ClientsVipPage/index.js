import React, {
    useCallback, useMemo, useState,
} from 'react';

import { UserAddOutlined, UsergroupDeleteOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';

import Breadcrumb from '../components/Breadcrumb';
import ContentPage from '../components/ContentPage';
import { maskCPF } from '../helpers/masks';
import useDidMountAndUpdate from '../hooks/use-did-mount-and-update';

import {
    INITIAL_STATE_CURRENT_PAGE,
    INITIAL_STATE_ORDER,
    INITIAL_STATE_ORDER_BY,
    INITIAL_STATE_TOTAL_ITEMS_PER_PAGE,
} from '../../../../values/constants';
import AddClientVip from '../../components/AddClientVipDialog';
import ButtonDeleteSingleClient from '../../components/ButtonDeleteSingleClient';
import ButtonEditClientVip from '../../components/ButtonEditClientVip';
import DeleteClientVip from '../../components/DeleteClientVipDialog';
import FilterClientsVip from '../../components/FilterClientsVip';
import useListClientVip from '../../hooks/use-list-client-vip';
import styles from './styles.module.scss';

const { Column } = Table;

const BREADCRUMB_PATHS = [
    {
        path: '/app',
        name: 'Início',
    },
    {
        name: 'Clientes convidados',
    },
];

const ClientsVipPage = () => {
    const {
        clientsVipRequest, fetchingClientsVip, listItems, totalItems,
    } = useListClientVip();

    const [filterValues, setFilterValues] = useState({});
    const [currentPage, setCurrentPage] = useState(INITIAL_STATE_CURRENT_PAGE);
    const [totalItemsPerPage, setTotalItemsPerPage] = useState(INITIAL_STATE_TOTAL_ITEMS_PER_PAGE);
    const [order, setOrder] = useState(INITIAL_STATE_ORDER);
    const [orderBy, setOrderBy] = useState(INITIAL_STATE_ORDER_BY);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const hasSelected = selectedRowKeys.length > 0;

    const rowSelection = useMemo(() => ({
        selectedRowKeys,
        onChange: setSelectedRowKeys,
    }), [selectedRowKeys]);

    const pageConfig = useMemo(() => ({
        total: totalItems,
        pageSize: totalItemsPerPage,
        current: currentPage,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 30],
    }), [totalItems, totalItemsPerPage, currentPage]);

    const toolTipConfig = useMemo(() => ({
        title: 'Clique para ordenar a lista de forma ascendente ou descendente',
    }), []);

    const handleTableChange = useCallback((changedPagination, _, sorter) => {
        setSelectedRowKeys([]);
        setCurrentPage(changedPagination?.current);
        setTotalItemsPerPage(changedPagination?.pageSize);

        const sortField = sorter?.columnKey;
        const sortOrientation = sorter?.order;

        if (order !== sortField || sortOrientation !== orderBy) {
            if (!sortField) {
                setOrderBy(null);
                setOrder(null);
            } else {
                setOrder(sortField);
                setOrderBy(sortOrientation === 'ascend' ? 'ASC' : 'DESC');
            }
        }
    }, [order, orderBy]);

    const handleRequest = useCallback(() => {
        const { name, nationalRegistration } = filterValues;

        clientsVipRequest({
            totalItemsPerPage,
            order,
            orderBy,
            currentPage,
            name,
            nationalRegistration,
        });

    }, [currentPage, filterValues, clientsVipRequest, totalItemsPerPage, order, orderBy]);

    const handleOpenModal = useCallback(() => {
        AddClientVip.show({
            onRefresh: handleRequest,
        });
    }, [handleRequest]);

    const handleDeleteClients = useCallback(() => {
        DeleteClientVip.show({
            onRefresh: handleRequest,
            ids: selectedRowKeys,
        });
    }, [selectedRowKeys, handleRequest]);

    const handleSearch = useCallback(values => {
        setFilterValues(values);
    }, []);

    useDidMountAndUpdate(() => {
        handleRequest();
    }, [currentPage, filterValues, totalItemsPerPage, order, orderBy]);

    const renderHeader = () => {
        return (
            <div className={styles.headerContent}>
                <FilterClientsVip onSearch={handleSearch} />
            </div>
        );
    };

    const renderName = useCallback(value => {
        if (!value) return '-';
        return value;
    }, []);

    const renderNationalRegistration = useCallback(value => (
        <span>{maskCPF(value)}</span>
    ), []);

    const renderActionButton = useCallback(client => (
        <div className={styles.actionButton}>
            <ButtonEditClientVip
                id={client.id}
                name={client.name}
                nationalRegistration={client.nationalRegistration}
                onRefresh={handleRequest}
                disabled={hasSelected}
            />
            <ButtonDeleteSingleClient ids={client.id} onRefresh={handleRequest} disabled={hasSelected} />
        </div>
    ), [handleRequest, hasSelected]);

    const renderButton = useCallback(() => {
        return (
            <Button
                type="primary"
                onClick={handleOpenModal}
                icon={<UserAddOutlined />}
            >
                Adicionar novo cliente
            </Button>
        );
    }, [handleOpenModal]);

    return (
        <>
            <Breadcrumb routes={BREADCRUMB_PATHS} />
            <ContentPage
                headerTitle="Clientes convidados"
                containerClassName={styles.container}
                headerButtons={renderButton()}
            >
                <div className={styles.contentContainer}>
                    {renderHeader()}

                    <Table
                        dataSource={listItems}
                        pagination={pageConfig}
                        loading={fetchingClientsVip}
                        showSorterTooltip={toolTipConfig}
                        onChange={handleTableChange}
                        rowSelection={rowSelection}
                        rowKey="id"
                    >
                        <Column
                            title="Nome"
                            dataIndex="name"
                            key="name"
                            render={renderName}
                            width="50%"
                            sorter
                        />
                        <Column
                            title="CPF"
                            dataIndex="nationalRegistration"
                            key="nationalRegistration"
                            render={renderNationalRegistration}
                            width="30%"
                            sorter
                        />
                        <Column
                            render={renderActionButton}
                        />
                    </Table>
                    <Button
                        danger
                        onClick={handleDeleteClients}
                        disabled={!hasSelected}
                        icon={<UsergroupDeleteOutlined />}
                        className={styles.buttonDelete}
                    >
                        Excluir selecionados
                    </Button>
                </div>
            </ContentPage>
        </>
    );
};

export default ClientsVipPage;
