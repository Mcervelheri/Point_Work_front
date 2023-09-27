import React from 'react';

import { render, screen } from '@testing-library/react';

import Field from './index';

describe('Teste unitário - Field', () => {
    const value = 'Charlie Brown';
    const title = 'Banda:';

    beforeEach(() => {
        render(
            <Field title={title}>
                {value}
            </Field>,
        );
    });

    it('renderiza o valor passado no componente', () => {
        expect(screen.getByText(value)).toBeInTheDocument();
    });

    it('renderiza o título', () => {
        expect(screen.getByText(title)).toBeInTheDocument();
    });
});
