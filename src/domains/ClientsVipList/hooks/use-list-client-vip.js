import { useState } from 'react';

import { extractRequestError } from '../helpers/error-helper';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';
import { INITIAL_STATE_LIST_ITEMS, INITIAL_STATE_TOTAL_ITEMS } from '../values/constants';
import { urlClientsVip } from '../values/urls/accounts';

const useListClientVip = () => {
    const axios = useAxios();

    const [listItems, setListItems] = useState(INITIAL_STATE_LIST_ITEMS);
    const [totalItems, setTotalItems] = useState(INITIAL_STATE_TOTAL_ITEMS);

    const { loading: fetchingClientsVip, call } = useAsync(async requestParams => {

        const {
            totalItemsPerPage, order, orderBy,
            currentPage = 1, name, nationalRegistration,
        } = requestParams;

        try {

            const params = {
                page: currentPage,
                limit: totalItemsPerPage,
                sortField: order,
                sortOrientation: orderBy,
                nationalRegistration,
                name,
            };

            const response = await axios.get(urlClientsVip(), { params });

            setListItems(response.data.items);
            setTotalItems(response.data.count);

        } catch (exception) {
            extractRequestError(
                exception,
                'Não foi possível realizar a operação, tente novamente mais tarde.',
            );
        }

    }, [axios]);

    return {
        fetchingClientsVip,
        totalItems,
        clientsVipRequest: call,
        listItems,
    };
};

export default useListClientVip;
