/* eslint-disable no-await-in-loop */

import { useState } from 'react';

import {
    getClientCompany,
    getClientPersonArr,
    getClientById,
    extractOnboardingExtraData,
} from '../helpers/account-helper';
import { extractRequestError } from '../helpers/error-helper';
import { urlGetAccountListOnlyCompany, urlGetOnboarding } from '../values/urls/accounts';

import useAsync from './use-async';
import useAxios from './use-axios';
import useDidMount from './use-did-mount';

const useAccount = (idClientCompany, idClient) => {

    const axios = useAxios();

    const [initialized, setInitialized] = useState(false);

    const [data, setData] = useState({
        accountPerson: null,
        accountPersonArray: null,
        accountCompany: null,
        idAccount: null,
    });

    const { call: request, loading } = useAsync(async () => {

        try {
            const response = await axios.get(urlGetOnboarding(idClientCompany));

            const { data: responseData } = response;

            let accountCompany = getClientCompany(responseData.clients);

            const accountDataSearch = accountCompany?.company?.nationalRegistration;

            /** 1. Account Company */

            // Solução Temporária
            const onboardingListSearch = await axios.get(urlGetAccountListOnlyCompany(accountDataSearch));

            accountCompany = {
                ...accountCompany,
                ...extractOnboardingExtraData(onboardingListSearch?.data),
            };

            /** 2. Account Partners Array[] */
            const accountPersonArray = getClientPersonArr(responseData.clients);

            /** 3. Account Partner  */
            let accountPerson = null;

            if (idClient) {
                accountPerson = getClientById(responseData.clients, idClient);
            }
            /** 4. Id Account */
            const idAccount = responseData?.idAccount;

            setData({
                accountPerson, accountPersonArray, accountCompany, idAccount,
            });

        } catch (error) {
            extractRequestError(error);
        } finally {
            setInitialized(true);
        }

    }, [axios, idClientCompany, idClient]);

    useDidMount(() => {
        request();
    });

    return { ...data, loading, initialized };
};

export default useAccount;
