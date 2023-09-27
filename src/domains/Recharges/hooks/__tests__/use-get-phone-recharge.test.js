import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import { extractRequestError } from '../helpers/error-helper';

import useGetPhoneRecharges from '../use-get-phone-recharge';

jest.mock('../../../../helpers/error-helper', () => ({
    extractRequestError: jest.fn(),
}));

jest.mock('../../../../hooks/use-async', () => {
    return jest.fn(cb => ({
        loading: false,
        call: cb,
    }));
});

const getMock = jest.fn();

const URL_PHONE_RECHARGE = '/bff/private/v1/back-office/phone/recharges/reports';

const MOCK_SUCESS_RESPONSE = {
    page: 3,
    totalOfItems: 36,
    data: [
        {
            account: 3234,
            codigoPDV: '1022',
            idRechargeOperator: 1,
            valueRechargeOperator: 10,
            cellphoneRecharge: '44123456789',
            createdAt: '2022-04-05T21:16:19.590Z',
            id: '3545ed66-eb56-4cb5-ab47-1d20d499190f',
            phoneRechargeLogs: [
                {
                    status: 'START',
                    response: null,
                    exception: null,
                    createdAt: '2022-04-05T21:16:21.906Z',
                    id: '2d9c17c2-7794-4fd0-a264-0bfd7aceca25',
                },
            ],
        },
    ],
};

const MOCK_EMPTY_RESPONSE = {
    page: 1,
    data: [],
    totalOfItems: 0,
    totalOfPages: 0,
};

const MOCK_QUERIES = {
    page: '1',
    sort: 'ASC',
    limit: '10',
    status: null,
    phone: '99999999999',
    endDate: '2022-12-28',
    startDate: '2022-11-28',
};

const mockApiSuccess = () => {
    axios.get = getMock.mockResolvedValue({
        data: MOCK_SUCESS_RESPONSE,
    });
};

const mockApiEmpty = () => {
    axios.get = getMock.mockResolvedValue({
        data: MOCK_EMPTY_RESPONSE,
    });
};

const mockApiError = () => {
    axios.get = getMock.mockRejectedValue({
        data: null,
    });
};

const renderPhoneRecharge = () => {
    return renderHook(() => useGetPhoneRecharges(MOCK_QUERIES));
};

const hookWithSuccess = () => {
    mockApiSuccess();
    return renderPhoneRecharge();
};

const hookWithEmptyResult = () => {
    mockApiEmpty();
    return renderPhoneRecharge();
};

const hookWithError = () => {
    mockApiError();
    return renderPhoneRecharge();
};

describe('Teste Unitário - useGetPhoneRecharges', () => {
    describe('Quando ocorre sucesso na requisição', () => {
        let hook;

        beforeEach(async () => {
            hook = hookWithSuccess();
            hook.result.current.phoneRechargeDataRequest();
            await hook.waitForNextUpdate();
        });

        it('a requisição é chamada com a URL correta', () => {
            expect(getMock).toBeCalledWith(URL_PHONE_RECHARGE, {
                params: {
                    page: MOCK_QUERIES.page,
                    sort: MOCK_QUERIES.sort,
                    status: MOCK_QUERIES.status,
                    endDate: MOCK_QUERIES.endDate,
                    phoneNumber: MOCK_QUERIES.phone,
                    startDate: MOCK_QUERIES.startDate,
                    totalItemsPerPage: MOCK_QUERIES.limit,
                },
            });
        });

        it('retorna a lista com as recargas efetuadas', () => {
            expect(hook.result.current.phoneRechargeData).toEqual(MOCK_SUCESS_RESPONSE.data);
        });
    });

    describe('Quando a requisição é chamada com sucesso e não encontra resultados', () => {
        let hook;

        beforeEach(async () => {
            hook = hookWithEmptyResult();
            hook.result.current.phoneRechargeDataRequest();
            await hook.waitForNextUpdate();
        });

        it('o valor da propriedade phoneRechargeData é um array vazio', async () => {
            expect(hook.result.current.phoneRechargeData).toEqual(MOCK_EMPTY_RESPONSE.data);
        });
    });

    describe('Quando ocorre um erro na requisição', () => {
        let hook;

        beforeEach(async () => {
            hook = hookWithError();

            hook.result.current.phoneRechargeDataRequest();

            await hook.waitForNextUpdate();
        });

        it('a função extractRequestError é chamada', async () => {
            expect(extractRequestError).toHaveBeenCalled();
        });

        it('o valor da propriedade phoneRechargeData é um array vazio', async () => {
            expect(hook.result.current.phoneRechargeData).toEqual([]);
        });
    });
});
