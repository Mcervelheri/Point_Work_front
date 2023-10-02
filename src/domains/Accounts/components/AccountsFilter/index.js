import React, { useCallback, useMemo } from 'react';

import { SearchOutlined } from '@ant-design/icons';

import Filter from '../../../../components/Filter';
import Input from '../../../../components/Input';
import { SPD_STATUS, STATUS_TYPES } from '../../../../values/enums';

import styles from './styles.module.scss';

const WIDTH_STYLE = {
    spdWidth: {
        width: '104px',
    },
    situationWidth: {
        width: '136px',
    },
};

const AccountsFilter = ({ onSearch, initialFilters }) => {
    const renderOption = useCallback(option => {
        return `${option.key} - ${option.label}`;
    }, []);

    const {
        status, finalDate, initialDate, account, spd,
    } = initialFilters;

    const filters = useMemo(() => {
        return {
            spd: { key: spd || null },
            status: { key: status || null },
            date: initialDate && [initialDate, finalDate],
            account: account ? account.toString() : null,
        };
    }, [spd, status, initialDate, finalDate, account]);

    const renderInpus = () => {
        return (
            <div className={styles.filtersContainer}>

                <Input.Field
                    name="account"
                    data-testid="account-input"
                    placeholder="Pesquisar contas"
                    className={styles.searchInput}
                    prefix={<SearchOutlined className={styles.searchIcon} />}
                />

                <Input.Field
                    name="createdAt"
                    type="daterange"
                    data-testid="date-input"
                    dateFormat="DD/MM/YYYY"
                    className={styles.dateInput}
                />

                <Input.Field
                    name="status"
                    type="select"
                    data-testid="status-input"
                    placeholder="Situação"
                    options={STATUS_TYPES}
                    style={WIDTH_STYLE.situationWidth}
                />

                <Input.Field
                    name="spd"
                    type="select"
                    placeholder="SPD"
                    data-testid="spd-input"
                    options={SPD_STATUS}
                    renderOption={renderOption}
                    style={WIDTH_STYLE.spdWidth}
                />

            </div>
        );
    };

    return (
        <Filter
            onSearch={onSearch}
            initialFilters={filters}
        >
            {renderInpus()}
        </Filter>
    );
};

export default AccountsFilter;
