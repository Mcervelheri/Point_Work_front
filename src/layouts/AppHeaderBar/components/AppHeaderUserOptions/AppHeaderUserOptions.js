import React, { useCallback } from 'react';

import { Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import thunks from '../redux/thunks';

import styles from './AppHeaderUserOptions.module.scss';

export const AppHeaderUserOptions = () => {

    const dispatch = useDispatch();

    const decodedToken = useSelector(state => state?.decodedToken);

    const handleLogout = useCallback(() => {
        dispatch(thunks.usuario.removeAuthenticationData());
    }, [dispatch]);

    return (
        <div>
            <div className={styles.profile}>
                <b>{decodedToken?.nome}</b>
            </div>
            <Divider className={styles.optionDivider} />
            <Link to="/app/perfil">
                Perfil
            </Link>
            <Divider className={styles.optionDivider} />
            <a onClick={handleLogout} role="button" tabIndex={0}>
                Sair
            </a>
        </div>
    );
};
