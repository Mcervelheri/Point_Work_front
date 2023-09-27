import { useState } from 'react';

import { extractRequestError } from '../helpers/error-helper';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';
import { urlGetAccountList } from '../values/urls/accounts';

const useGetAccountsList = queries => {
    const axios = useAxios();

    const [totalItems, setTotalItems] = useState(0);
    const [accountsList, setAccountsList] = useState([]);

    const { loading: fetchingAccountsData, call: requestAccountsData } = useAsync(async () => {
        const {
            initialDate, finalDate, account,
            status, spd, page, order, orderBy, limit,
        } = queries;

        try {

            const params = {
                page,
                limit,
                orderBy,
                spd: spd || null,
                status: status || null,
                finalDate: finalDate || null,
                accountData: account || null,
                initialDate: initialDate || null,
                order: order ? order.toUpperCase() : null,
            };

            const response = await axios.get(urlGetAccountList(), { params });

            setAccountsList(response?.data?.data);
            setTotalItems(response?.data?.totalItems);

            return null;
        } catch (exception) {
            return extractRequestError(exception, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        }

    }, [axios, queries]);

    return {
        totalItems,
        accountsList,
        requestAccountsData,
        fetchingAccountsData,
    };
};

export default useGetAccountsList;
