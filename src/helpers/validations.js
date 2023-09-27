import moment from 'moment-timezone';

import { removeMask } from './masks';

const CPF_BLACKLIST = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    '12345678909',
];

const CNPJ_BLACKLIST = [
    '00000000000000',
    '11111111111111',
    '22222222222222',
    '33333333333333',
    '44444444444444',
    '55555555555555',
    '66666666666666',
    '77777777777777',
    '88888888888888',
    '99999999999999',
];

/* eslint-disable max-len */
const REGEX_URL = /^https?:\/\/([\w-.:]+)(\/?|\/.+)$/;
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX_CEP = /^[0-9]{8}$/;
const REGEX_TELEFONE = /^[0-9]{10,11}$/;
const REGEX_COLOR = /^#[a-f\d]{6}$/i;
const REGEX_YEAR = /^\d{4}$/;
/* eslint-enable */

export const validateName = value => {
    if (typeof value === 'string') {
        const parts = value.trim().split(' ');
        if (parts.length >= 2) {
            const partsAreValid = parts.reduce((valid, part) => (
                valid && part.length >= 2
            ), true);
            if (partsAreValid) {
                return undefined;
            }
        }
    }
    return 'Informe o nome completo';
};

export const validateCheckbox = value => {
    return value ? undefined : 'Este campo precisa ser marcado.';
};

export const validateEmail = value => (
    REGEX_EMAIL.test(value) ? undefined : 'E-mail inválido.'
);

export const validatePassword = value => (
    !!value && value.length >= 6 && value.length <= 20 ? undefined
        : 'A senha deve conter no mínimo 6 e no máximo 20 caracteres'
);

export const validateNotEmpty = value => {
    let valid;
    if (typeof value === 'string') {
        valid = Boolean(value.trim());
    } else if (Array.isArray(value)) {
        valid = Boolean(value.length);
    } else {
        valid = Boolean(value);
    }
    return valid ? undefined : 'Campo obrigatório';
};

export const validateCVV = value => {
    if (!value) {
        return 'Informe um CVV de 3 à 4 caracteres';
    } if (!(String(value).length === 3 || String(value).length === 4)) {
        return 'Informe um CVV de 3 à 4 caracteres';
    }
    return undefined;
};

const isValidNumber = value => {
    switch (typeof value) {
        case 'number':
            return Number.isFinite(value);
        case 'string':
            return /^[0-9,.]+$/.test(value);
        default:
            return false;
    }
};

export const validateNumber = value => {
    return isValidNumber(value) ? undefined : 'Deve conter apenas números';
};

export const validateAge = value => {
    if (!isValidNumber(value)) {
        return 'Deve conter apenas números';
    }
    if (value > 120) {
        return 'A idade deve ser menor do que 121';
    }
    return undefined;
};

const verifierDigitCPF = value => {
    const numbers = value
        .split('')
        .map(number => Number(number));
    const modulus = numbers.length + 1;
    const multiplied = numbers.map((number, index) => number * (modulus - index));
    const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;
    return (mod < 2 ? 0 : 11 - mod);
};

export const validateCPF = value => {
    const stripped = (value || '').replace(/[^\d]/g, '');

    if (stripped && stripped.length === 11 && CPF_BLACKLIST.indexOf(stripped) === -1) {
        let numbers = stripped.substr(0, 9);
        numbers += verifierDigitCPF(numbers);
        numbers += verifierDigitCPF(numbers);

        if (numbers.substr(-2) === stripped.substr(-2)) {
            return undefined;
        }
    }
    return 'Número de CPF inválido';
};

export const validateUrl = value => (
    REGEX_URL.test(value) ? undefined : 'URL inválida'
);

export const validateDate = value => {
    return moment(value, 'DD/MM/YYYY', true).isValid()
        ? undefined
        : 'Informe uma data válida no formato DD/MM/AAAA';
};

export const validateCreditCardDueDate = value => {
    const strippedValue = removeMask(value);

    if (!strippedValue) return 'Informe uma data de expiração';

    const valueDate = moment(strippedValue, 'MMYYYY', true);

    if (!valueDate.isValid()) {
        return 'Informe uma data de expiração válida (MM/AAAA)';
    }

    const data = valueDate.endOf('month').format();

    return moment().isAfter(data) ? 'Informe uma data de expiração válida (MM/AAAA)' : undefined;
};

export const validateCep = value => (
    REGEX_CEP.test(removeMask(value))
        ? undefined
        : 'Informe um CEP válido'
);

export const validatePhone = value => (
    REGEX_TELEFONE.test(removeMask(value))
        ? undefined
        : 'Informe um telefone válido'
);

const verifierDigitCNPJ = numbers => {
    const reverse = numbers.split('').reduce((buffer, number) => (
        [Number(number), ...buffer]
    ), []);

    let index = 2;
    const sum = reverse.reduce((buffer, number) => {
        const result = buffer + (number * index);
        index = (index === 9 ? 2 : index + 1);
        return result;
    }, 0);

    const mod = sum % 11;
    return (mod < 2 ? 0 : 11 - mod);
};

export const validateCNPJ = value => {
    const stripped = (value || '').replace(/[^\d]/g, '');

    if (stripped && stripped.length === 14 && CNPJ_BLACKLIST.indexOf(stripped) === -1) {
        let numbers = stripped.substr(0, 12);
        numbers += verifierDigitCNPJ(numbers);
        numbers += verifierDigitCNPJ(numbers);

        if (numbers.substr(-2) === stripped.substr(-2)) {
            return undefined;
        }
    }

    return 'Número de CNPJ inválido';
};

export const validateExternalProjectCode = value => (
    /^[A-Z]{2,5}$/.test(value) ? undefined : 'Informe um código externo de 2 a 5 letras maiúsculas'
);

export const validateColor = value => {
    return REGEX_COLOR.test(value)
        ? undefined
        : 'Informe a cor no formato #AABBCC.';
};

export const validateYear = value => (
    REGEX_YEAR.test(value)
        ? undefined
        : 'O ano deve estar no formato AAAA'
);

export const validateCNPJOrCPF = text => {

    if (removeMask(text).length <= 11) {
        return validateCPF(text);
    }

    return validateCNPJ(text);
};
