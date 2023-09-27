import React from 'react';

import { render, screen } from '@testing-library/react';

import ExportStatusTable from '.';

const DATA_SOURCE_MOCK = [
    {
        id: '1',
        name: 'PIX_TRANSFERS',
        createdAt: '2022-09-16T14:01:52.734Z',
        updatedAt: '2022-09-16T18:01:52.734Z',
        ticket: '30731fd0-0ddd-4e0b-a7a4-24f8aeece1b7',
        status: 'FINISHED',
    },
];

describe('ExportStatusTable | Teste Unitário', () => {
    beforeEach(() => {
        render(<ExportStatusTable dataSource={DATA_SOURCE_MOCK} />);
    });

    it('exibe as colunas da tabela corretamente', () => {
        expect(screen.getByText('Serviço')).toBeInTheDocument();
        expect(screen.getByText('Ticket')).toBeInTheDocument();
        expect(screen.getByText('Data/Hora Solicitação')).toBeInTheDocument();
        expect(screen.getByText('Data/Hora Finalização')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
    });

    it('exibe o item da tabela corretamente', () => {
        expect(screen.getByText('PIX_TRANSFERS')).toBeInTheDocument();
        expect(screen.getByText('30731fd0-0ddd-4e0b-a7a4-24f8aeece1b7')).toBeInTheDocument();
        expect(screen.getByText('16/09/2022 14:01:52')).toBeInTheDocument();
        expect(screen.getByText('16/09/2022 18:01:52')).toBeInTheDocument();
        expect(screen.getByText('FINALIZADO')).toBeInTheDocument();
    });
});
