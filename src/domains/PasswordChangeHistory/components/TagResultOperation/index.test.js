import React from 'react';

import { render, screen } from '@testing-library/react';

import TagResultOperation from '.';

const renderTagResultOperation = isSuccess => {
    return render(<TagResultOperation isSuccess={isSuccess} />);
};

describe('TagResultOperation - Testes Unitários', () => {
    describe.each`
        result    |  resultDescription
        ${true}   |  ${'Concluído'}
        ${false}  |  ${'Não concluído'}
    `('quando o resultado da operação de alteração de senha é $resultDescription', ({ result, resultDescription }) => {
        beforeEach(() => {
            renderTagResultOperation(result);
        });

        it('retorna o título do botão corretamente', () => {
            expect(screen.getByText(resultDescription)).toBeInTheDocument();
        });
    });
});
