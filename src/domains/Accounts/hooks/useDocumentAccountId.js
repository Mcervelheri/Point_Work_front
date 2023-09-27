import { extractRequestError } from '../helpers/error-helper';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';
import { urlGetDocumentById } from '../values/urls/accounts';

const useDocumentAccountId = () => {
    const axios = useAxios();

    const { loading: fetchingDocumentByAccountId, call: requestDocumentByAccountId } = useAsync(async accountId => {

        try {
            const response = await axios.get(urlGetDocumentById(accountId));

            const { documents } = response.data;

            return documents;
        } catch (exception) {
            return extractRequestError(exception, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        }

    }, [axios]);

    return {
        requestDocumentByAccountId,
        fetchingDocumentByAccountId,
    };
};

export default useDocumentAccountId;
