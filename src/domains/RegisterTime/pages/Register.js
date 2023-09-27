import React from 'react';

import ContentPage from '../../../components/ContentPage';

import Clock from '../components/Clock/index';
import styles from './Register.module.scss';

const Register = () => {
    return (
        <ContentPage headerTitle="Registro de ponto">
            <div className={styles.container}>
                <Clock />
            </div>
        </ContentPage>
    );
};

export default Register;
