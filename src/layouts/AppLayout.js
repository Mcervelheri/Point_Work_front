import React, { useState } from 'react';

import { Layout } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import useDidMount from '../hooks/use-did-mount';
import thunks from '../redux/thunks';

import AppHeaderBar from './AppHeaderBar/AppHeaderBar';
import styles from './AppLayout.module.scss';
import AppRoutes from './AppRoutes';
import AppSideMenu from './AppSideMenu';

const { Content } = Layout;

const AppLayout = ({ history }) => {

    const [ready, setReady] = useState(false);

    const dispatch = useDispatch();
    const skipRefreshToken = useSelector(store => store.skipRefreshToken);

    const navigateToLanding = () => {
        history.push('/');
    };

    const navigateToLogin = () => {
        history.push('/login');
    };

    const refreshToken = async () => {
        try {
            await dispatch(thunks.usuario.refreshUserAuthentication());
            setReady(true);
        } catch (ex) {
            console.warn(ex);
            const { response } = ex;
            if (!response) {
                navigateToLanding();
            } else {
                navigateToLogin();
            }
        }
    };

    useDidMount(() => {
        if (!skipRefreshToken) {
            refreshToken();
        } else {
            setReady(true);
        }
    });

    if (!ready) {
        return 'Atualização autorização de acesso...';
    }

    return (
        <div className={styles.container}>
            <Layout className={styles.layout}>
                <AppHeaderBar />
                <Layout>
                    <AppSideMenu />
                    <Layout>
                        <Content className={styles.content}>
                            <AppRoutes />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    );
};

export default AppLayout;
