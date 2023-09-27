import { useEffect, useMemo, useState } from 'react';

import { messageError } from '../helpers/toast';
import { validateCep } from '../helpers/validations';
import { ESTADO_OPTIONS } from '../values/enums';
import { urlGetZipCodeInfo } from '../values/urls/urlGeneral';

import useAsync from './use-async';
import useAxios from './use-axios';

const useZipCode = (form, zipCodeField, addressFields = {}) => {

    const [initialized, setInitialized] = useState(false);

    const axios = useAxios();

    const zipCode = useMemo(() => {
        if (!form || !zipCodeField) return null;
        return form.getState().values[zipCodeField];
    }, [form, zipCodeField]);

    const { loading, call: requestAddress } = useAsync(async () => {
        try {

            const invalidCep = validateCep(zipCode);
            if (invalidCep) return;

            const response = await axios.get(urlGetZipCodeInfo(), { params: { cep: zipCode } });

            const { data } = response;

            const ufOption = ESTADO_OPTIONS.find(state => state.key === data?.uf);

            form.batch(() => {

                ['bairro', 'cidade', 'endereco'].forEach(field => {
                    const formField = addressFields[field];
                    form.change(formField, data[field]);
                });

                form.change(addressFields?.country, 'Brasil');
                form.change(addressFields?.uf, ufOption);

            });
        } catch (exception) {
            messageError('CEP não encontrado.');
        }
    }, [addressFields, axios, form, zipCode]);

    useEffect(() => {
        if (!zipCode) return;

        if (!initialized) {
            setInitialized(true);
            return;
        }

        requestAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [zipCode]);

    return { loading };
};

export default useZipCode;
