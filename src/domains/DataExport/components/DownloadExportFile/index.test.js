import React from 'react';

import { render, screen } from '@testing-library/react';

import DownloadExportFile from '.';

const LINK_MOCK = 'https://google.com';

describe('DownloadExportFile | Teste Unitário', () => {
    describe('quando possui link para download', () => {
        beforeEach(() => {
            render(
                <DownloadExportFile
                    status="FINISHED"
                    link={LINK_MOCK}
                />,
            );
        });

        it('exibe o status mapeado corretamente', () => {
            expect(screen.getByText('FINALIZADO')).toBeInTheDocument();
        });

        it('exibe o ícone com a opção para download', () => {
            expect(screen.getByRole('img')).toBeInTheDocument();
        });

        it('o elemento <a> possui o link recebido no atributo href', () => {
            expect(screen.getByRole('link')).toHaveAttribute('href', LINK_MOCK);
        });
    });

    describe('quando não possui link para download', () => {
        beforeEach(() => {
            render(
                <DownloadExportFile
                    status="ERROR"
                />,
            );
        });

        it('exibe o status mapeado corretamente', () => {
            expect(screen.getByText('FALHOU')).toBeInTheDocument();
        });

        it('não exibe o ícone com a opção para download', () => {
            expect(screen.queryByRole('img')).not.toBeInTheDocument();
        });

        it('o elemento <a> não é exibido', () => {
            expect(screen.queryByRole('link')).not.toBeInTheDocument();
        });
    });
});
