
import { extractRequestError } from '../../../../helpers/error-helper';
import useAsync from '../../../../hooks/use-async';
import useAxios from '../../../../hooks/use-axios';
import { urlGetAccountList } from '../../../../values/urls/accounts';

const useAccountList = () => {
    const axios = useAxios();

    const { call: getAccounts, loading: loadingGetAccounts } = useAsync(async accountId => {
        const url = urlGetAccountList();

        const params = {
            accountData: accountId ?? null,
        };

        try {
            const response = await axios.get(url, { params });
            return response.data;
        } catch (error) {
            return extractRequestError(error);
        }
    }, [axios]);

    return {
        loadingGetAccounts,
        getAccounts,
    };
};

export default useAccountList;
