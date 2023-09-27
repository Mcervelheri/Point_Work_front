import {
    sanitizeAccountsQueries, sanitizeBlockedAccountsQueries,
} from '../sanitize-accounts-queries-helper';

const DEFAULT_VALUES_ACCOUNT = {
    page: 1,
    limit: 10,
    spd: undefined,
    order: undefined,
    status: undefined,
    orderBy: undefined,
    account: undefined,
    finalDate: undefined,
    initialDate: undefined,
    totalItemsPerPage: 10,
};

const REQUEST_VALUES_ACCOUNT = {
    page: 2,
    limit: 30,
    spd: '3',
    order: 'DESC',
    status: 'ACTIVE',
    orderBy: 'name',
    account: '23423423',
    totalItemsPerPage: 10,
    finalDate: '2023-01-29',
    initialDate: '2023-01-26',
};

const DEFAULT_VALUES_BLOCKED_ACCOUNT = {
    page: 1,
    limit: 10,
    sort: undefined,
    account: undefined,
    endDate: undefined,
    orderBy: undefined,
    operator: undefined,
    startDate: undefined,
    tab: 'BLOCKED_ACCONTS',
    nationalRegistration: undefined,
};

const REQUEST_VALUES_BLOCKED_ACCOUNT = {
    page: 7,
    limit: 10,
    sort: 'ASC',
    orderBy: 'name',
    account: '123457',
    endDate: '2023-01-30',
    tab: 'BLOCKED_ACCONTS',
    startDate: '2023-01-22',
    operator: 'Camus de Aquário',
    nationalRegistration: '56456517079',
};

describe('Teste Unitário - sanitizeAccountsQueries', () => {

    it('retorna um objeto com default quando não é passado nada', () => {
        expect(sanitizeAccountsQueries()).toEqual(DEFAULT_VALUES_ACCOUNT);
    });

    it('retorna o objeto com os valores corretos', () => {
        expect(sanitizeAccountsQueries({
            page: 2,
            limit: 30,
            spd: '3',
            order: 'DESC',
            status: 'ACTIVE',
            orderBy: 'name',
            account: '23423423',
            totalItemsPerPage: 10,
            finalDate: '2023-01-29',
            initialDate: '2023-01-26',
        })).toEqual(REQUEST_VALUES_ACCOUNT);
    });
});

describe('Teste Unitário - sanitizeBlockedAccountsQueries', () => {

    it('retorna um objeto com default quando não é passado nada', () => {
        expect(sanitizeBlockedAccountsQueries()).toEqual(DEFAULT_VALUES_BLOCKED_ACCOUNT);
    });

    it('retorna o objeto com os valores corretos', () => {
        expect(sanitizeBlockedAccountsQueries({
            page: 7,
            limit: 10,
            sort: 'ASC',
            orderBy: 'name',
            account: '123457',
            endDate: '2023-01-30',
            tab: 'BLOCKED_ACCONTS',
            startDate: '2023-01-22',
            operator: 'Camus de Aquário',
            nationalRegistration: '56456517079',
        })).toEqual(REQUEST_VALUES_BLOCKED_ACCOUNT);
    });
});
