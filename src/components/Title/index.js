import React from 'react';

import { Typography } from 'antd';

import useClassNames from '../../hooks/use-classnames';

import styles from './styles.module.scss';

const Title = ({ level, children, className }) => {

    const titleClass = useClassNames([styles.title, className]);

    return (
        <Typography.Title
            level={level}
            className={titleClass}
        >
            {children}
        </Typography.Title>
    );
};

export default Title;
