import { getRoutesArray } from '../manager';

import { ROUTES_ACCOUNTS } from './routesAccounts';
import { ROUTES_HOME } from './routesHome';
import { ROUTES_NOTICE } from './routesNotice';
import { ROUTES_PAYSLIP } from './routesPayslip';
import { ROUTES_REGISTER_TIME } from './routesRegisterTime';

export const ROUTES = [
    ...ROUTES_HOME,
    ...ROUTES_ACCOUNTS,
    ...ROUTES_REGISTER_TIME,
    ...ROUTES_NOTICE,
    ...ROUTES_PAYSLIP,
];

export const allRoutes = getRoutesArray({
    group: 'root',
    routes: ROUTES,
});

export default ROUTES;
