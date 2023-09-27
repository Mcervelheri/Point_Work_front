import React, { useCallback, useMemo } from 'react';

import moment from 'moment-timezone';

import Filter from '../components/Filter';
import Input from '../components/Input';
import { TRANSACTIONAL_STATUS_OPTIONS } from '../values/enums/transactional-limits';

import styles from './styles.module.scss';

const TransactionalFilter = ({ onSearch, status, date }) => {

    const filters = useMemo(() => {
        return { status: { key: status || null }, date };
    }, [date, status]);

    const handleDisabledDate = useCallback(current => {
        return current && current > moment().add(1, 'day').startOf('day');
    }, []);

    const renderInputs = () => {
        return (
            <div className={styles.container}>
                <Input.Field
                    name="status"
                    type="select"
                    placeholder="Status"
                    className={styles.statusInput}
                    options={TRANSACTIONAL_STATUS_OPTIONS}
                />

                <Input.Field
                    name="date"
                    type="date"
                    dateFormat="DD/MM/YYYY"
                    className={styles.dateInput}
                    disabledDate={handleDisabledDate}
                    allowClear={false}
                />
            </div>
        );
    };

    return (
        <Filter
            onSearch={onSearch}
            initialFilters={filters}
        >
            {renderInputs()}
        </Filter>
    );
};

export default TransactionalFilter;
