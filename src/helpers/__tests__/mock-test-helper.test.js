import React from 'react';

import { screen } from '@testing-library/react';

import { createWithMocks, renderWithMocks } from '../helpers/mock-test-helper';
import { ElementUseDispatch, ElementUseLocation, ElementUseSelector } from '../helpers/test-components-helper';

describe('Quando usada a função renderWithMocks', () => {

    describe('e o componente utiliza os hooks do redux', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('retorna o valor passado pela config do useSelectorValues', () => {

            const defaultConfig = {
                useSelectorValues: {
                    title: 'mocked title',
                },
            };

            renderWithMocks(<ElementUseSelector />, defaultConfig);

            expect(screen.getByText('mocked title')).toBeInTheDocument();
        });

        it(`retorna um erro quando um componente que possui um useDispatch no seu useEffect não recebe a config
        mockDispatch como true`, () => {

            try {
                renderWithMocks(<ElementUseDispatch />, {});
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
            }

        });

        it(`renderiza corretamente um componente que possui um useDispatch no seu useEffect 
        quando passada a config mockDispatch true`, () => {

            const defaultConfig = {
                mockDispatch: true,
            };

            renderWithMocks(<ElementUseDispatch />, defaultConfig);

            expect(screen.getByText('use dispatch element')).toBeInTheDocument();
        });
    });

    describe('e o componente utiliza o hook useLocation', () => {

        it('mocka o useLocation quando o atributo mockLocation da config for true', () => {

            const defaultConfig = {
                mockLocation: true,
            };

            renderWithMocks(<ElementUseLocation />, defaultConfig);

            expect(screen.getByText('key: 5nvxpbdafa')).toBeInTheDocument();
        });

        it('não mocka o useLocation quando o atributo mockLocation da config for false', () => {

            const defaultConfig = {
                mockLocation: false,
            };

            renderWithMocks(<ElementUseLocation />, defaultConfig);

            expect(screen.queryByText('key: 5nvxpbdafa')).not.toBeInTheDocument();
        });

        it('retorna o atributo title passado no locationState', () => {

            const defaultConfig = {
                mockLocation: true,
                locationState: {
                    title: 'use location test',
                },
            };

            renderWithMocks(<ElementUseLocation />, defaultConfig);

            expect(screen.getByText('State example: use location test')).toBeInTheDocument();
        });

        it('retorna o path mockado através do atributo pathName do config', () => {

            const defaultConfig = {
                mockLocation: true,
                pathName: '/test-location-state',
            };

            renderWithMocks(<ElementUseLocation />, defaultConfig);

            expect(screen.getByText('pathname: /test-location-state')).toBeInTheDocument();
        });

        it('retorna o search mockado através do atributo search do config', () => {

            const defaultConfig = {
                mockLocation: true,
                search: '?limit=10&page=1&sort=desc',
            };

            renderWithMocks(<ElementUseLocation />, defaultConfig);

            expect(screen.getByText('search: ?limit=10&page=1&sort=desc')).toBeInTheDocument();
        });
    });
});

describe('Quando usada a função createWithMocks', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renderiza corretamente o valor passado pela config do useSelectorValues', () => {

        const defaultConfig = {
            useSelectorValues: {
                title: 'mocked title',
            },
        };

        const element = createWithMocks(<ElementUseSelector />, defaultConfig);

        expect(element.toJSON()).toMatchInlineSnapshot(`
           <span>
             mocked title
           </span>
        `);
    });

    it('renderiza corretamente os valores passados na config relacionados ao mock do useLocation', () => {

        const defaultConfig = {
            mockLocation: true,
            locationState: {
                title: 'use location test',
            },
            pathName: '/test-location-state',
            search: '?limit=10&page=1&sort=desc',
        };

        const element = createWithMocks(<ElementUseLocation />, defaultConfig);

        expect(element.toJSON()).toMatchSnapshot();
    });
});
