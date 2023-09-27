import React from 'react';

import {
    fireEvent, render, screen,
} from '@testing-library/react';

import { TRANSACTIONAL_GROUP_TYPE } from '../values/enums/transactional-limits';

import TransactionalLimitsAmountDialog from '../TransactionalLimitsAmountDialog';

describe('Testa o componente TransactionalLimitsAmountDialog \n', () => {

    test('deve conter o título da modal conforme o tipo do limite', () => {
        const getLimitConfiguration = jest.fn().mockReturnValue({
            tab: TRANSACTIONAL_GROUP_TYPE.PIX,
            currentTotalDaytimeLimit: 20000,
            defaultTotalDaytimeLimit: 20000,
            defaultTotalMonthlyLimit: 600000,
            defaultTotalNightTimeLimit: 1000,
            currentTotalMonthlyLimit: 600000,
            currentTotalNightTimeLimit: 1000,
            currentDaytimeTransactionalLimit: 10000,
            defaulNightTimeTransactionalLimit: 1000,
            defaultDaytimeTransactionalLimit: 10000,
            currentNightTimeTransactionalLimit: 1000,
        });

        render(
            <TransactionalLimitsAmountDialog visible limit={getLimitConfiguration()} />,
        );

        const title = screen.getByText('Alterar limite: Pix', {
            exact: false,
        });

        expect(title).toBeTruthy();
    });

    test('deve conter o texto de valor de limite atual mensal', () => {
        const getLimitConfiguration = jest.fn().mockReturnValue({
            tab: TRANSACTIONAL_GROUP_TYPE.TED,
            currentTotalDaytimeLimit: 20000,
            defaultTotalDaytimeLimit: 20000,
            defaultTotalMonthlyLimit: 600000,
            defaultTotalNightTimeLimit: 1000,
            currentTotalMonthlyLimit: 600000,
            currentTotalNightTimeLimit: 1000,
            currentDaytimeTransactionalLimit: 10000,
            defaulNightTimeTransactionalLimit: 1000,
            defaultDaytimeTransactionalLimit: 10000,
            currentNightTimeTransactionalLimit: 1000,
        });

        render(
            <TransactionalLimitsAmountDialog visible limit={getLimitConfiguration()} />,
        );

        const text = screen.getByText('Limite atual mensal:', {
            exact: false,
        });

        expect(text).toBeTruthy();
    });

    test('deve conter os textos de valor máximo pré-aprovado', () => {
        const getLimitConfiguration = jest.fn().mockReturnValue({
            tab: TRANSACTIONAL_GROUP_TYPE.PIX,
            currentTotalDaytimeLimit: 20000,
            defaultTotalDaytimeLimit: 20000,
            defaultTotalMonthlyLimit: 600000,
            defaultTotalNightTimeLimit: 1000,
            currentTotalMonthlyLimit: 600000,
            currentTotalNightTimeLimit: 1000,
            currentDaytimeTransactionalLimit: 10000,
            defaulNightTimeTransactionalLimit: 1000,
            defaultDaytimeTransactionalLimit: 10000,
            currentNightTimeTransactionalLimit: 1000,
        });

        render(
            <TransactionalLimitsAmountDialog visible limit={getLimitConfiguration()} />,
        );

        const text = screen.getAllByText('Máx. pré-aprovado:', {
            exact: false,
        });

        expect(text).toBeTruthy();
    });

    test('deve conter os textos de novo limite', () => {
        const getLimitConfiguration = jest.fn().mockReturnValue({
            tab: TRANSACTIONAL_GROUP_TYPE.TED,
            currentTotalDaytimeLimit: 20000,
            defaultTotalDaytimeLimit: 20000,
            defaultTotalMonthlyLimit: 600000,
            defaultTotalNightTimeLimit: 1000,
            currentTotalMonthlyLimit: 600000,
            currentTotalNightTimeLimit: 1000,
            currentDaytimeTransactionalLimit: 10000,
            defaulNightTimeTransactionalLimit: 1000,
            defaultDaytimeTransactionalLimit: 10000,
            currentNightTimeTransactionalLimit: 1000,
        });

        render(
            <TransactionalLimitsAmountDialog visible limit={getLimitConfiguration()} />,
        );

        const text = screen.getAllByText('Novo limite:', {
            exact: false,
        });

        expect(text).toBeTruthy();
    });

    test('deve conter os textos de limite atual total', () => {
        const getLimitConfiguration = jest.fn().mockReturnValue({
            tab: TRANSACTIONAL_GROUP_TYPE.TED,
            currentTotalDaytimeLimit: 20000,
            defaultTotalDaytimeLimit: 20000,
            defaultTotalMonthlyLimit: 600000,
            defaultTotalNightTimeLimit: 1000,
            currentTotalMonthlyLimit: 600000,
            currentTotalNightTimeLimit: 1000,
            currentDaytimeTransactionalLimit: 10000,
            defaulNightTimeTransactionalLimit: 1000,
            defaultDaytimeTransactionalLimit: 10000,
            currentNightTimeTransactionalLimit: 1000,
        });

        render(
            <TransactionalLimitsAmountDialog visible limit={getLimitConfiguration()} />,
        );

        const text = screen.getAllByText('limite atual total:', {
            exact: false,
        });

        expect(text).toBeTruthy();
    });

    test('deve conter os textos de limite atual transações', () => {
        const getLimitConfiguration = jest.fn().mockReturnValue({
            tab: TRANSACTIONAL_GROUP_TYPE.TED,
            currentTotalDaytimeLimit: 20000,
            defaultTotalDaytimeLimit: 20000,
            defaultTotalMonthlyLimit: 600000,
            defaultTotalNightTimeLimit: 1000,
            currentTotalMonthlyLimit: 600000,
            currentTotalNightTimeLimit: 1000,
            currentDaytimeTransactionalLimit: 10000,
            defaulNightTimeTransactionalLimit: 1000,
            defaultDaytimeTransactionalLimit: 10000,
            currentNightTimeTransactionalLimit: 1000,
        });

        render(
            <TransactionalLimitsAmountDialog visible limit={getLimitConfiguration()} />,
        );

        const text = screen.getAllByText('limite atual por transação:', {
            exact: false,
        });

        expect(text).toBeTruthy();
    });

    test('deve conter o botão de cancelar', () => {
        const getLimitConfiguration = jest.fn().mockReturnValue({
            tab: TRANSACTIONAL_GROUP_TYPE.TED,
            currentTotalDaytimeLimit: 20000,
            defaultTotalDaytimeLimit: 20000,
            defaultTotalMonthlyLimit: 600000,
            defaultTotalNightTimeLimit: 1000,
            currentTotalMonthlyLimit: 600000,
            currentTotalNightTimeLimit: 1000,
            currentDaytimeTransactionalLimit: 10000,
            defaulNightTimeTransactionalLimit: 1000,
            defaultDaytimeTransactionalLimit: 10000,
            currentNightTimeTransactionalLimit: 1000,
        });

        render(
            <TransactionalLimitsAmountDialog visible limit={getLimitConfiguration()} />,
        );

        const button = screen.getByText('Cancelar', {
            exact: false,
        });

        expect(button).toBeTruthy();
    });

    test('deve conter o botão de Ok! Alterar', () => {
        const getLimitConfiguration = jest.fn().mockReturnValue({
            tab: TRANSACTIONAL_GROUP_TYPE.PIX,
            currentTotalDaytimeLimit: 20000,
            defaultTotalDaytimeLimit: 20000,
            defaultTotalMonthlyLimit: 600000,
            defaultTotalNightTimeLimit: 1000,
            currentTotalMonthlyLimit: 600000,
            currentTotalNightTimeLimit: 1000,
            currentDaytimeTransactionalLimit: 10000,
            defaulNightTimeTransactionalLimit: 1000,
            defaultDaytimeTransactionalLimit: 10000,
            currentNightTimeTransactionalLimit: 1000,
        });

        render(
            <TransactionalLimitsAmountDialog visible limit={getLimitConfiguration()} />,
        );

        const text = screen.getByText('Ok! Alterar', {
            exact: false,
        });

        expect(text).toBeTruthy();
    });

    test(
        'deve executar o callback onContinue quando todos os campos forem preenchidos e retornar os valore'
        + 'informados nos campos de novo limite',
        async () => {
            const getLimitConfiguration = jest.fn().mockReturnValue({
                tab: TRANSACTIONAL_GROUP_TYPE.PIX,
                currentTotalDaytimeLimit: 20000,
                defaultTotalDaytimeLimit: 20000,
                defaultTotalMonthlyLimit: 600000,
                defaultTotalNightTimeLimit: 1000,
                currentTotalMonthlyLimit: 600000,
                currentTotalNightTimeLimit: 1000,
                currentDaytimeTransactionalLimit: 10000,
                defaulNightTimeTransactionalLimit: 1000,
                defaultDaytimeTransactionalLimit: 10000,
                currentNightTimeTransactionalLimit: 1000,
            });

            const onContinueMock = jest.fn(values => ({
                totalMonthlyLimit: values?.totalMonthlyLimit,
                totalDaytimeLimit: values?.totalDaytimeLimit,
                totalNightTimeLimit: values?.totalNightTimeLimit,
                daytimeTransactionalLimit: values?.daytimeTransactionalLimit,
                nightTimeTransactionalLimit: values?.nightTimeTransactionalLimit,
            }));

            const onCancelMock = jest.fn();

            render(
                <TransactionalLimitsAmountDialog
                    visible
                    onCancel={onCancelMock}
                    onContinue={onContinueMock}
                    limit={getLimitConfiguration()}
                />,
            );

            const monthlyInput = screen.getByTestId('monthly-input');
            const totalDaytimeInput = screen.getByTestId('totalDaytime-input');
            const totalNightTimeInput = screen.getByTestId('totalNightTime-input');
            const daytimeTransactionalInput = screen.getByTestId('daytimeTransactional-input');
            const nightTimeTransactionalInput = screen.getByTestId('nightTimeTransactional-input');

            fireEvent.change(monthlyInput, { target: { value: '200.00' } });
            fireEvent.change(totalDaytimeInput, { target: { value: '150.00' } });
            fireEvent.change(totalNightTimeInput, { target: { value: '100.00' } });
            fireEvent.change(daytimeTransactionalInput, { target: { value: '120.00' } });
            fireEvent.change(nightTimeTransactionalInput, { target: { value: '80.00' } });

            const button = await screen.findByText('Ok! Alterar');

            fireEvent.click(button);

            expect(onContinueMock).toHaveReturnedWith({
                totalMonthlyLimit: 200,
                totalDaytimeLimit: 150,
                totalNightTimeLimit: 100,
                daytimeTransactionalLimit: 120,
                nightTimeTransactionalLimit: 80,
            });
        },
    );

    test(
        'não deve executar o callback onContinue ao deixar um campo em branco', async () => {
            const getLimitConfiguration = jest.fn().mockReturnValue({
                tab: TRANSACTIONAL_GROUP_TYPE.PIX,
                currentTotalDaytimeLimit: 20000,
                defaultTotalDaytimeLimit: 20000,
                defaultTotalMonthlyLimit: 600000,
                defaultTotalNightTimeLimit: 1000,
                currentTotalMonthlyLimit: 600000,
                currentTotalNightTimeLimit: 1000,
                currentDaytimeTransactionalLimit: 10000,
                defaulNightTimeTransactionalLimit: 1000,
                defaultDaytimeTransactionalLimit: 10000,
                currentNightTimeTransactionalLimit: 0,
            });

            const onContinueMock = jest.fn();
            const onCancelMock = jest.fn();

            render(
                <TransactionalLimitsAmountDialog
                    visible
                    onCancel={onCancelMock}
                    onContinue={onContinueMock}
                    limit={getLimitConfiguration()}
                />,
            );

            const monthlyInput = screen.getByTestId('monthly-input');
            const totalDaytimeInput = screen.getByTestId('totalDaytime-input');
            const totalNightTimeInput = screen.getByTestId('totalNightTime-input');
            const daytimeTransactionalInput = screen.getByTestId('daytimeTransactional-input');

            fireEvent.change(monthlyInput, { target: { value: 0 } });
            fireEvent.change(totalDaytimeInput, { target: { value: '150.00' } });
            fireEvent.change(totalNightTimeInput, { target: { value: '100.00' } });
            fireEvent.change(daytimeTransactionalInput, { target: { value: '1000.00' } });

            const button = await screen.findByText('Ok! Alterar');

            fireEvent.click(button);

            expect(onContinueMock).not.toHaveBeenCalled();
        },
    );
});
