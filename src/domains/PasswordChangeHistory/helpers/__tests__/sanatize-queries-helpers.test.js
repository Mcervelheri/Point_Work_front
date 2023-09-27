import { sanitizePasswordChangeHistoryQueries } from '../sanatize-queries-helpers';

describe('sanitizePasswordChangeHistoryQueries | Teste Unitário', () => {

    it('retorna um objeto com default quando não é passado nada', () => {
        expect(sanitizePasswordChangeHistoryQueries()).toEqual({
            page: 1,
            totalItemsPerPage: 10,
            clientIdentification: undefined,
            operation: undefined,
            operationResult: undefined,
            order: undefined,
            orderBy: undefined,
            endDate: undefined,
            initialDate: undefined,
        });
    });

    it('retorna o objeto com os valores corretos', () => {
        expect(sanitizePasswordChangeHistoryQueries({
            page: 2,
            totalItemsPerPage: 10,
            clientIdentification: '12174835940',
            operation: null,
            operationResult: null,
            order: 'ASC',
            orderBy: 'clientIdentification',
            endDate: null,
            initialDate: null,
        })).toEqual({
            page: 2,
            totalItemsPerPage: 10,
            clientIdentification: '12174835940',
            operation: undefined,
            operationResult: undefined,
            order: 'ASC',
            orderBy: 'clientIdentification',
            endDate: undefined,
            initialDate: undefined,
        });
    });
});
