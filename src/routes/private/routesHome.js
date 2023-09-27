import { lazy } from 'react';

import { AntDesign } from '../../components/Icon';
import { PATH_HOME } from '../../routes/paths';

const PageHome = lazy(() => import('../../domains/Home/pages'));

export const ROUTES_HOME = [{
    path: PATH_HOME,
    menuKey: PATH_HOME,
    component: PageHome,
    text: 'Início',
    icon: {
        name: 'OutlineHome',
        family: AntDesign,
    },
    exact: true,
}];
