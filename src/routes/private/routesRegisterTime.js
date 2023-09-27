import { AntDesign } from '../../components/Icon';
import Register from '../../domains/RegisterTime/pages/Register';
import { PATH_REGISTER_TIME } from '../../routes/paths';

export const ROUTES_REGISTER_TIME = [{
    path: PATH_REGISTER_TIME,
    menuKey: PATH_REGISTER_TIME,
    component: Register,
    text: 'Registro de ponto',
    icon: {
        name: 'OutlineClockCircle',
        family: AntDesign,
    },
    exact: true,
}];
