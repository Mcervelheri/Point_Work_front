import React from 'react';

import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { create } from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';

import LoginPage from '../index';

const mockStore = configureMockStore();
const store = mockStore({});
const history = createMemoryHistory({
    initialEntries: [''],
});
describe('Testa tela login \n', () => {

    test('<LoginPage> deve renderizar corretamente', () => {

        const loginPage = create(
            <Router history={history}>
                <Provider store={store}>
                    <LoginPage />
                </Provider>
            </Router>,
        ).toJSON();

        expect(loginPage).toMatchSnapshot();
    });

    test('Deve conter a logotipo da AL5 Bank na tela LoginPage ', () => {
        render(
            <Router history={history}>
                <Provider store={store}>
                    <LoginPage />
                </Provider>
            </Router>,
        );
        const logo = screen.getByAltText(/Logotipo AL5 Bank/i);
        expect(logo).toBeInTheDocument();
    });

    test('Deve conter o título Login na tela LoginPage ', () => {
        render(
            <Router history={history}>
                <Provider store={store}>
                    <LoginPage />
                </Provider>
            </Router>,
        );
        const loginTitle = screen.getByText(/Login/i);
        expect(loginTitle).toBeInTheDocument();
    });

    test('Deve conter o input de email na tela LoginPage ', () => {
        render(
            <Router history={history}>
                <Provider store={store}>
                    <LoginPage />
                </Provider>
            </Router>,
        );
        const emailInput = screen.getByPlaceholderText('Email');
        expect(emailInput).toBeInTheDocument();
    });

    test('Deve conter o input de senha na tela LoginPage ', () => {
        render(
            <Router history={history}>
                <Provider store={store}>
                    <LoginPage />
                </Provider>
            </Router>,
        );
        const passwordInput = screen.getByPlaceholderText('Senha');
        expect(passwordInput).toBeInTheDocument();
    });

    test('Deve conter checkbox de lembrar credenciais na tela LoginPage ', () => {
        render(
            <Router history={history}>
                <Provider store={store}>
                    <LoginPage />
                </Provider>
            </Router>,
        );
        const rememberButton = screen.getByRole('checkbox', { name: 'Lembrar' });
        expect(rememberButton).toBeInTheDocument();
    });

    test('Deve conter o botão de recuperar senha na tela LoginPage ', () => {
        render(
            <Router history={history}>
                <Provider store={store}>
                    <LoginPage />
                </Provider>
            </Router>,
        );
        const recoverPassword = screen.getByRole('button', { name: 'Esqueceu sua senha?' });
        expect(recoverPassword).toBeInTheDocument();
    });

    test('Deve conter o botão Acessar na tela LoginPage', () => {
        render(
            <Router history={history}>
                <Provider store={store}>
                    <LoginPage />
                </Provider>
            </Router>,
        );
        const accessButton = screen.getByRole('button', { name: /Acessar/i });
        expect(accessButton).toBeInTheDocument();
    });

    test('Deve conter o texto AL5 Bank no rodapé da tela LoginPage', () => {
        render(
            <Router history={history}>
                <Provider store={store}>
                    <LoginPage />
                </Provider>
            </Router>,
        );
        const footerTitle = screen.getByText(/AL5 Bank/i);
        expect(footerTitle).toBeInTheDocument();
    });

});
