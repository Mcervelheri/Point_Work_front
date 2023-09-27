import { useEffect, useMemo, useState } from 'react';

import Axios from 'axios';

import { logout401, tokenInterceptor } from '../helpers/axios-helper';

const { CancelToken } = Axios;

const useAxios = axiosOptions => {
    // 'axiosOptions' é transformado em um state para evitar mutabilidade.
    const [options] = useState(axiosOptions);

    const source = useMemo(() => CancelToken.source(), []);

    const axios = useMemo(() => {

        const instance = Axios.create({
            baseURL: process.env.REACT_APP_URL_API,
            ...options,
            cancelToken: source.token,
        });

        instance.interceptors.request.use(tokenInterceptor);
        instance.interceptors.response.use(null, logout401);

        return instance;

    }, [source, options]);

    useEffect(() => {
        return () => {
            source.cancel('Operation canceled by unmounted component.');
        };
    }, [source]);

    return axios;
};

export default useAxios;
