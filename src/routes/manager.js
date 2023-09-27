import React from 'react';

import { Route } from 'react-router-dom';
import urlJoin from 'url-join';

import store from '../redux/store';

export const getRoutesArray = route => {
    if (route.group) {
        return route.routes.reduce((result, r) => {
            return [...result, ...getRoutesArray(r)];
        }, []);
    }
    return [route];
};

// Private routes

export const renderRoute = (route, index, prefix) => {
    const { component: Comp } = route;
    return (
        <Route
            key={route.path || index}
            path={prefix ? urlJoin(prefix, route.path) : route.path}
            exact={route.exact}
            component={Comp}
        />
    );
};

export const findParentGroups = (routeThree, route) => {
    const path = [];
    const getPath = (root, dest) => {
        if (root === dest) return true;
        if (root.group && root.routes.some(r => getPath(r, dest))) {
            path.push(root);
            return true;
        }
        return false;
    };
    getPath({
        group: 'root',
        routes: routeThree,
    }, route);
    return path;
};

export const hasRoutePermission = route => {
    if (!Array.isArray(route.permissions)) {
        return true;
    }
    return route.permissions.some(permission => {
        const { can, an } = permission;
        return store.getState().ability.can(can, an);
    });
};

export const routeWithParams = (route, params) => {

    const mapObjectFields = (object, callback) => {
        const arrKeys = Object.keys(object);

        return arrKeys.map(key => {
            const value = object[key];
            return callback(value, key);
        });
    };

    let result = route;

    mapObjectFields(params, (paramValue, paramField) => {
        result = result.replace(`:${paramField}`, paramValue);
        return null;
    });

    // TODO: remover o '/app' e adicioná-lo à rota.
    return `/app${result}`;
};
