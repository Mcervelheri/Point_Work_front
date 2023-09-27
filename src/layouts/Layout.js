import React, {
    Suspense, useEffect,
    useState, lazy,
} from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../components/PrivateRoute';
import StageIndicator from '../components/StageIndicator';
import useDidMount from '../hooks/use-did-mount';
import thunks from '../redux/thunks';
import { renderRoute } from '../routes/manager';
import { allRoutes } from '../routes/public';

import AppLayout from './AppLayout';

const NotFoundPage = lazy(() => import('../domains/NotFound'));

const hideSplashScreen = () => {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        setTimeout(() => {
            splashScreen.classList.add('splash-screen-hide');
            setTimeout(
                () => splashScreen.parentNode.removeChild(splashScreen),
                1000,
            );
        }, 2000);
    }
};

const Layout = ({ loadAuthenticationData }) => {

    const [ready, setReady] = useState(false);

    const loadData = async () => {
        try {
            await loadAuthenticationData();
        } catch (ex) {
            console.warn(ex);
        } finally {
            setReady(true);
        }
    };

    useDidMount(() => {
        loadData();
    });

    useEffect(() => {
        if (ready) {
            hideSplashScreen();
        }
    }, [ready]);

    if (!ready) {
        return 'Carregando usuário...';
    }

    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <Switch>
                {allRoutes.map((route, index) => {
                    return renderRoute(route, index);
                })}
                <PrivateRoute path="/app" component={AppLayout} />
                {/*  */}
                {/* <Route exact path="/">
                    {!loggedIn ? <Redirect to="/login" /> : <Redirect to="/app" />}
                </Route> */}
                {/*  */}
                <Route component={NotFoundPage} />
            </Switch>
            <StageIndicator />
        </Suspense>
    );
};

const mapDispatchToProps = ({
    loadAuthenticationData: thunks.usuario.loadAuthenticationData,
});

export default connect(null, mapDispatchToProps)(Layout);
