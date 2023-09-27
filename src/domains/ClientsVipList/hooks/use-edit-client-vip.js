import { extractRequestError } from '../helpers/error-helper';
import { messageSuccess } from '../helpers/toast';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';
import { urlEditClientsVip } from '../values/urls/accounts';

const useEditClientVip = onSuccess => {
    const axios = useAxios();

    const { call, loading } = useAsync(async (nationalRegistration, name, id) => {
        try {

            const body = {
                nationalRegistration,
                name,
            };

            await axios.put(urlEditClientsVip(id), body);

            onSuccess();

            messageSuccess('Cadastro alterado com sucesso!');
        } catch (exception) {
            extractRequestError(exception);
        }
    }, [axios, onSuccess]);

    return {
        requestEditClientVip: call,
        loading,
    };
};

export default useEditClientVip;
