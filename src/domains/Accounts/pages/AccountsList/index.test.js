import React from 'react';

import { screen, render } from '@testing-library/react';

import BlockedAccountsPage from '.';

// jest.mock('antd', () => ({
//     Tabs: jest.fn().mockReturnValue({
//         TabPane: jest.fn(() => <div>TabPane</div>),
//     }),
// }));

jest.mock('../../../../components/Breadcrumb', () => {
    return () => <div>Breadcrumb</div>;
});

jest.mock('./components/UnlockHistory', () => {
    return () => <div>UnlockHistory</div>;
});

jest.mock('../../../../hooks/use-url-state');

jest.mock('./components/BlockedAccountsList', () => {
    return () => <div>BlockedAccountsList</div>;
});

jest.mock('../../../../hooks/use-url-state', () => {
    return jest.fn().mockReturnValue([
        {
            page: 1,
            limit: 10,
            sort: 'asc',
            account: null,
            endDate: null,
            startDate: null,
            tab: 'BLOCKED_ACCONTS',
            nationalRegistration: null,
        },
        jest.fn(),
    ]);
});

describe('Teste unitário - BlockedAccountsPage', () => {
    describe('Ao acessar a página', () => {

        beforeEach(() => {
            render(<BlockedAccountsPage />);
        });

        it('o título da página e o breadcrumb são mostrados', () => {
            const pagebTitle = screen.getAllByText('Contas bloqueadas');
            expect(pagebTitle[0]).toBeInTheDocument();
            expect(screen.getByText('Breadcrumb')).toBeInTheDocument();
        });

        it('exibe as abas \'Contas bloqueadas\' e \'Histórico de desbloqueios\'', () => {
            const blockedTabTitle = screen.getAllByText('Contas bloqueadas');
            expect(blockedTabTitle[1]).toBeInTheDocument();
            expect(screen.getByText('Histórico de desbloqueios')).toBeInTheDocument();
        });
    });
});
