import React from 'react';

import { render, screen } from '@testing-library/react';

import FileExportSection from '.';

describe('FileExportSection | Teste Unitário', () => {
    beforeEach(() => {
        render(
            <FileExportSection
                title="Conciliação Pix"
                extra={<span>Download</span>}
            >
                <span>Conteúdo</span>
            </FileExportSection>,
        );
    });

    it('exibe o título', () => {
        expect(screen.getByText('Conciliação Pix')).toBeInTheDocument();
    });

    it('exibe o conteúdo extra', () => {
        expect(screen.getByText('Download')).toBeInTheDocument();
    });

    it('exibe o conteúdo filho', () => {
        expect(screen.getByText('Conteúdo')).toBeInTheDocument();
    });
});
