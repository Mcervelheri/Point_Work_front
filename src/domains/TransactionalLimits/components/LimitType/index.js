import React, { useMemo } from 'react';

import PropTypes from 'prop-types';

import { TRANSACTIONAL_LIMITS_CONFIG } from '../values/enums/transactional-limits';

import styles from './styles.module.scss';

const LimitType = ({ type }) => {
    const { title, color } = TRANSACTIONAL_LIMITS_CONFIG[type];

    const dotStyle = useMemo(() => ({
        backgroundColor: color,
    }), [color]);

    return (
        <span className={styles.container}>
            <span className={styles.dot} style={dotStyle} />
            {title}
        </span>
    );
};

LimitType.propTypes = {
    type: PropTypes.string.isRequired,
};

export default LimitType;
