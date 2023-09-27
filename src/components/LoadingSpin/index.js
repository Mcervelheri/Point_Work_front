import React, { useMemo } from 'react';

import { Spin } from 'antd';

import styles from './styles.module.scss';

const LoadingSpin = props => {

    const { loadingArr = [] } = props;

    const loading = useMemo(() => {
        return loadingArr.find(l => l === true);
    }, [loadingArr]);

    if (loading) {
        return <div className={styles.spinLoading}><Spin /></div>;
    }

    return null;

};

export default LoadingSpin;
