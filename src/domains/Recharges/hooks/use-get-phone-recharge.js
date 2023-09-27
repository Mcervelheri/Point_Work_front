import { useState } from 'react';

import { extractRequestError } from '../helpers/error-helper';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';

const useGetPhoneRecharges = urlState => {
    const axios = useAxios();

    const [phoneRechargeData, setPhoneRechargeData] = useState();
    const [phoneTotalItems, setPhoneTotalItems] = useState();

    const { loading: fetchingPhoneRechargeData, call: phoneRechargeDataRequest } = useAsync(async () => {

        try {

            const params = {
                page: urlState?.page,
                status: urlState?.status || null,
                totalItemsPerPage: urlState?.limit,
                endDate: urlState?.endDate || null,
                sort: urlState?.sort?.toUpperCase(),
                startDate: urlState?.startDate || null,
                phoneNumber: urlState?.phone || null,
            };

            const response = await axios.get('/bff/private/v1/back-office/phone/recharges/reports', { params });

            setPhoneRechargeData(response.data.data);
            setPhoneTotalItems(response.data.totalOfItems);

        } catch (exception) {
            extractRequestError(exception, 'Não foi possível realizar a operação, tente novamente mais tarde.');
            setPhoneTotalItems(0);
            setPhoneRechargeData([]);
        }

    }, [axios, urlState]);

    return {
        phoneTotalItems,
        phoneRechargeData,
        phoneRechargeDataRequest,
        fetchingPhoneRechargeData,
    };
};

export default useGetPhoneRecharges;
