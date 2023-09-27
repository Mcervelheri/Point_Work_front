import { extractRequestError } from '../helpers/error-helper';
import { messageSuccess } from '../helpers/toast';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';
import { urlClientsVip } from '../values/urls/accounts';

const useAddClientVip = onSuccess => {
    const axios = useAxios();

    const { call, loading } = useAsync(async (name, nationalRegistration) => {
        try {
            const body = {
                name,
                nationalRegistration,
            };

            await axios.post(urlClientsVip(), body);

            onSuccess();

            messageSuccess('Cliente adicionado com sucesso!');
        } catch (exception) {
            extractRequestError(exception);
        }
    }, [axios, onSuccess]);

    return {
        requestAddClientVip: call,
        loading,
    };
};

export default useAddClientVip;
