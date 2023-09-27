import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ClientsVipListPage from '.';
import AddClientVipDialog from '../../components/AddClientVipDialog';
import DeleteClientVipDialog from '../../components/DeleteClientVipDialog';
import useListClientVip from '../../hooks/use-list-client-vip';

jest.mock('react-router-dom', () => ({
    useHistory: jest.fn().mockReturnValue({
        goBack: jest.fn(),
    }),
}));

const MOCK_LIST = [
    {
        id: 4,
        name: 'Mr. Sexta F.',
        nationalRegistration: '06635761489',
    },
    {
        id: 5,
        name: 'naruto',
        nationalRegistration: '09668738900',
    },
    {
        id: 6,
        name: 'Uzumaki',
        nationalRegistration: '09668743903',
    },
];

jest.mock('../../hooks/use-list-client-vip');
jest.mock('../../components/AddClientVipDialog');
jest.mock('../../components/DeleteClientVipDialog');
jest.mock('../../components/FilterClientsVip', () => {
    return () => <div>FilterClientsVip</div>;
});
jest.mock('../../components/ButtonDeleteSingleClient', () => {
    return () => <div>ButtonDeleteSingleClient</div>;
});
jest.mock('../../components/ButtonEditClientVip', () => {
    return () => <div>ButtonEditClientVip</div>;
});
jest.mock('../../../../components/Breadcrumb', () => {
    return () => <div>Breadcrumb</div>;
});

const clientsVipRequestMock = jest.fn();

describe('ClientsVipsListPage - Testes Unitários', () => {
    beforeEach(() => {
        useListClientVip.mockReturnValue({
            fetchingClientsVip: false,
            totalItems: 10,
            clientsVipRequest: clientsVipRequestMock,
            listItems: MOCK_LIST,
        });

        render(
            <ClientsVipListPage />,
        );
    });

    it('o título da página, o filtro e o breadcrumb são mostrados', () => {
        expect(screen.getByText('Clientes convidados')).toBeInTheDocument();
        expect(screen.getByText('Breadcrumb')).toBeInTheDocument();
        expect(screen.getByText('FilterClientsVip')).toBeInTheDocument();
    });

    it('chama o request que irá trazer a lista de clientes convidados', () => {
        expect(clientsVipRequestMock).toHaveBeenCalledWith({
            currentPage: 1,
            name: undefined,
            nationalRegistration: undefined,
            order: null,
            orderBy: null,
            totalItemsPerPage: 10,
        });
    });

    it.each`
        field      | fieldName
        ${'CPF'}   | ${'nationalRegistration'}  
        ${'Nome'}  | ${'name'}  
    `('chama o request novamente após ordenar por $field', ({ field, fieldName }) => {
        userEvent.click(screen.getByText(field));

        expect(clientsVipRequestMock).toHaveBeenLastCalledWith({
            currentPage: 1,
            name: undefined,
            nationalRegistration: undefined,
            order: fieldName,
            orderBy: 'ASC',
            totalItemsPerPage: 10,
        });
    });

    it('exibe os dados dos clientes vip na tabela', () => {
        const name = screen.getByText('Mr. Sexta F.');
        const nationalRegistration = screen.getByText('066.357.614-89');

        expect(name).toBeInTheDocument();
        expect(nationalRegistration).toBeInTheDocument();
    });

    it('abre a modal para adicionar um novo cliente', () => {
        const buttonAdd = screen.getByText('Adicionar novo cliente');

        userEvent.click(buttonAdd);

        expect(AddClientVipDialog.show).toHaveBeenCalled();
    });

    it('abre a modal de confirmação para deleção em massa', () => {
        const buttonDelete = screen.getByText('Excluir selecionados');
        const checkboxInput = screen.getAllByRole('checkbox');

        userEvent.click(checkboxInput[0]);

        userEvent.click(buttonDelete);

        expect(DeleteClientVipDialog.show).toHaveBeenCalled();
    });
});
