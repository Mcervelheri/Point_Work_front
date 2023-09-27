import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';
import { urlGetDocumentData } from '../values/urls/accounts';

const useDocumentData = () => {
    const axios = useAxios();

    const { loading: fetchingDocumentData, call: requestDocumentData } = useAsync(async documentId => {

        try {
            const response = await axios.get(urlGetDocumentData(documentId));

            const { data } = response;

            return data.documentBase64;
        } catch (exception) {
            return console.warn(exception);
        }

    }, [axios]);

    return {
        requestDocumentData,
        fetchingDocumentData,
    };
};

export default useDocumentData;
