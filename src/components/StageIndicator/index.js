import React, { lazy } from 'react';

const Indicator = lazy(() => import('./Indicator'));

const { REACT_APP_ENV } = process.env;

const StageIndicator = () => {
    if (REACT_APP_ENV !== 'stage') {
        return null;
    }

    return (
        <Indicator />
    );
};

export default StageIndicator;
