
import { useState } from 'react';

import { extractRequestError } from '../helpers/error-helper';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';
import { urlGetPhysicalPersonAccountById } from '../values/urls/accounts';

const useAccountDetails = accountId => {
    const axios = useAxios();

    const [account, setAccount] = useState();

    const { call: getAccountById, loading } = useAsync(async () => {
        const url = urlGetPhysicalPersonAccountById(accountId);

        try {
            const response = await axios.get(url);

            setAccount(response.data);

            return response.data;
        } catch (error) {
            extractRequestError(error);
            return null;
        }
    }, [accountId, axios]);

    return {
        loadingAccount: loading,
        getAccountById,
        account,
    };
};

export default useAccountDetails;
