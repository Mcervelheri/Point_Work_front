import React, { useMemo } from 'react';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const RedirectToLogin = props => {

    const redirectTo = useMemo(() => ({
        pathname: '/login',
        state: { from: props.location },
    }), [props.location]);

    return <Redirect to={redirectTo} />;
};

RedirectToLogin.propTypes = {
    location: PropTypes.string.isRequired,
};

const PrivateRoute = ({ render, component, ...others }) => {

    const decodedToken = useSelector(state => state?.decodedToken);

    return (
        <Route
            {...others}
            render={render}
            component={component}
        />
    );
};
PrivateRoute.propTypes = {
    ...Route.propTypes,
};

export default PrivateRoute;
