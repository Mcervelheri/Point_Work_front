import React from 'react';

import styles from './styles.module.scss';

const Field = ({ children, title }) => {
    return (
        <div className={styles.container}>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.field}>
                { children }
            </div>
        </div>
    );
};

export default Field;
