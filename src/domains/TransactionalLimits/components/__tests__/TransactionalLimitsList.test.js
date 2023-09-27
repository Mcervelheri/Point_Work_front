import React from 'react';

import { waitFor } from '@testing-library/react';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

import { renderWithMocks } from '../helpers/mock-test-helper';

import TransactionalLimitsList from '../TransactionalLimitsList/';

axios.get.mockImplementation(() => Promise.resolve({ data: [], status: 200 }));
test('Valida se a TransactionalLimitsList chama a rota correta quando iniciada', async () => {

    await act(async () => {

        renderWithMocks(<TransactionalLimitsList idAccount={222} clientId={555} />);

        waitFor(() => {
            expect(axios).toBeCalledWith('/bff/private/v2/back-office/transactional-limits/222');
        });

    });
});
