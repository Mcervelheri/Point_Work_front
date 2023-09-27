import React, { useCallback } from 'react';

import { useHistory } from 'react-router-dom';

import styles from './styles.module.scss';

const ShortcutButton = ({ title, icon, path }) => {

    const history = useHistory();

    const gotoPath = useCallback(() => {
        history.push(`/app${path}`);
    }, [history, path]);

    return (
        <div>
            <button
                type="button"
                className={styles.button}
                onClick={gotoPath}
            >
                {icon}
            </button>

            <p className={styles.title}>{title}</p>
        </div>
    );
};

export default ShortcutButton;
