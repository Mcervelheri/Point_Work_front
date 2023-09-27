import React, {
    useEffect,
    useMemo, memo, useRef,
} from 'react';

import { DatePicker } from 'antd';
import moment from 'moment-timezone';

import { maskDate } from '../helpers/masks';
import useClassNames from '../hooks/use-classnames';

import styles from './styles.module.scss';

const { RangePicker } = DatePicker;

const normalizeValue = value => {
    if (!value || !value.length) return null;

    const normalized = value.map(val => {
        return !val || moment.isMoment(val)
            ? val
            : moment(val);
    });

    return normalized;
};

const DateRangePicker = memo(({
    className, inputFormat, value, containerClassName, ...others
}) => {
    const $container = useRef();

    useEffect(() => {

        const eventListener = event => {
            const { value: targetValue } = event.target;
            const maskedValue = maskDate(targetValue, inputFormat);
            // eslint-disable-next-line no-param-reassign
            event.target.value = maskedValue;
        };

        const inputsDates = $container.current.querySelectorAll('input');
        inputsDates.forEach(inputEl => {
            // eslint-disable-next-line no-param-reassign
            inputEl.autocomplete = 'off';
            inputEl.addEventListener('keyup', eventListener);
        });

        return () => {
            inputsDates.forEach(inputEl => {
                inputEl.removeEventListener('keyup', eventListener);
            });
        };
    }, [inputFormat]);

    const normalizedValue = useMemo(() => normalizeValue(value), [value]);
    const classes = useClassNames([styles.datePicker, className]);

    return (
        <div className={containerClassName} ref={$container}>
            <RangePicker
                {...others}
                value={normalizedValue}
                className={classes}
            />
        </div>
    );
});

DateRangePicker.defaultProps = {
    animation: 'slide-up',
};

export default DateRangePicker;
