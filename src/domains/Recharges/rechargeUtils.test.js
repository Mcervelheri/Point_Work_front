import { render, screen } from '@testing-library/react';

import { RECHARGE_LIST_TABLE_COLUMNS } from './rechargeUtils';

const tableValues = [
    {
        codigoPDV: 1,
        phoneRechargeLogs: [{ status: 'A' }],
        createdAt: '2022-07-06T17:46:42.324Z',
    },
    {
        codigoPDV: 2,
        phoneRechargeLogs: [{ status: 'B' }],
        createdAt: '2022-07-08T17:46:42.324Z',
    },
    {
        codigoPDV: 2,
        phoneRechargeLogs: [{ status: 'B' }],
        createdAt: '2022-07-08T17:46:42.324Z',
    },
];

describe('Quando chama o sorter da coluna com a key phoneRechargeLogs', () => {
    const comparisionFunction = RECHARGE_LIST_TABLE_COLUMNS.find(c => c.key === 'phoneRechargeLogs').sorter;

    it('retorna false quando o primeiro parâmetro for menor que o segundo', () => {
        expect(comparisionFunction(tableValues[0], tableValues[1])).toBe(false);
    });

    it('retorna false quando o primeiro parâmetro for igual ao segundo', () => {
        expect(comparisionFunction(tableValues[1], tableValues[2])).toBe(false);
    });
    it('retorna verdadeiro quando o primeiro parâmetro for maior que o segundo', () => {
        expect(comparisionFunction(tableValues[1], tableValues[0])).toBe(true);
    });
});

describe('Quando chama o render da coluna Status', () => {
    const renderFunction = RECHARGE_LIST_TABLE_COLUMNS.find(c => c.title === 'Status').render;

    it('retorna o caractere "-" quando não existir status', () => {
        const paramWithoutStatus = { phoneRechargeLogs: [] };

        expect(renderFunction(paramWithoutStatus)).toBe('-');
    });

    it.each`
            status                  | label
            ${'PAID'}               | ${'PAGA'}  
            ${'REFOUND_COMPLETE'}   | ${'ESTORNADA'}  
            ${'REFOUND'}            | ${'ESTORNO EM ANDAMENTO'}  
            ${'START'}              | ${'INICIADA'}  
            ${'FAILED_TO_PAY'}      | ${'FALHA NO PAGAMENTO'}  
            ${'COMPLETE'}           | ${'COMPLETADA'}  
    `('retorna a tag com status $status traduzido para $label', ({ status, label }) => {
        const phoneRechargeLogs = [{ status }];

        render(renderFunction(phoneRechargeLogs));

        expect(screen.getByText(label)).toBeInTheDocument();
    });
});

describe.each`
            columnKey
            ${'codigoPDV'}
            ${'createdAt'}
`('Quando chama o sorter da coluna com a key $columnKey', ({ columnKey }) => {

    const comparisionFunction = RECHARGE_LIST_TABLE_COLUMNS.find(c => c.key === columnKey).sorter;
    it('retorna um valor negativo quando o primeiro parâmetro for maior que o segundo', () => {
        expect(comparisionFunction(tableValues[0], tableValues[1])).toBeLessThan(0);
    });

    it('retorna 0 quando o primeiro parâmetro for igual ao segundo', () => {
        expect(comparisionFunction(tableValues[1], tableValues[2])).toBe(0);
    });
    it('retorna um valor positivo quando o primeiro parâmetro for menor que o segundo', () => {
        expect(comparisionFunction(tableValues[1], tableValues[0])).toBeGreaterThan(0);
    });
});

describe('Quando chama o render da coluna Observação', () => {

    const renderFunction = RECHARGE_LIST_TABLE_COLUMNS.find(c => c.title === 'Observação').render;

    it('retorna o caractere "-" quando não existir exception', () => {
        const paramWithoutStatus = { phoneRechargeLogs: [] };

        expect(renderFunction(paramWithoutStatus)).toBe('-');
    });

    it('retorna uma string com a exceção quando existir o campo exception', () => {
        const phoneRechargeLogs = [{ exception: 'Falha na renderização' }];

        expect(renderFunction(phoneRechargeLogs)).toBe(phoneRechargeLogs[0].exception);
    });
});

describe('Quando chama o render da coluna Resposta', () => {

    const renderFunction = RECHARGE_LIST_TABLE_COLUMNS.find(c => c.title === 'Resposta').render;

    it('retorna o response "-" quando não existir status', () => {
        const phoneRechargeLogs = [{ status: 'PAID', id: 1, response: 'test response' }];
        expect(renderFunction(phoneRechargeLogs)).toBe(phoneRechargeLogs[0].response);
    });

    it('retorna um botão para consultar mais informações se o status for COMPLETE ', () => {
        const phoneRechargeLogs = [{ status: 'COMPLETE', id: 1, response: 'test' }];

        render(renderFunction(phoneRechargeLogs));

        expect(screen.getByText('••• Mais informações')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});
