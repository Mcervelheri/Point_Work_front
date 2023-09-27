import React, { useState, useEffect, useCallback } from 'react';

import { Button } from 'antd';
import { useSelector } from 'react-redux';

import { extractRequestError } from '../../../../helpers/error-helper';
import { messageSuccess } from '../../../../helpers/toast';
import useAsync from '../../../../hooks/use-async';
import useAxios from '../../../../hooks/use-axios';

import styles from './styles.module.scss';

const Clock = () => {
    const axios = useAxios();
    const [currentTime, setCurrentTime] = useState(new Date());

    const userId = useSelector(state => state?.dataUser);
    // deixar isso aqui salvo para usar em outras oportunidades

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const { loading, call: markTimePoint } = useAsync(async () => {

        try {
            await axios.get(`/cartao-ponto/${userId}`);

            messageSuccess('Registro adicionado com sucesso!');

        } catch (exception) {
            extractRequestError(exception, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        }

    }, [axios, userId]);

    const handleMark = useCallback(async () => {
        await markTimePoint();
    }, [markTimePoint]);

    const formatTime = time => {
        const hours = String(time.getHours()).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');
        const seconds = String(time.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className={styles.containerClock}>
            <h2 className={styles.text}>Registre seu ponto!</h2>
            <p className={styles.text}>{formatTime(currentTime)}</p>
            <Button
                type="primary"
                className={styles.buttonRegisterTime}
                onClick={handleMark}
            >
                Registrar ponto
            </Button>
        </div>
    );
};

export default Clock;
