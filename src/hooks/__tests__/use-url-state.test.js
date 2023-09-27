import { renderHook } from '@testing-library/react-hooks';
import { useHistory, useLocation } from 'react-router-dom';

import useUrlState from '../use-url-state';

jest.mock('react-router-dom', () => ({
    useHistory: jest.fn().mockReturnValue({
        push: jest.fn(props => props),
    }),
    useLocation: jest.fn(),
}));

const QUERIES_PARSED = {
    order: 'asc',
    referenceDate: '2022-11-07',
};

const renderUseUrlState = options => {
    return renderHook(() => useUrlState(options));
};

const hookCreateQueryURL = () => {
    useLocation.mockReturnValue({ hash: '12345' });

    return renderUseUrlState();
};

const hookGetQueryURL = options => {
    useLocation.mockReturnValue({
        hash: '54321',
        search: 'referenceDate=2022-11-07&order=asc',
    });

    return renderUseUrlState(options);
};

describe('use-url-state | Testes Unitários', () => {
    describe('quando chamado o setState com o objeto de queries', () => {
        it('o método push é chamado com a query convertida em string', () => {
            const hook = hookCreateQueryURL();

            const history = useHistory();

            const [, setState] = hook.result.current;

            setState({
                paymentType: 'pix',
                currency: 'brl',
            });

            expect(history.push).toHaveBeenCalledWith({
                hash: '12345',
                search: 'currency=brl&paymentType=pix',
            });
        });
    });

    describe('quando chamado o setState com uma função', () => {
        it('chama a função passando o objeto com as queries atuais', () => {
            const hook = hookGetQueryURL();

            const [, setState] = hook.result.current;

            const setStateCallbackMock = jest.fn();

            setState(setStateCallbackMock);

            expect(setStateCallbackMock).toHaveBeenCalledWith(QUERIES_PARSED);
        });
    });

    describe('quando fornecido uma função para sanitização das queries', () => {
        it('executa a função de sanitização na montagem do hook', () => {
            const sanitizeMock = jest.fn();

            hookGetQueryURL({ sanitize: sanitizeMock });

            expect(sanitizeMock).toHaveBeenCalledWith(QUERIES_PARSED);
        });
    });

    describe('quando a URL possui queries', () => {
        it('retorna as queries da URL parseadas em um objeto', () => {
            const hook = hookGetQueryURL();

            const [state] = hook.result.current;

            expect(state).toEqual(QUERIES_PARSED);
        });
    });
});
