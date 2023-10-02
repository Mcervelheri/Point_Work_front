import React, { memo, forwardRef } from 'react';

import { Tooltip } from 'antd';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';

import PropTypesHelper from '../../helpers/proptypes-helper';
import useClassNames from '../../hooks/use-classnames';

import styles from './styles.module.scss';

const DateFromNow = memo(forwardRef(({
    date, className, format, ...others
}, $ref) => {
    const momentDate = moment(date);
    const spanClasses = useClassNames([styles.text, className]);
    const diff = moment().diff(momentDate, 'seconds');
    return (
        <Tooltip title={momentDate.format(format)}>
            <span ref={$ref} className={spanClasses} {...others}>
                {diff > 0 ? 'há' : 'em'}
                {' '}
                {momentDate.fromNow(true)}
            </span>
        </Tooltip>
    );
}));

DateFromNow.defaultProps = {
    format: 'DD [de] MMMM [de] YYYY [às] HH:mm',
};

DateFromNow.propTypes = {
    date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
        PropTypesHelper.moment,
    ]).isRequired,
    format: PropTypes.string,
};

export default DateFromNow;
