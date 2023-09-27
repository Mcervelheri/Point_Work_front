import React from 'react';

import { screen, render } from '@testing-library/react';

import useGetPhoneRecharges from '../../hooks/use-get-phone-recharge';
import RechargePage from './index';

jest.mock('../../../../components/Breadcrumb', () => {
    return () => <div>Breadcrumb</div>;
});

jest.mock('react-router-dom', () => ({
    useHistory: jest.fn().mockReturnValue({
        goBack: jest.fn(),
    }),
}));

jest.mock('../../components/RechargeFilter', () => {
    return () => <div>RechargeFilter</div>;
});

jest.mock('../../hooks/use-get-phone-recharge');

jest.mock('../../hooks/use-get-csv-data', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue({
        fetchingCSVData: false,
        requestCSVData: jest.fn(),
    }),
}));

jest.mock('../../../../hooks/use-url-state', () => {
    return jest.fn().mockReturnValue([
        {
            page: 33,
            status: null,
            endDate: null,
            sort: 'asc',
            limit: 12,
            phoneNumber: null,
            startDate: null,
        },
        jest.fn(),
    ]);
});

const createPayload = hasData => {
    if (hasData) {
        return [
            {
                account: 3234,
                codigoPDV: '1022',
                idRechargeOperator: 1,
                valueRechargeOperator: 10,
                cellphoneRecharge: '44123456789',
                createdAt: '2022-04-05T21:16:19.590Z',
                id: '3545ed66-eb56-4cb5-ab47-1d20d499190f',
                phoneRechargeLogs: [
                    {
                        status: 'START',
                        response: null,
                        exception: null,
                        createdAt: '2022-04-05T21:16:21.906Z',
                        id: '2d9c17c2-7794-4fd0-a264-0bfd7aceca25',
                    },
                ],
            },
        ];
    }

    return [];
};

const mocktuseGetPhoneRechargesHook = (hasData, loading = false) => {
    useGetPhoneRecharges.mockReturnValue({
        phoneRechargeData: createPayload(hasData),
        fetchingPhoneRechargeData: loading,
        phoneRechargeDataRequest: jest.fn(),
    });
};

const renderRechargePage = () => <RechargePage />;

const rechargePageSucessMock = () => {
    mocktuseGetPhoneRechargesHook(true);
    return renderRechargePage();
};

describe('Teste unitário - RechargePage', () => {
    describe('Ao acessar na tela', () => {
        beforeEach(() => {
            render(rechargePageSucessMock());
        });

        it('o título da página, o filtro e o breadcrumb são mostrados', () => {
            expect(screen.getByText('Recargas')).toBeInTheDocument();
            expect(screen.getByText('Breadcrumb')).toBeInTheDocument();
            expect(screen.getByText('RechargeFilter')).toBeInTheDocument();
        });

        it('a mensagem a respeito de baixar a tabela e o seu respectivo botão são mostrados', () => {
            expect(screen.getByText(
                'Aplique os filtros para baixar a tabela. Limite máx. para exportação', {
                    exact: false,
                },
            )).toBeInTheDocument();
            expect(screen.getByText('Baixar Tabela')).toBeInTheDocument();
        });

        it('e há dados disponíveis, o botão \'Baixar Tabela\' fica habilitado', () => {
            expect(screen.getByText('Baixar Tabela')).toBeEnabled();
        });

        it.each`
            columns   
            ${'Status'}                                         
            ${'Telefone'}              
            ${'Resposta'} 
            ${'Valor rec.'} 
            ${'Observação'}          
            ${'Data e Hora'}                    
            ${'Ponto de Venda'} 
            ${'Id de Op. de Recarga'}           
        `('renderiza a coluna $columns da tabela', ({ columns }) => {
            expect(screen.getByText(columns)).toBeInTheDocument();
        });
    });
});
