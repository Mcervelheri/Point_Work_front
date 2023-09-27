import React from 'react';

import { screen, render } from '@testing-library/react';

import useScreen from '../hooks/use-screen';

import ContentPage from './index';

jest.mock('../../hooks/use-screen');

jest.mock('react-router-dom', () => ({
    useHistory: jest.fn().mockReturnValue({
        goBack: jest.fn(),
    }),
}));

jest.mock('../../components/PageHeader', () => {
    return () => <div>PageHeader</div>;
});

const renderContentPage = () => {
    render(
        <ContentPage headerTitle="TESTE" sider>
            <div>children</div>
        </ContentPage>,
    );
};

const mockUseScreenSize = (width, height, isDesktop) => {
    useScreen.mockReturnValue({
        window: {
            width,
            height,
        },
        sizes: {
            isDesktop,
        },
    });

};

const renderIsDesktopSize = () => {
    mockUseScreenSize(1000, 1000, true);
    return renderContentPage();
};

const renderIsNotDesktopSize = () => {
    mockUseScreenSize(500, 500, false);
    return renderContentPage();
};

describe('Teste unitário - ContentPage', () => {
    describe('Ao acessar na tela em uma tela maior que 992px de largura', () => {
        beforeEach(() => {
            renderIsDesktopSize();
        });

        it('mostra o \'PageHeader\'', () => {
            expect(screen.getByText('PageHeader')).toBeInTheDocument();
        });

        it('mostra o \'children\'', () => {
            expect(screen.getByText('children')).toBeInTheDocument();
        });
    });

    describe('Ao acessar na tela em uma tela menor que 992px de largura', () => {
        beforeEach(() => {
            renderIsNotDesktopSize();
        });

        it('mostra o botão do menu', () => {
            expect(screen.getByTestId('menu-button')).toBeInTheDocument();
        });
    });
});
