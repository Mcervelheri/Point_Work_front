import React from 'react';

import { screen } from '@testing-library/react';

import { renderWithMocks } from '../helpers/mock-test-helper';

import RechargeFilter from './index';

const MOCK_FILTERS = {
    page: '1',
    limit: '10',
    status: 'PAID',
    sort: 'ASC',
    phone: '44997053411',
    endDate: '2022-12-28',
    startDate: '2022-12-21',
};

describe('Teste unitário - RechargeFilter', () => {
    describe('ao renderizar o componente', () => {

        beforeEach(() => {
            renderWithMocks(
                <RechargeFilter
                    onSearch={jest.fn()}
                    initialFilters={MOCK_FILTERS}
                />,
            );
        });

        it.each`
            input                   | label                                        
            ${'phone-input'}        | ${'de telefone'} 
            ${'date-input'}         | ${'de data'} 
            ${'status-input'}       | ${'de status'}       
        `('exibe o input $label do filtro', ({ input }) => {
            expect(screen.getByTestId(input)).toBeInTheDocument();
        });
    });
});
