import { lazy } from 'react';

import { AntDesign } from '../components/Icon';
import { PATH_EXPORT_DATA_STATUS } from '../routes/paths';

const DataExportStatusPage = lazy(() => import('../domains/DataExport/pages/DataExportStatusPage'));

export const ROUTES_DATA_EXPORT = [{
    path: PATH_EXPORT_DATA_STATUS,
    menuKey: PATH_EXPORT_DATA_STATUS,
    component: DataExportStatusPage,
    text: 'Exportação de Dados',
    icon: {
        name: 'OutlineFileSync',
        family: AntDesign,
    },
    exact: true,
}];
