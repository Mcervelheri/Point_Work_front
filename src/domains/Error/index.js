import React from 'react';

import { Link } from 'react-router-dom';

import ContentPage from '../../components/ContentPage';

const ErrorPage = () => {
    return (
        <ContentPage title="Erro">
            <p>
                Voltar para a <Link to="/">Página Inicial</Link>.
            </p>
        </ContentPage>
    );
};

export default ErrorPage;
