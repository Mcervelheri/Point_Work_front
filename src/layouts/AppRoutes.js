import React, {
    Suspense, lazy, useMemo, useCallback,
} from 'react';

import { Layout } from 'antd';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';

import { hasRoutePermission, renderRoute } from '../routes/manager';
import { allRoutes } from '../routes/private';

import styles from './AppRoutes.module.scss';

const NotFoundPage = lazy(() => import('../domains/NotFound'));

const { Content } = Layout;

const AppRoutes = () => {

    const routes = useMemo(() => allRoutes.filter(hasRoutePermission), []);

    const renderNotFound = useCallback(props => (
        <NotFoundPage {...props} returnPath="/app" />
    ), []);

    return (
        <Content className={styles.content}>
            <Suspense fallback={<div>Carregando...</div>}>
                <Switch>
                    {routes.map((route, index) => renderRoute(route, index, '/app'))}
                    <Route render={renderNotFound} />
                </Switch>
            </Suspense>
        </Content>
    );
};

const mapStateToProps = state => ({
    tipoMenu: state.tipoMenuChangeHandler,
});

export default withRouter(connect(mapStateToProps)(AppRoutes));
