/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

import { message } from 'antd';

import styles from './toast.module.scss';

export const messageSuccess = content => {
    return message.success({
        icon: <img src={require('./assets/check.svg').default} className={styles.icon} />,
        content,
        className: styles.errorSuccess,
    });
};

export const messageError = content => {

    return message.error({
        icon: <img src={require('./assets/error.svg').default} className={styles.icon} />,
        content,
        className: styles.errorMessage,
    });
};

export const messageWarn = content => {
    return message.warn({
        content,
        className: styles.errorWarn,
    });
};
