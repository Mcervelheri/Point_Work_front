import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import useDocumentData from '../UseDocumentData';

jest.mock('../../../../helpers/error-helper', () => ({
    extractRequestError: jest.fn(),
}));

jest.mock('../../../../hooks/use-async', () => {
    return jest.fn(cb => ({
        loading: false,
        call: cb,
    }));
});

console.warn = jest.fn();
const getMock = jest.fn();

const DOCUMENT_ID = '12345';

const URL_ACCOUNT_ID_DOCUMENT = `/bff/private/v1/back-office/document/${DOCUMENT_ID}/data`;

const MOCK_SUCESS_RESPONSE = {
    accountId: 1,
    documentId: 14485,
    documentBase64: '/9j/4AAQSkZJRgABAQEASABIAAD4gIcSUNDX1BST0ZJTEUAAQEAAAIMbGNtcwIQAABtbnRyUkdCIFhZWiAH3A',
};

const MOCK_EMPTY_RESPONSE = {
    code: 'DOCUMENT-ERROR-004',
    title: 'Ops...',
    message: 'Falha ao realizar download do documento.',
    report: {},
    exception: {
        code: 'DOCUMENT-ERROR-004',
        title: 'Ops...',
        name: 'HttpError',
        statusCode: 500,
        report: {},
        level: 'error',
        timestamp: '2023-01-30T13:41:36.071Z',
    },
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

const renderDocumentData = () => {
    return renderHook(() => useDocumentData());
};

const hookWithSuccess = () => {
    mockApiSuccess();
    return renderDocumentData();
};

const hookWithEmptyResult = () => {
    mockApiEmpty();
    return renderDocumentData();
};

const hookWithError = () => {
    mockApiError();
    return renderDocumentData();
};

describe('Teste Unitário - useDocumentData', () => {
    describe('Quando ocorre sucesso na requisição', () => {
        let hook;
        let response;
        beforeEach(async () => {
            hook = hookWithSuccess();
            response = await hook.result.current.requestDocumentData(DOCUMENT_ID);
        });

        it('a requisição é chamada com a URL correta', () => {
            expect(getMock).toBeCalledWith(URL_ACCOUNT_ID_DOCUMENT);
        });

        it('retorna o base64 do documento', () => {
            expect(response).toEqual(MOCK_SUCESS_RESPONSE.documentBase64);
        });
    });

    describe('Quando a requisição é chamada com sucesso e não encontra resultados', () => {
        let hook;
        let response;
        beforeEach(async () => {
            hook = hookWithEmptyResult();
            response = await hook.result.current.requestDocumentData(DOCUMENT_ID);
        });

        it('o retorno de requestDocumentData é undefined', () => {
            expect(response).toEqual(undefined);
        });
    });

    describe('Quando ocorre um erro na requisição', () => {
        let hook;

        beforeEach(() => {
            hook = hookWithError();
            hook.result.current.requestDocumentData(DOCUMENT_ID);
        });

        it('a função console.warn é chamada', () => {
            expect(console.warn).toHaveBeenCalled();
        });
    });
});
