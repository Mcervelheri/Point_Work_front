import { messageError } from '../helpers/toast';
import store from '../redux/store';
import thunks from '../redux/thunks';

export function tokenInterceptor(request) {
    const { token } = store.getState();
    if (token && !request?.headers?.token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    // request.headers.timezone = moment.tz.guess(); // Timezone
    return request;
}

export function logout401(responseError) {

    const { response } = responseError;

    if (response?.status === 401 && store?.getState()?.token) {
        store.dispatch(thunks.usuario.removeAuthenticationData());
        messageError('Token expirado. Faça o login novamente.');
        return responseError;
    }

    return Promise.reject(responseError);
}
