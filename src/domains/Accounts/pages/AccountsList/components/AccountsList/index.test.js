import React from 'react';

import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useUrlState from '../hooks/use-url-state';

import BlockedAccountsList from '.';
import useGetBlockedAccountsList from '../../../../hooks/use-blocked-accounts-list';
import { BLOCKED_TAB_TYPE } from '../../utils/constants';

jest.mock('../UnblockButton', () => {
    return () => <div>UnblockButton</div>;
});

jest.mock('../../../../../../components/Breadcrumb', () => {
    return () => <div>Breadcrumb</div>;
});

jest.mock('../../../../../../hooks/use-url-state');

jest.mock('../../../../hooks/use-blocked-accounts-list');

jest.mock('../../components/BlockedAccountsFilter', () => {
    return () => <div>BlockedAccountsFilter</div>;
});

jest.mock('react-router-dom', () => ({
    useHistory: jest.fn().mockReturnValue({
        goBack: jest.fn(),
    }),
}));

const createPayload = hasData => {
    if (hasData) {
        return [
            {
                id: 1,
                costumerId: 1234,
                customerName: 'Shun de Andrômeda',
                customerAccount: 11111,
                nationalRegistration: '00589874012',
                username: '00589874012',
                operator: null,
                createdAt: '2022-04-29T14:29:02.000Z',
                unblockDate: null,
            },
            {
                id: 3,
                costumerId: 1333,
                customerName: 'ikki de fenix',
                customerAccount: 33331,
                nationalRegistration: '73641298040',
                username: '42249739872',
                operator: '',
                createdAt: '2022-04-29T15:10:46.000Z',
                unblockDate: null,
            },
        ];
    }

    return [];
};

const DEFAULT_PARAMS_REQUEST = {
    page: 1,
    limit: 10,
    sort: null,
    endDate: null,
    account: null,
    startDate: null,
    nationalRegistration: null,
    tab: 'BLOCKED_ACCONTS',
};

const requestBlockedAccountsMock = jest.fn();

const mockUseGetBlockedAccountsListHook = (hasData, loading = false) => {
    useGetBlockedAccountsList.mockReturnValue({
        fetchingBlockedAccounts: loading,
        blockedAccountsList: createPayload(hasData),
        requestBlockedAccounts: requestBlockedAccountsMock,
    });
};

let getSetUrlStateSetValues;

const mockSetUrlState = jest.fn().mockImplementation(params => {
    getSetUrlStateSetValues = params;
});

const mockUseUrlStateHook = () => {
    useUrlState.mockReturnValue([
        {
            page: 1,
            limit: 10,
            sort: 'asc',
            account: null,
            endDate: null,
            startDate: null,
            nationalRegistration: null,
            tab: 'BLOCKED_ACCONTS',
        },
        mockSetUrlState,
    ]);
};

const renderAccountsListPage = () => (
    <BlockedAccountsList
        tabName={BLOCKED_TAB_TYPE.BLOCKED_ACCONTS}
    />
);

const accountsListPageSucessMock = () => {
    mockUseUrlStateHook();
    mockUseGetBlockedAccountsListHook(true);
    return renderAccountsListPage();
};

describe('Teste unitário - BlockedAccountsList', () => {
    describe('Ao acessar na tela', () => {
        beforeEach(() => {
            render(accountsListPageSucessMock());
        });

        it('o filtro é mostrado', () => {
            expect(screen.getByText('BlockedAccountsFilter')).toBeInTheDocument();
        });

        it('o botão de desbloqueio é mostrado', () => {
            expect(screen.getAllByText('UnblockButton')).toHaveLength(2);
        });

        it('salva na setUrlState o objeto correto para a primeira chamada', () => {
            expect(getSetUrlStateSetValues()).toEqual(DEFAULT_PARAMS_REQUEST);
        });

        it('chama a request que irá trazer a listagem de contas bloqueadas', () => {
            expect(requestBlockedAccountsMock).toHaveBeenCalled();
        });

        it.each`
            columns
            ${'Ação'}  
            ${'Nome'}     
            ${'Conta'}                                                      
            ${'CPF/CNPJ'}  
            ${'Data do bloqueio'}                                    
        `('renderiza a coluna $columns da tabela', ({ columns }) => {
            expect(screen.getByText(columns)).toBeInTheDocument();
        });

        it.each`
            field                       
            ${'Nome'}               
            ${'Conta'}                  
            ${'CPF/CNPJ'}             
        `('chama o request novamente após ordenar por $field', ({ field, fieldName }) => {
            userEvent.click(screen.getByText(field));
            expect(requestBlockedAccountsMock).toHaveBeenCalled();
        });
    });
});
