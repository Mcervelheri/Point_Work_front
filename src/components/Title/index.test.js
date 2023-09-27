import React from 'react';

import { render, screen } from '@testing-library/react';

import Title from '.';

describe('Teste unitário - Title', () => {
    describe('quando renderizado o componente', () => {
        it('apresenta o texto passado', () => {
            const text = 'Cool Title Here';
            render(
                <Title level={1}>
                    {text}
                </Title>,
            );

            expect(screen.getByText(text)).toBeInTheDocument();
        });
    });
});
