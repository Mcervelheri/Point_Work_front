import moment from 'moment-timezone';

import {
    disabledDate, formatCurrentDate, formatDate,
    isValidDate, subtractDaysFromToday,
} from '../helpers/date-helper';

jest.useFakeTimers('modern');

jest.setSystemTime(new Date('2022-12-09T03:00:00.000'));

const dates = [
    moment('2022-12-08T21:16:21.906Z'),
    moment('2022-12-10T21:16:21.906Z'),
];

test('Valida se a função disabledDate retorna false quando nenhuma lista de datas é passada', () => {

    const result = disabledDate(moment(), []);

    expect(result).toBe(false);
});

test('Valida se a função disabledDate retorna false quando uma data válida é passada', () => {

    const result = disabledDate(moment(), dates);

    expect(result).toBe(false);
});

test('Valida se a função disabledDate retorna true quando uma data maior que 30 dias da data inicial é passada', () => {

    const datesTooLate = [
        moment('2022-10-08T21:16:21.906Z'),
        moment('2022-12-10T21:16:21.906Z'),
    ];

    const result = disabledDate(moment(), datesTooLate);

    expect(result).toBe(true);
});

test('Valida se a função disabledDate retorna true quando uma data menor que 30 dias da data final é passada', () => {

    const datesTooEarly = [
        moment('2022-12-08T21:16:21.906Z'),
        moment('2023-10-10T21:16:21.906Z'),
    ];

    const result = disabledDate(moment(), datesTooEarly);

    expect(result).toBe(true);
});

describe('formatDate', () => {
    test('retorna a data fornecida formatada no padrão DD/MM/YYYY', () => {
        expect(formatDate('2022-10-11', 'DD/MM/YYYY')).toBe('11/10/2022');
    });

    test('retorna a data fornecida formatada no padrão YYYY-MM-DD', () => {
        expect(formatDate('2022-10-11', 'YYYY-MM-DD')).toBe('2022-10-11');
    });

    test('retorna null caso não seja informado uma data', () => {
        expect(formatDate(null, 'YYYY-MM-DD')).toBe(null);
        expect(formatDate(undefined, 'YYYY-MM-DD')).toBe(null);
    });

    test('retorna a data formatada a partir de uma data com um padrão diferente de ISO 8601', () => {
        expect(formatDate('17/08/2022', 'DD-MM-YYYY', 'DD/MM/YYYY')).toBe('17-08-2022');
    });
});

describe('formatCurrentDate', () => {
    beforeAll(() => {
        Date.now = jest.fn(() => new Date('2022-06-30'));
    });

    test('retorna a data formatada no padrão DD/MM/YYYY', () => {
        expect(formatCurrentDate('DD/MM/YYYY')).toBe('30/06/2022');
    });

    test('retorna a data formatada no padrão YYYY-MM-DD', () => {
        expect(formatCurrentDate('YYYY-MM-DD')).toBe('2022-06-30');
    });
});

describe('isValidDate', () => {
    test('retorna true para uma data válida', () => {
        expect(isValidDate('2022-11-04')).toBe(true);
    });

    test('retorna true para uma data válida passando o padrão da data', () => {
        expect(isValidDate('04/11/2022', 'DD/MM/YYYY')).toBe(true);
    });

    test('retorna false para uma data válida', () => {
        expect(isValidDate('9999-00-80')).toBe(false);
    });
});

describe('subtractDaysFromToday', () => {
    test('retorna menos 2 dias a partir da data 07/06/2022 no formato YYYY-MM-DD', () => {
        Date.now = jest.fn(() => new Date('2022-06-07T00:00:00.000Z'));

        expect(subtractDaysFromToday(2)).toBe('2022-06-05');
    });
});
