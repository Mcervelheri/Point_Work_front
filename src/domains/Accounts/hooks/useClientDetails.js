
import { useState } from 'react';

import { extractRequestError } from '../helpers/error-helper';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';
import { urlGetClientById } from '../values/urls/accounts';

const useClientDetails = () => {
    const axios = useAxios();

    const [client, setClient] = useState();

    const { call: getClientById, loading } = useAsync(async clientId => {
        const url = urlGetClientById(clientId);

        try {
            const response = await axios.get(url);
            setClient(response.data);
        } catch (error) {
            extractRequestError(error);
        }
    }, [axios]);

    return {
        loadingClient: loading,
        getClientById,
        client,
    };
};

export default useClientDetails;
