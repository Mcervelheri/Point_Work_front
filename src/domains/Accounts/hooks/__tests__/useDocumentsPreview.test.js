import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import useDocumentAccountId from '../useDocumentAccountId';
import useDocumentData from '../UseDocumentData';
import useDocumentsPreview from '../useDocumentsPreview';

jest.mock('../../../../helpers/error-helper', () => ({
    extractRequestError: jest.fn(),
}));

jest.mock('../../../../hooks/use-async', () => {
    return jest.fn(cb => ({
        loading: false,
        call: cb,
    }));
});

jest.mock('../useDocumentAccountId');
jest.mock('../UseDocumentData');

console.warn = jest.fn();
const getMock = jest.fn();

const DOCUMENT_ID = '12345';

const MOCK_SUCESS_RESPONSE = {
    accountId: 1,
    documentId: 14485,
    documentBase64: '/9j/4AAQSkZJRgABAQEASABIAAD4gIcSUNDX1BST0ZJTEUAAQEAAAIMbGNtcwIQAABtbnRyUkdCIFhZWiAH3A',
};

const MOCK_SUCESS_RESPONSE_ACCOUNT_ID = [
    { id: 3, type: 'SELFIE' },
    { id: 2, type: 'IDENTITY_CARD_VERSE' },
    { id: 14485, type: 'IDENTITY_CARD_FRONT' },
    { id: 14481, type: 'DRIVER_LICENSE_FRONT' },
    { id: 14484, type: 'DRIVER_LICENSE_VERSE' },
];

const mockApiSuccess = () => {
    axios.get = getMock.mockResolvedValue({
        data: MOCK_SUCESS_RESPONSE,
    });
};

const mockApiError = () => {
    axios.get = getMock.mockRejectedValue({
        data: null,
    });
};

const renderDocumentPreview = () => {
    return renderHook(() => useDocumentsPreview());
};

const hookWithSuccess = () => {
    mockApiSuccess();
    return renderDocumentPreview();
};

const hookWithError = () => {
    mockApiError();
    return renderDocumentPreview();
};

describe('Teste Unitário - useDocumentsPreview', () => {
    describe('Quando ocorre sucesso na requisição', () => {
        let hook;

        const getDocument = jest.fn();
        const getAccountIdMock = jest.fn().mockReturnValue(MOCK_SUCESS_RESPONSE_ACCOUNT_ID);

        beforeEach(async () => {
            useDocumentAccountId.mockReturnValue({
                fetchingDocumentByAccountId: false,
                requestDocumentByAccountId: getAccountIdMock,
            });

            useDocumentData.mockReturnValue({
                fetchingDocumentData: false,
                requestDocumentData: getDocument(),
            });

            hook = hookWithSuccess();
            await hook.result.current.getDocumentData(DOCUMENT_ID);
        });

        it('chama o hook useDocumentAccountId', () => {
            expect(useDocumentAccountId).toHaveBeenCalledTimes(1);
            expect(useDocumentAccountId).toHaveBeenCalledWith();
        });

        it('chama o hook useClientDetails', () => {
            expect(useDocumentData).toHaveBeenCalledTimes(1);
        });

        it('chama a função getDocument com o documentId pego na getAccountIdMock', () => {
            expect(getDocument).toHaveBeenCalledTimes(1);
        });

    });

    describe('Quando ocorre um erro na requisição', () => {
        let hook;

        beforeEach(() => {
            useDocumentAccountId.mockReturnValue({
                fetchingDocumentByAccountId: false,
                requestDocumentByAccountId: jest.fn(),
            });

            useDocumentData.mockReturnValue({
                fetchingDocumentData: false,
                requestDocumentData: jest.fn(),
            });

            hook = hookWithError();
            hook.result.current.getDocumentData(DOCUMENT_ID);
        });

        it('a função console.warn é chamada', () => {
            expect(console.warn).toHaveBeenCalled();
        });
    });
});
