import React from 'react';

import { render, screen } from '@testing-library/react';

import useDataFileExportStatus from '../../hooks/use-data-file-export-status';
import DataExportStatusPage from './index';

jest.mock('../../../../components/Breadcrumb', () => {
    return () => <div>Breadcrumb</div>;
});

jest.mock('../../../../hooks/use-url-state', () => {
    return jest.fn().mockReturnValue([
        { referenceDate: '1994-10-11' },
        jest.fn(),
    ]);
});
jest.mock('../../hooks/use-data-file-export-status');
jest.mock('../../components/ExportFilter', () => {
    return () => <div>ExportFilter</div>;
});
jest.mock('../../components/ExportStatusTable', () => {
    return () => <div>ExportStatusTable</div>;
});
jest.mock('../../components/FileExportSection', () => {
    return ({ children }) => (
        <>
            <div>FileExportSection</div>
            <div>{children}</div>
        </>
    );
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
                extractionType: 'PLD',
                status: 'FINISHED',
                link: '',
                services: [
                    {
                        id: 44,
                        name: 'BALANCE',
                        status: 'NO_CONTENT',
                        ticket: '8c8c2728-3ce0-4cd5-8c6f-8b967920b8fd',
                        createdAt: '2022-10-12T17:47:18.296Z',
                        updatedAt: '2022-10-12T20:51:24.000Z',
                    },
                ],
            },
        ];
    }

    return [];
};

const mockDataFileExportStatusHook = (hasData, loading = false) => {
    useDataFileExportStatus.mockReturnValue({
        loading,
        requestDataFileExportStatus: jest.fn(),
        servicesExportStatusList: createPayload(hasData),
    });
};

const renderDataExportStatusPage = () => <DataExportStatusPage />;

const renderPageWithData = () => {
    mockDataFileExportStatusHook(true);
    return renderDataExportStatusPage();
};

const renderPageWithoutData = () => {
    mockDataFileExportStatusHook(false);
    return renderDataExportStatusPage();
};

const renderPageWithLoading = () => {
    mockDataFileExportStatusHook(false, true);
    return renderDataExportStatusPage();
};

describe('quando existem status de exportação', () => {
    beforeEach(() => {
        render(renderPageWithData());
    });

    it('o título da página, o filtro e o breadcrumb são mostrados', () => {
        expect(screen.getByText('Exportação de dados')).toBeInTheDocument();
        expect(screen.getByText('Breadcrumb')).toBeInTheDocument();
        expect(screen.getByText('ExportFilter')).toBeInTheDocument();
    });

    it('exibe o componente da seção das exportações', () => {
        expect(screen.getByText('FileExportSection')).toBeInTheDocument();
    });

    it('exibe o componente de tabela da listagem dos status de exportação', () => {
        expect(screen.getByText('ExportStatusTable')).toBeInTheDocument();
    });

    it('não exibe o feedback de loading', () => {
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
});

describe('quando não existem status de exportação', () => {
    beforeEach(() => {
        render(renderPageWithoutData());
    });

    it('exibe a mensagem de feedback para quando não existem dados', () => {
        expect(screen.getByText('Não existem exportações para o dia 11/10/1994')).toBeInTheDocument();
    });
});

describe('quando a requisição está ocorrendo', () => {
    beforeEach(() => {
        render(renderPageWithLoading());
    });

    it('exibe o feedback de loading', () => {
        expect(screen.getByTestId('loading')).toBeInTheDocument();
    });
});
