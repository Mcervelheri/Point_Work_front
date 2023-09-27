import { lazy } from 'react';

import { AntDesign } from '../../components/Icon';
import AccountCreate from '../../domains/Accounts/pages/CreateAccount';
import {
    ACCOUNT_BASE_URL, ACCOUNT_CREATE,
} from '../paths';

const PageBlockedAccount = lazy(() => import('../../domains/Accounts/pages/AccountsList'));

export const ROUTES_ACCOUNTS = [{
    path: ACCOUNT_BASE_URL,
    menuKey: ACCOUNT_BASE_URL,
    component: PageBlockedAccount,
    text: 'Funcionários',
    icon: {
        name: 'OutlineTeam',
        family: AntDesign,
    },
    exact: true,
},
{
    path: ACCOUNT_CREATE,
    menuKey: ACCOUNT_CREATE,
    component: AccountCreate,
    exact: true,
}];
