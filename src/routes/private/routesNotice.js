import { AntDesign } from '../../components/Icon';
import CreateNotice from '../../domains/Notice/pages/CreateNotice';
import ListNotice from '../../domains/Notice/pages/ListNotice';
import { PATH_NOTICE, PATH_NOTICE_CREATE } from '../paths';

export const ROUTES_NOTICE = [{
    path: PATH_NOTICE,
    menuKey: PATH_NOTICE,
    component: ListNotice,
    text: 'Avisos',
    icon: {
        name: 'OutlineAlert',
        family: AntDesign,
    },
    exact: true,
},
{
    path: PATH_NOTICE_CREATE,
    menuKey: PATH_NOTICE_CREATE,
    component: CreateNotice,
    exact: true,
},
];
