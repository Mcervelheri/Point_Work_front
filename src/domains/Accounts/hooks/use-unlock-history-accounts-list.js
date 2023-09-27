import { useState } from 'react';

import { extractRequestError } from '../helpers/error-helper';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';
import { urlGetHistoryUnlockAccountList } from '../values/urls/accounts';

const useGetUnlockHistoryAccountsList = queries => {
    const axios = useAxios();

    const [totalItems, setTotalItems] = useState(0);
    const [unblockList, setUnblockList] = useState([]);

    const { loading: fetchingUnloackHistoryAccounts, call: requestUnloackHistoryAccounts } = useAsync(async () => {

        const {
            page, limit, account, operator, sort,
            startDate, endDate, nationalRegistration, orderBy,
        } = queries;

        try {
            const params = {
                page,
                order: sort.toUpperCase(),
                limit,
                account,
                endDate,
                orderBy,
                operator,
                startDate,
                nationalRegistration,
            };

            const response = await axios.get(urlGetHistoryUnlockAccountList(), {
                params,
            });

            setUnblockList(response.data.users);
            setTotalItems(response.data.totalOfItems);

        } catch (exception) {
            extractRequestError(exception, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        }

    }, [axios, queries]);

    return {
        totalItems,
        unblockList,
        requestUnloackHistoryAccounts,
        fetchingUnloackHistoryAccounts,
    };
};

export default useGetUnlockHistoryAccountsList;
