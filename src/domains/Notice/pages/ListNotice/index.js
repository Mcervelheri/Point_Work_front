import React, { useCallback, useState } from 'react';

import { LoadingOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

import ContentPage from '../../../../components/ContentPage';
import { extractRequestError } from '../../../../helpers/error-helper';
import useAsync from '../../../../hooks/use-async';
import useAxios from '../../../../hooks/use-axios';
import useDidMount from '../../../../hooks/use-did-mount';

import CardNotice from '../../components/CardNotice.js';
import styles from './styles.module.scss';

const ListNoticeScreen = () => {

    const [notices, setNotices] = useState(null);

    const history = useHistory();
    const axios = useAxios();

    const handleNavigate = useCallback(() => {
        history.push('/app/avisos/criar');
    }, [history]);

    const { loading, call: getListNotice } = useAsync(async () => {

        try {
            const response = await axios.get('avisos');

            return setNotices(response.data);
        } catch (exception) {
            extractRequestError(exception);
            return null;
        }

    }, [axios]);

    useDidMount(async () => {
        await getListNotice();
    });

    const renderButton = useCallback(() => {
        return (
            <Button
                type="primary"
                onClick={handleNavigate}
                icon={<UserAddOutlined />}
            >
                Adicionar novo aviso
            </Button>
        );
    }, [handleNavigate]);

    const renderItem = value => {
        if (!value) return null;

        return (
            <CardNotice title={value.titulo} message={value.conteudo} key={value.id} />
        );
    };

    const renderContent = () => {
        if (loading) {
            return <LoadingOutlined />;
        }

        if (notices?.length === 0 || !notices) {
            return (<span> sem avisos por enquanto</span>);
        }

        return notices.map(renderItem);
    };

    return (
        <ContentPage headerTitle="Avisos" headerButtons={renderButton()}>
            <div className={styles.container}>
                {renderContent()}
            </div>
        </ContentPage>
    );
};

export default ListNoticeScreen;
