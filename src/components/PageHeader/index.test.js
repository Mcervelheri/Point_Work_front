import React from 'react';

import { render } from '@testing-library/react';

import PageHeader from './index';

jest.mock('react-router-dom', () => ({
    useHistory: jest.fn().mockReturnValue({
        goBack: jest.fn(),
    }),
}));

const title = 'TESTE';
const extraContent = 'Aqui vai o conteúdo extra';

describe('Teste unitário - PageHeader', () => {
    describe('Ao renderizar o componente', () => {
        let renderPageHeader;
        beforeEach(() => {
            renderPageHeader = render(
                <PageHeader
                    title={title}
                    buttons={extraContent}
                />,
            );
        });

        it('renderiza o título', () => {
            expect(renderPageHeader.getByText(title)).toBeInTheDocument();
        });

        it('renderiza o conteúdo extra', () => {
            expect(renderPageHeader.getByText(extraContent)).toBeInTheDocument();
        });
    });
});
