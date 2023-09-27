import { lazy } from 'react';

import { AntDesign } from '../components/Icon';
import { PATH_RECHARGES } from '../routes/paths';

const RechargePage = lazy(() => import('../domains/Recharges/pages/RechargePage'));

export const ROUTES_RECHARGES = [{
    path: PATH_RECHARGES,
    menuKey: PATH_RECHARGES,
    component: RechargePage,
    text: 'Recargas',
    icon: {
        name: 'OutlinePhone',
        family: AntDesign,
    },
    exact: true,
}];
