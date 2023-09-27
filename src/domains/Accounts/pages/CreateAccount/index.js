import React from 'react';

import { UserAddOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

import ContentPage from '../components/ContentPage';
import Form from '../components/Form';
import Input from '../components/Input';
import { extractRequestError } from '../helpers/error-helper';
import { wrapForm } from '../helpers/form-helper';
import { removeMask } from '../helpers/masks';
import { messageSuccess } from '../helpers/toast';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';

import styles from './styles.module.scss';

const AccountCreate = ({ form }) => {

    const axios = useAxios();
    const history = useHistory();

    const { loading, call: createAccount } = useAsync(async () => {

        const { values } = form.getState();

        try {
            await axios.post('/registrar', {
                nome: values.name,
                email: values.email,
                cpf: values.nationalRegistration,
                senha: values.password,
                cargo: '2',
                admissao: '2023-09-01',
                demissao: '2023-09-04',
            });

            messageSuccess('Funcionario adicionado com sucesso!');

            history.push('/app/funcionarios');

        } catch (exception) {
            extractRequestError(exception);
        }

    }, [axios, form, history]);

    return (
        <ContentPage headerTitle="Criar novo funcionário">
            <div className={styles.container}>
                <Form>
                    <Input.Field
                        name="name"
                        label="nome"
                        placeholder="nome"
                        required
                    />
                    <Input.Field
                        name="email"
                        label="email"
                        placeholder="email"
                        required
                    />
                    <Input.Field
                        name="password"
                        label="senha"
                        placeholder="senha"
                        required
                    />
                    <Input.Field
                        name="nationalRegistration"
                        label="CPF"
                        placeholder="CPF"
                        required
                        parse={removeMask}
                    />
                </Form>

                <div className={styles.containerButton}>
                    <Button
                        type="primary"
                        onClick={createAccount}
                        icon={<UserAddOutlined />}
                        disabled={loading}
                    >
                        Adicionar novo funcionário
                    </Button>
                </div>
            </div>
        </ContentPage>
    );
};

export default wrapForm(AccountCreate);
