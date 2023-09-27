import { extractRequestError } from '../helpers/error-helper';
import { messageSuccess } from '../helpers/toast';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';
import { urlDeleteClientsVip } from '../values/urls/accounts';

const useDeleteClientVip = onSuccess => {
    const axios = useAxios();

    const createArrayIds = ids => {
        if (Array.isArray(ids)) return ids;

        return [ids];
    };

    const { call, loading } = useAsync(async ids => {
        try {
            const body = {
                ids: createArrayIds(ids),
            };

            await axios.post(urlDeleteClientsVip(), body);

            onSuccess();

            messageSuccess('Cliente deletado com sucesso!');
        } catch (exception) {
            extractRequestError(exception);
        }
    }, [axios, onSuccess]);

    return {
        requestDeleteClientVip: call,
        loading,
    };
};

export default useDeleteClientVip;
