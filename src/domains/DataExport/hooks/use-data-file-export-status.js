import { useState } from 'react';

import { extractRequestError } from '../helpers/error-helper';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';

const useDataFileExportStatus = () => {
    const [servicesExportStatusList, setServicesExportStatusList] = useState([]);
    const axios = useAxios();

    const { call, loading } = useAsync(async referenceDate => {
        try {
            const response = await axios.get('/bff/private/v1/back-office/data-dock/exports', {
                params: {
                    referenceDate,
                },
            });

            setServicesExportStatusList(response.data);
        } catch (exception) {
            extractRequestError(exception);
            setServicesExportStatusList([]);
        }
    }, [axios]);

    return {
        requestDataFileExportStatus: call,
        loading,
        servicesExportStatusList,
    };
};

export default useDataFileExportStatus;
