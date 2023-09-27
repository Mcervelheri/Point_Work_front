import React from 'react';

import { render, screen } from '@testing-library/react';

import ExportStatus from '.';

describe('ExportStatus | Teste Unitário', () => {
    describe.each`
        status          | className             | title
        ${'PENDING'}    | ${'ant-tag-orange'}   | ${'PENDENTE'}
        ${'NO_CONTENT'} | ${'ant-tag-geekblue'} | ${'SEM CONTEÚDO'}
        ${'FINISHED'}   | ${'ant-tag-green'}    | ${'FINALIZADO'}
        ${'ERROR'}      | ${'ant-tag-red'}      | ${'FALHOU'}
    `('quando o status é $status', ({ status, className, title }) => {
        beforeEach(() => {
            render(<ExportStatus status={status} />);
        });

        it('exibe o título corretamente', () => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });

        it(`possui a classe de acordo com o status ${status}`, () => {
            expect(screen.getByText(title)).toHaveClass(className);
        });
    });
});
