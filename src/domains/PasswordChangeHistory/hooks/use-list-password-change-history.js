import { useState } from 'react';

import { extractRequestError } from '../helpers/error-helper';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';
import { INITIAL_STATE_TOTAL_ITEMS } from '../values/constants';
import { urlPasswordChangeHistory } from '../values/urls/accounts';

const useListPasswordChangeHistory = () => {
    const [passwordChangeHistory, setPasswordChangeHistory] = useState([]);
    const [totalItems, setTotalItems] = useState(INITIAL_STATE_TOTAL_ITEMS);

    const axios = useAxios();

    const { loading, call } = useAsync(async requestParams => {

        const {
            totalItemsPerPage, order, orderBy,
            page, operationResult, clientIdentification,
            operation, initialDate, endDate,
        } = requestParams;

        try {

            const params = {
                clientIdentification: clientIdentification || null,
                operation: operation || null,
                initialDate: initialDate || null,
                endDate: endDate || null,
                operationResult: operationResult || null,
                totalItemsPerPage,
                page,
                order: order || null,
                orderBy: orderBy || null,
            };

            const response = await axios.get(urlPasswordChangeHistory(), { params });

            setPasswordChangeHistory(response.data.items);
            setTotalItems(response.data.count);

        } catch (exception) {
            extractRequestError(exception);
            setPasswordChangeHistory([]);
        }
    }, [axios]);

    return {
        requestDataPasswordChangeHistory: call,
        passwordChangeHistory,
        totalItems,
        loading,
    };
};

export default useListPasswordChangeHistory;
