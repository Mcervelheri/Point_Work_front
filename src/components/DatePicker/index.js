import React, {
    useEffect, useMemo, memo,
    useRef,
} from 'react';

import { DatePicker as AntDatePicker } from 'antd';
import moment from 'moment-timezone';

import { maskDate } from '../../helpers/masks';
import useClassNames from '../../hooks/use-classnames';

import styles from './styles.module.scss';

const normalizeValue = value => (!value || moment.isMoment(value) ? value : moment(value));

const DatePicker = memo(({
    inputFormat, className, value, containerClassName, ...others
}) => {
    const $container = useRef();

    useEffect(() => {
        const eventListener = event => {
            const { value: targetValue } = event.target;
            const maskedValue = maskDate(targetValue, inputFormat);
            // eslint-disable-next-line no-param-reassign
            event.target.value = maskedValue;
        };

        const inputDate = $container.current.querySelector('input');
        inputDate.autocomplete = 'off';
        inputDate.addEventListener('keyup', eventListener);

        return () => {
            inputDate.removeEventListener('keyup', eventListener);
        };
    }, [inputFormat]);

    const normalizedValue = useMemo(() => normalizeValue(value), [value]);
    const classes = useClassNames([styles.datePicker, className]);

    return (
        <div ref={$container} className={containerClassName}>
            <AntDatePicker
                {...others}
                className={classes}
                value={normalizedValue}
            />
        </div>
    );
});

DatePicker.defaultProps = {
    animation: 'slide-up',
};

export default DatePicker;
