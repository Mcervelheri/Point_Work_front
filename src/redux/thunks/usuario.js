import moment from 'moment-timezone';

import { createAbility } from '../../helpers/ability-helper';
import { history } from '../../helpers/history-helper';
import { decodeToken } from '../../helpers/jwt-helper';
import UserPreferences from '../../helpers/user-preferences-helper';

import { actions } from '../ducks/usuario';

const TOKEN_KEY = 'TOKEN_KEY';
const USER_KEY = 'USER_KEY';

export const setAuthenticationUser = decodedToken => {
    return async dispatch => {
        await UserPreferences.setItem(USER_KEY, decodedToken);
        dispatch(actions.setDecodedToken(decodedToken));
    };
};

const setAuthenticationToken = ({ token, keepLoggedIn }) => {
    return async dispatch => {
        await UserPreferences.setItem(TOKEN_KEY, token, { temporary: !keepLoggedIn });
        dispatch(actions.setToken(token));
    };
};

export const setAuthenticationData = ({
    token, decodedToken, rules, skipRefreshToken,
    keepLoggedIn,
}) => {
    return async (dispatch, getState) => {
        await dispatch(setAuthenticationToken({ token, keepLoggedIn }));
        await dispatch(setAuthenticationUser(decodedToken));
        dispatch(actions.setSkipRefreshToken(skipRefreshToken));
        dispatch(actions.setAbility(createAbility(rules)));
        history.push('/app');
    };
};

export const removeAuthenticationData = () => {
    return async (dispatch, getState) => {
        UserPreferences.clear();
        dispatch(actions.logout());
        dispatch(actions.setAbility(createAbility([])));
        history.push('/login');
    };
};

export const loadAuthenticationData = () => {
    return async (dispatch, getState) => {
        const token = await UserPreferences.getItem(TOKEN_KEY);
        if (!token) {
            return false;
        }

        const payload = decodeToken(token);
        if (!payload) {
            return false;
        }

        const expirationDate = moment(payload.ext * 1000);
        if (moment().isAfter(expirationDate)) {
            await dispatch(removeAuthenticationData());
            return false;
        }

        const user = await UserPreferences.getItem(USER_KEY);
        dispatch(actions.setToken(token));
        dispatch(actions.setDecodedToken(user));
        dispatch(actions.setSkipRefreshToken(false));

        return true;
    };
};

export const refreshUserAuthentication = () => {
    return async (dispatch, getState) => {
        try {
            return Promise.resolve();
        } catch (ex) {
            const { response } = ex;
            if (response && response.status === 403) {
                return dispatch(removeAuthenticationData());
            }
            throw ex;
        }
    };
};

export default {};
