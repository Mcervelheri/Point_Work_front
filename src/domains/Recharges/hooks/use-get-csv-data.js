import { extractRequestError } from '../helpers/error-helper';
import { downloadFile } from '../helpers/file-helper';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';

const useGetCsvData = urlState => {
    const axios = useAxios();

    const { loading: fetchingCSVData, call: requestCSVData } = useAsync(async () => {

        try {
            const params = {
                page: urlState?.page,
                status: urlState?.status,
                sort: urlState?.sort.toUpperCase(),
                phoneNumber: urlState?.phone || null,
                endDate: urlState?.endDate ?? null,
                startDate: urlState?.startDate ?? null,
            };

            const response = await axios.get('/bff/private/v1/back-office/phone/recharges/reports/csv', {
                params,
                data: null,
                headers: {
                    'Content-Type': 'text/csv',
                },
                responseType: 'blob',
            });

            const filename = 'relatorio-de-recargas.csv';
            const contentType = response.headers['content-type'];

            downloadFile({
                filename,
                contentType,
                content: response.data,
            });

        } catch (exception) {
            extractRequestError(exception, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        }

    }, [axios, urlState]);

    return {
        requestCSVData,
        fetchingCSVData,
    };
};

export default useGetCsvData;
