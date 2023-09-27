import { lazy } from 'react';

import { getRoutesArray } from './manager';

const LoginPage = lazy(() => import('../domains/Login/pages/Login'));

export const LoginPath = '/login';

const ROUTES = [
    {
        path: LoginPath,
        component: LoginPage,
    },
];

export default ROUTES;

export const allRoutes = getRoutesArray({
    group: 'root',
    routes: ROUTES,
});
