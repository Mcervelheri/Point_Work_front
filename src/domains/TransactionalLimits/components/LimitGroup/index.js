import React, { useMemo } from 'react';

import PropTypes from 'prop-types';

import { TRANSACTIONAL_GROUP_LIMITS_CONFIG } from '../values/enums/transactional-limits';

import styles from './styles.module.scss';

const LimitGroup = ({ group }) => {
    const { tabTitle, color } = TRANSACTIONAL_GROUP_LIMITS_CONFIG[group];

    const groupStyle = useMemo(() => ({
        color,
    }), [color]);

    if (!tabTitle) {
        return (
            <span>-</span>
        );
    }

    return (
        <span
            className={styles.group}
            style={groupStyle}
        >
            {tabTitle}
        </span>
    );
};

LimitGroup.propTypes = {
    group: PropTypes.string.isRequired,
};

export default LimitGroup;
