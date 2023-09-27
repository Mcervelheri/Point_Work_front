import { AntDesign } from '../../components/Icon';
import PaySlipScreen from '../../domains/Payslip/page';
import { PATH_PAYSLIP } from '../../routes/paths';

export const ROUTES_PAYSLIP = [{
    path: PATH_PAYSLIP,
    menuKey: PATH_PAYSLIP,
    component: PaySlipScreen,
    text: 'Holerite',
    icon: {
        name: 'OutlineException',
        family: AntDesign,
    },
    exact: true,
},
];
