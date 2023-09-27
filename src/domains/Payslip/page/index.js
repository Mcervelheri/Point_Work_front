import React from 'react';

import ContentPage from '../../../components/ContentPage';

import HoleriteComponent from '../components/holeriteComponent';

const PaySlipScreen = () => {
    // Exemplo de dados do holerite
    const holeriteData = {
        nome: 'João da Silva',
        cargo: 'Desenvolvedor',
        salario: 5000.0,
        descontos: ['INSS (11%)', 'Imposto de Renda (15%)'],
        beneficios: ['Vale Refeição - 300.00', 'Plano de Saúde - 300.00'],
    };

    return (
        <ContentPage headerTitle="Holerite">
            <div>
                <HoleriteComponent
                    nome={holeriteData.nome}
                    cargo={holeriteData.cargo}
                    salario={holeriteData.salario}
                    descontos={holeriteData.descontos}
                    beneficios={holeriteData.beneficios}
                />
            </div>
        </ContentPage>
    );
};

export default PaySlipScreen;
