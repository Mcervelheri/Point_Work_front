import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';

import ExportFilter from '.';

describe('ExportFilter | Testes Unitários', () => {
    beforeEach(async () => {
        await waitFor(() => {
            render(<ExportFilter onSearch={jest.fn()} />);
        });
    });

    it('exibe o input para a seleção da data', () => {
        expect(screen.getByPlaceholderText('Data de referência')).toBeInTheDocument();
    });
});
