import axios from 'axios';
import { FORM_ERROR } from 'final-form';

import { messageError } from './toast';

const DEFAULT_MESSAGE = 'Não foi possível concluir a operação, verifique os dados informados e tente novamente.';

const errorCodes = {
    30: response => ({
        [FORM_ERROR]: 'Atualize a página e tente novamente.'
            + 'Houve um erro ao validar os seus dados, ou não foi possível verificar a autenticidade do reCAPTCHA.'
        ,
    }),
    101: response => {
        messageError('Credenciais inválidas');
    },
    100: response => {
        messageError('Você não tem permissão, tente novamente mais tarde.');
    },
};

function defaultErrorMessage(response, defaultMessage) {

    const { status } = response;

    if ([412, 422].includes(status)) {
        messageError('Não foi possível concluir a operação, verifique os dados informados e tente novamente.');
        return {
            [FORM_ERROR]: 'Não foi possível concluir a operação, verifique os dados informados e tente novamente.',
        };
    }

    if (status === 403) {
        messageError('Operação não autorizada.');
        return {
            [FORM_ERROR]: 'Operação não autorizada.',
        };
    }

    if (status === 404) {
        messageError('O recurso que você solicitou não está disponível.');
        return {
            [FORM_ERROR]: 'O recurso que você solicitou não está disponível.',
        };
    }

    messageError(defaultMessage);
    return {
        [FORM_ERROR]: defaultMessage,
    };
}

/**
 * Faz a extração da mensagem de erro de acordo com os vários cenários que temos
 * @param {Error} err
 */
export function extractRequestError(err, defaultMessage = DEFAULT_MESSAGE) {

    if (axios.isCancel(err)) {
        return {};
    }

    const { response } = err;

    if (!response) {
        messageError('Você parece estar offline, verifique sua conexão com a internet.');
        return {};
    }

    const errorCode = response.data?.error?.code;
    const errorFunc = errorCodes[errorCode];
    if (typeof errorFunc === 'function') {
        return errorFunc(response);
    }

    return defaultErrorMessage(response, defaultMessage);
}
