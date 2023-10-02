import React, { useMemo } from 'react';

import { Spin } from 'antd';

import useClassNames from '../../hooks/use-classnames';

import styles from './index.module.scss';

const LoadingWrapper = ({
    loading,
    loadingArr = [],
    children,
    wrapperClassName,
    spinnerClassName,
}) => {

    const loadingResult = useMemo(() => {
        if (loading !== undefined) return loading;

        return loadingArr.find(l => l === true);
    }, [loading, loadingArr]);

    const wrapperClassNameFinal = useClassNames([styles.loadingWrapper, wrapperClassName]);
    const spinnerContainerClassNameFinal = useClassNames([styles.spinnerContainer, spinnerClassName]);

    return (
        <div
            className={loadingResult ? wrapperClassNameFinal : null}
        >
            {loadingResult ? (
                <div className={spinnerContainerClassNameFinal}>
                    <span className={styles.spinner}>
                        <Spin
                            role="status"
                            animation="border"
                        />
                    </span>
                </div>
            ) : null}
            {children}
        </div>
    );
};

export default LoadingWrapper;
