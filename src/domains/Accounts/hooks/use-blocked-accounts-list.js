import { useState } from 'react';

import { extractRequestError } from '../helpers/error-helper';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';
import { urlGetBlockedAccountList } from '../values/urls/accounts';

const useGetBlockedAccountsList = queries => {
    const axios = useAxios();

    const [totalItems, setTotalItems] = useState(0);
    const [blockedAccountsList, setBlockedAccountsList] = useState([]);

    const { loading: fetchingBlockedAccounts, call: requestBlockedAccounts } = useAsync(async () => {
        const {
            sort, nationalRegistration, page,
            startDate, endDate, account, limit,
        } = queries;

        try {
            const params = {
                sort,
                page,
                limit,
                account,
                endDate,
                startDate,
                nationalRegistration,
            };

            const response = await axios.get(urlGetBlockedAccountList(), { params });

            setBlockedAccountsList(response?.data?.users);
            setTotalItems(response?.data?.totalOfItems);

            return null;
        } catch (exception) {
            return extractRequestError(exception, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        }

    }, [axios, queries]);

    return {
        totalItems,
        blockedAccountsList,
        requestBlockedAccounts,
        fetchingBlockedAccounts,
    };
};

export default useGetBlockedAccountsList;
