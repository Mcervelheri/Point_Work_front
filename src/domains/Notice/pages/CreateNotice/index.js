import React from 'react';

import { UserAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ContentPage from '../../../../components/ContentPage';
import Input from '../../../../components/Input';
import { extractRequestError } from '../../../../helpers/error-helper';
import { wrapForm } from '../../../../helpers/form-helper';
import { messageSuccess } from '../../../../helpers/toast';
import useAsync from '../../../../hooks/use-async';
import useAxios from '../../../../hooks/use-axios';

import styles from './styles.module.scss';

const CreateNoticeScreen = ({ form }) => {

    const userId = useSelector(state => state?.dataUser);

    const axios = useAxios();
    const history = useHistory();

    const { loading, call: handleAddNotice } = useAsync(async () => {

        const { values } = form.getState();

        try {
            await axios.post(`registrar-avisos/${userId}`, {
                titulo: values.title,
                conteudo: values.message,
            });

            messageSuccess('Aviso adicionado com sucesso!');

            history.push('/app/avisos');

        } catch (exception) {
            extractRequestError(exception);
        }

    }, [axios, form, userId, history]);

    return (
        <ContentPage headerTitle="Criar aviso">
            <div className={styles.container}>
                <form>
                    <Input.Field
                        name="title"
                        label="Titulo"
                        placeholder="Titulo"
                        required
                    />
                    <Input.Field
                        name="message"
                        label="Mensagem"
                        placeholder="Mensagem"
                        required
                    />
                </form>

                <div className={styles.containerButton}>
                    <Button
                        type="primary"
                        icon={<UserAddOutlined />}
                        onClick={handleAddNotice}
                        disabled={loading}
                    >
                        Adicionar novo aviso
                    </Button>
                </div>
            </div>
        </ContentPage>
    );
};

export default wrapForm(CreateNoticeScreen);
