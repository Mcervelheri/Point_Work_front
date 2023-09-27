import React from 'react';

import { screen } from '@testing-library/react';

import { renderWithMocks } from '../helpers/mock-test-helper';

import AccountsFilter from './index';

const MOCK_FILTERS = {
    page: '1',
    limit: '10',
    status: 'ACTIVE',
    spd: 'ASC',
    account: '32432423',
    endDate: '2022-12-28',
    finalDate: '2022-12-21',
};

describe('Teste unitário - AccountsFilter', () => {
    describe('ao renderizar o componente', () => {

        it.each`
            input                   | label                                        
            ${'account-input'}      | ${'de contas'} 
            ${'date-input'}         | ${'de data'} 
            ${'status-input'}       | ${'de status'}  
            ${'spd-input'}          | ${'de SPD'}     
        `('exibe o input $label do filtro', ({ input }) => {
            renderWithMocks(
                <AccountsFilter
                    onSearch={jest.fn()}
                    initialFilters={MOCK_FILTERS}
                />,
            );

            expect(screen.getByTestId(input)).toBeInTheDocument();
        });
    });
});
