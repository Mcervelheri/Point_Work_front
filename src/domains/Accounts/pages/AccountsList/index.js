import React, { useCallback } from 'react';

import { UserAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

import Breadcrumb from '../components/Breadcrumb';
import ContentPage from '../components/ContentPage';

import AccountsList from './components/AccountsList';
import styles from './styles.module.scss';

const BREADCRUMB_PATHS = [
    {
        path: '/app',
        name: 'Início',
    },
    {
        name: 'Funcionários',
    },
];

const AccountsPage = () => {

    const history = useHistory();

    const handleNavigate = useCallback(() => {
        history.push('/app/funcionarios/criar');
    }, [history]);

    const renderButton = useCallback(() => {
        return (
            <Button
                type="primary"
                onClick={handleNavigate}
                icon={<UserAddOutlined />}
            >
                Adicionar novo funcionário
            </Button>
        );
    }, [handleNavigate]);

    return (
        <>
            <Breadcrumb routes={BREADCRUMB_PATHS} />
            <ContentPage headerTitle="Funcionários" headerButtons={renderButton()}>
                <div className={styles.blockedListContainer}>
                    <AccountsList />
                </div>
            </ContentPage>
        </>
    );
};

export default AccountsPage;
