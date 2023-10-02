import React, { useCallback } from 'react';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Form from '../../../../components/Form';
import Input from '../../../../components/Input';
import { extractRequestError } from '../../../../helpers/error-helper';
import { wrapForm } from '../../../../helpers/form-helper';
import { messageError } from '../../../../helpers/toast';
import { validateEmail, validatePassword } from '../../../../helpers/validations';
import useAsync from '../../../../hooks/use-async';
import useAxios from '../../../../hooks/use-axios';
import useDidMount from '../../../../hooks/use-did-mount';
import { actions } from '../../../../redux/ducks';
import { urlLogin } from '../../../../values/urls/authentication';

import styles from './styles.module.scss';

const LoginPage = ({ form, handleSubmit }) => {

    const axios = useAxios();

    const dispatch = useDispatch();
    const history = useHistory();

    const handleNavigate = useCallback(() => {
        return history.push('/app');
    }, [history]);

    const { hasValidationErrors } = form.getState();

    const { loading, call: loginRequest } = useAsync(async values => {

        try {
            const { username, password } = values;

            const response = await axios.post(urlLogin(), { email: username, senha: password });

            if (response.data.msg === 'Usuário não encontrado' || response.data.msg === 'Senha incorreta') {
                return messageError('Usuário ou senha incorreta.');
            }

            dispatch(actions.usuario.setDataUser(response.data.id));

            return handleNavigate();

        } catch (exception) {
            const code = exception?.response?.data?.code
            || exception?.response?.data?.report?.body?.code;

            switch (code) {
                case 'TOKEN-000':
                    return messageError('Usuário ou senha invalidos. Tente novamente.');
                default:
                    return extractRequestError(
                        exception, 'Não foi possível realizar a operação, tente novamente mais tarde.',
                    );
            }

        }

    }, [axios, handleNavigate, dispatch]);

    useDidMount(() => {
        form?.pauseValidation();
    });

    return (
        <div className={styles.container}>
            <img
                className={styles.logoImage}
                src={require('../../../../assets/Point work.png').default}
                alt="Logotipo Point work"
            />
            <p>
                Login
            </p>

            <div className={styles.formContainer}>

                <Form onSubmit={handleSubmit(loginRequest)}>
                    <Input.Field
                        id="username"
                        name="username"
                        placeholder="Email"
                        validate={validateEmail}
                        required
                        prefix={<UserOutlined className={styles.prefixIcon} />}
                    />

                    <Input.Field
                        name="password"
                        placeholder="Senha"
                        type="password"
                        validate={validatePassword}
                        required
                        prefix={<LockOutlined className={styles.prefixIcon} />}
                    />

                    <div className={styles.checkboxContainer}>
                        <Button type="link" size="large" className={styles.link}>
                            Esqueceu sua senha?
                        </Button>
                    </div>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={hasValidationErrors}
                        block
                    >
                        Acessar
                    </Button>
                </Form>
            </div>

            <div className={styles.footerTitle}>
                <p>
                    Point work
                </p>
            </div>

        </div>
    );
};

export default wrapForm(LoginPage, { validateOnBlur: false });
