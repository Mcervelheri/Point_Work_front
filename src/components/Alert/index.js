import React, { useCallback } from 'react';

import { Alert as AntAlert } from 'antd';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Alert = ({
    type, message,
    onClose, banner,
    autoScroll,
}) => {
    const captureRef = useCallback(ref => {
        if (ref && autoScroll) {
            ref.scrollIntoView();
        }
    }, [autoScroll]);

    if (!message) {
        return null;
    }

    return (
        <div ref={captureRef}>
            <AntAlert
                type={type}
                closable
                message={message}
                afterClose={onClose}
                className={styles.alert}
                banner={banner}
            />
        </div>
    );

};

Alert.propTypes = {
    banner: PropTypes.bool,
    autoScroll: PropTypes.bool,
    type: PropTypes.oneOf([
        'success',
        'error',
        'info',
    ]),
    message: PropTypes.string,
    onClose: PropTypes.func,
};

Alert.defaultProps = {
    banner: false,
    autoScroll: true,
    type: 'info',
    message: null,
    onClose: () => { },
};

export default Alert;
