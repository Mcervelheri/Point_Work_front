import React, { useMemo } from 'react';

import { SearchOutlined } from '@ant-design/icons';

import Filter from '../components/Filter';
import Input from '../components/Input';
import { wrapForm } from '../helpers/form-helper';
import { maskCPF, removeMask } from '../helpers/masks';
import { TYPE_OPERATION_PASSWORD_CHANGE, RESULT_OPERATION_PASSWORD_CHANGE } from '../values/enums';

import styles from './styles.module.scss';

const PasswordChangeHistoryFilter = ({ onSearch, initialFilters }) => {
    const {
        clientIdentification, initialDate, endDate,
        operation, operationResult,
    } = initialFilters;

    const filters = useMemo(() => {
        return {
            typeOperation: { key: operation || null },
            resultOperation: { key: operationResult || null },
            createdAt: initialDate && [initialDate, endDate],
            nationalRegistration: clientIdentification ? clientIdentification.toString() : null,
        };
    }, [operation, operationResult, initialDate, endDate, clientIdentification]);

    const renderInputs = () => {
        return (
            <div className={styles.filtersContainer}>
                <Input.Field
                    name="nationalRegistration"
                    placeholder="CPF"
                    format={maskCPF}
                    parse={removeMask}
                    prefix={<SearchOutlined className={styles.searchIcon} />}
                />

                <Input.Field
                    name="typeOperation"
                    type="select"
                    placeholder="Tipo da operação"
                    options={TYPE_OPERATION_PASSWORD_CHANGE}
                />

                <Input.Field
                    name="resultOperation"
                    type="select"
                    placeholder="Resultados"
                    options={RESULT_OPERATION_PASSWORD_CHANGE}
                />

                <Input.Field
                    name="createdAt"
                    type="daterange"
                    dateFormat="DD/MM/YYYY"
                    className={styles.dateInput}
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

export default wrapForm(PasswordChangeHistoryFilter);
