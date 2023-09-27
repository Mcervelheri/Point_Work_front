import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import { extractRequestError } from '../helpers/error-helper';

import useDocumentAccountId from '../useDocumentAccountId';

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

const ACCOUNT_ID_MOCK = '12345';

const URL_ACCOUNT_ID_DOCUMENT = `/bff/private/v1/back-office/document/${ACCOUNT_ID_MOCK}`;

const MOCK_SUCESS_RESPONSE = {
    documents: [
        { id: 3, type: 'SELFIE' },
        { id: 2, type: 'IDENTITY_CARD_VERSE' },
        { id: 14485, type: 'IDENTITY_CARD_FRONT' },
        { id: 14481, type: 'DRIVER_LICENSE_FRONT' },
        { id: 14484, type: 'DRIVER_LICENSE_VERSE' },
    ],
};

const MOCK_EMPTY_RESPONSE = {
    documents: [],
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

const renderAccountId = () => {
    return renderHook(() => useDocumentAccountId());
};

const hookWithSuccess = () => {
    mockApiSuccess();
    return renderAccountId();
};

const hookWithEmptyResult = () => {
    mockApiEmpty();
    return renderAccountId();
};

const hookWithError = () => {
    mockApiError();
    return renderAccountId();
};

describe('Teste Unitário - useDocumentAccountId', () => {
    describe('Quando ocorre sucesso na requisição', () => {
        let hook;
        let response;
        beforeEach(async () => {
            hook = hookWithSuccess();
            response = await hook.result.current.requestDocumentByAccountId(ACCOUNT_ID_MOCK);
        });

        it('a requisição é chamada com a URL correta', () => {
            expect(getMock).toBeCalledWith(URL_ACCOUNT_ID_DOCUMENT);
        });

        it('retorna a lista com os ids dos documentos do usuário', () => {
            expect(response).toEqual(MOCK_SUCESS_RESPONSE.documents);
        });
    });

    describe('Quando a requisição é chamada com sucesso e não encontra resultados', () => {
        let hook;
        let response;
        beforeEach(async () => {
            hook = hookWithEmptyResult();
            response = await hook.result.current.requestDocumentByAccountId(ACCOUNT_ID_MOCK);
        });

        it('o retorno de requestDocumentByAccountId é um array vazio', () => {
            expect(response).toEqual(MOCK_EMPTY_RESPONSE.documents);
        });
    });

    describe('Quando ocorre um erro na requisição', () => {
        let hook;

        beforeEach(() => {
            hook = hookWithError();
            hook.result.current.requestDocumentByAccountId(ACCOUNT_ID_MOCK);
        });

        it('a função extractRequestError é chamada', () => {
            expect(extractRequestError).toHaveBeenCalled();
        });
    });
});
