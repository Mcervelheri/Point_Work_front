import React from 'react';

import useClassNames from '../../hooks/use-classnames';

import styles from './styles.module.scss';

const Indicator = () => {
    const classes = useClassNames([styles.ribbon, styles.leftTop]);
    return (
        <a
            className={classes}
            data-ribbon="Homologação"
            title="Sistema em ambiente de homologação"
        >
            Homologação
        </a>
    );
};

export default Indicator;
