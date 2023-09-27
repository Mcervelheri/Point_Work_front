import { Ability } from '@casl/ability';
import { handleAction, createAction, handleActions } from 'redux-actions';

const setDecodedToken = createAction('USUARIOS/SET_DECODED_TOKEN');
const updateDecodedToken = createAction('USUARIOS/UPDATE_DECODED_TOKEN');
const logout = createAction('USUARIOS/LOGOUT');
const setToken = createAction('USUARIOS/SET_TOKEN');
const setDataUser = createAction('USUARIOS/SET_DATA_USER');
const setAbility = createAction('USUARIOS/SET_ABILITY');
const setSkipRefreshToken = createAction('USUARIOS/SET_SKIP_REFRESH_TOKEN');

export const actions = {
    setDecodedToken,
    updateDecodedToken,
    setToken,
    setAbility,
    setSkipRefreshToken,
    logout,
    setDataUser,
};

export const decodedTokenHandler = handleActions({
    [setDecodedToken]: (state, action) => ({
        ...action.payload,
    }),
    [updateDecodedToken]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
}, null);

export const tokenHandler = handleAction(
    setToken,
    (state, action) => action.payload,
    null,
);

export const abilityHandler = handleAction(
    setAbility,
    (state, action) => action.payload,
    new Ability([]),
);

export const skipRefreshTokenHandler = handleAction(
    setSkipRefreshToken,
    (state, action) => action.payload || false,
    false,
);

export const saveDataUser = handleAction(
    setDataUser,
    (state, action) => action.payload,
    null,
);

export const reducers = {
    dataUser: saveDataUser,
    decodedToken: decodedTokenHandler,
    token: tokenHandler,
    ability: abilityHandler,
    skipRefreshToken: skipRefreshTokenHandler,
};
