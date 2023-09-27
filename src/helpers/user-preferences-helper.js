import Cookies from 'universal-cookie';

const maxAge = 315360000; // 10 anos em segundos

const cookies = new Cookies();
const DEFAULT_OPTIONS = { path: '/' };

export default {
    /**
     * Armazena a chave e valor nos cookies.
     * @param {string} key
     * @param {string} value
     * @return {Promise}
     */
    setItem(key, value, opts = { temporary: false }) {
        const options = {
            ...DEFAULT_OPTIONS,
            maxAge: opts.temporary ? undefined : maxAge,
            ...opts,
        };
        return cookies.set(key, {
            value,
            options,
        }, options);
    },
    /**
     * Recupera o valor da chave armazenado nos cookies.
     * @param {string} key
     * @return {Promise<string>}
     */
    getItem(key) {
        return cookies.get(key)?.value;
    },
    options(key) {
        return cookies.get(key)?.options;
    },
    /**
     * Remove o valor da chave armazenado nos cookies.
     * @param {string} key
     * @return {Promise}
     */
    removeItem(key) {
        return cookies.remove(key, DEFAULT_OPTIONS);
    },
    clear() {
        const allCookies = cookies.getAll();
        Object.keys(allCookies).forEach(ck => cookies.remove(ck, DEFAULT_OPTIONS));
        return allCookies;
    },
};
