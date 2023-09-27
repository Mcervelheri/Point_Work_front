import React from 'react';

import { render, screen } from '@testing-library/react';

import TagTypeOperation from '.';

const renderTagTypeOperation = type => {
    return render(<TagTypeOperation type={type} />);
};

describe('TagTypeOperation - Testes Unitários', () => {
    describe.each`
        type                  |  textButton
        ${'RESET_PASSWORD'}   |  ${'Reset'}
        ${'UPDATE_PASSWORD'}  |  ${'Alteração'}
    `('quando o tipo da operação é $type', ({ type, textButton }) => {
        beforeEach(() => {
            renderTagTypeOperation(type);
        });

        it('retorna o título do botão corretamente', () => {
            expect(screen.getByText(textButton)).toBeInTheDocument();
        });
    });
});
