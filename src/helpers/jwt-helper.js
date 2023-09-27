import jwtDecode from 'jwt-decode';

export const decodeToken = token => {
    try {
        return jwtDecode(token);
    } catch (ex) {
        console.warn(ex);
    }
    return null;
};
