
import { extractRequestError } from '../../../../helpers/error-helper';
import useAsync from '../../../../hooks/use-async';

import useAccountDetails from './useAccountDetails';
import useClientDetails from './useClientDetails';

const usePhysicalPersonData = accountId => {

    const { getAccountById, account, loadingAccount } = useAccountDetails(accountId);
    const { getClientById, client, loadingClient } = useClientDetails();

    const { call: getPersonData } = useAsync(async () => {
        try {
            const response = await getAccountById();

            await getClientById(response.clientId);
        } catch (error) {
            extractRequestError(error);
        }
    }, [getAccountById, getClientById]);

    return {
        loadingClient,
        loadingAccount,
        account,
        client,
        getPersonData,
    };
};

export default usePhysicalPersonData;
