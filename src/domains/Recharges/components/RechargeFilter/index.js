import React, { useCallback, useMemo, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment-timezone';

import Filter from '../components/Filter';
import Input from '../components/Input';
import { disabledDate } from '../helpers/date-helper';
import { maskTelefone, removeMask } from '../helpers/masks';
import { validatePhone } from '../helpers/validations';
import { STATUS_TYPES_RECHARGES } from '../values/enums';

import styles from './styles.module.scss';

const CURRENT_DATE = moment();
const LAST_MONTH = moment(CURRENT_DATE).subtract(30, 'd');
const LAST_SEVEN_DAYS = moment(CURRENT_DATE).subtract(7, 'd');
const LAST_FIFTEEN_DAYS = moment(CURRENT_DATE).subtract(15, 'd');

const DATE_RANGES = {
    Hoje: [moment(), moment()],
    '7 dias': [LAST_SEVEN_DAYS, moment()],
    '15 dias': [LAST_FIFTEEN_DAYS, moment()],
    '30 dias': [LAST_MONTH, moment()],
};

const RechargeFilter = ({ onSearch, initialFilters }) => {
    const [dates, setDates] = useState([]);

    const {
        status, endDate, startDate, phone,
    } = initialFilters;

    const filters = useMemo(() => {
        return {
            status: { key: status || null },
            date: startDate && [startDate, endDate],
            phone: phone ? phone.toString() : null,
        };
    }, [status, phone, startDate, endDate]);

    const onCalendarChange = useCallback(value => {
        setDates(value);
    }, []);

    const handleDisabledDate = useCallback(value => {
        return disabledDate(value, dates);
    }, [dates]);

    return (
        <Filter
            onSearch={onSearch}
            initialFilters={filters}
        >

            <div className={styles.container}>
                <Input.Field
                    name="date"
                    type="daterange"
                    ranges={DATE_RANGES}
                    dateFormat="DD/MM/YYYY"
                    data-testid="date-input"
                    disabledDate={handleDisabledDate}
                    className={styles.calendarInput}
                    onCalendarChange={onCalendarChange}
                />

                <Input.Field
                    name="phone"
                    parse={removeMask}
                    format={maskTelefone}
                    validate={validatePhone}
                    data-testid="phone-input"
                    className={styles.searchInput}
                    placeholder="Pesquisar telefone da recarga"
                    prefix={<SearchOutlined className={styles.searchIcon} />}
                />

                <Input.Field
                    type="select"
                    name="status"
                    placeholder="Status"
                    data-testid="status-input"
                    className={styles.dropdownInput}
                    options={STATUS_TYPES_RECHARGES}
                />
            </div>
        </Filter>

    );
};

export default RechargeFilter;
