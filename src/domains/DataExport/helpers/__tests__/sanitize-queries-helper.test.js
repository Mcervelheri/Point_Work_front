import { sanitizeExportDataQueries } from '../sanitize-queries-helper';

const DEFAULT_QUERY = {
    referenceDate: undefined,
};

const VALID_QUERY = {
    referenceDate: '2022-11-23',
};

const createQuery = date => ({
    referenceDate: date,
});

describe('quando a data da query não é uma data válida', () => {
    beforeAll(() => {
        jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    });

    it('retorna um objeto com undefined na propriedade referenceDate', () => {
        expect(sanitizeExportDataQueries()).toEqual(DEFAULT_QUERY);
        expect(sanitizeExportDataQueries(createQuery('9999-99-99'))).toEqual(DEFAULT_QUERY);
        expect(sanitizeExportDataQueries(createQuery('2022-11-32'))).toEqual(DEFAULT_QUERY);
        expect(sanitizeExportDataQueries(createQuery('data-invalida'))).toEqual(DEFAULT_QUERY);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });
});

describe('quando a data da query é uma data válida', () => {
    it('retorna um objeto com a data recebida da query na propriedade referenceDate', () => {
        expect(sanitizeExportDataQueries(createQuery('2022-11-23'))).toEqual(VALID_QUERY);
    });
});
