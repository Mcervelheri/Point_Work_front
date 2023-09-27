import pipe from 'lodash/fp/pipe';
import VMasker from 'vanilla-masker';

export const removeMask = text => {
    if (typeof text === 'string') {
        return text.replace(/[^\da-z]/gi, '');
    }
    return text;
};

export const maskCep = text => (
    typeof text === 'string' ? VMasker.toPattern(text, '99999-999') : text
);

export const maskCPF = text => (
    typeof text === 'string' ? VMasker.toPattern(text, '999.999.999-99') : ''
);

export const maskDate = text => (
    typeof text === 'string' ? VMasker.toPattern(text, '99/99/9999') : ''
);

export const maskCreditCardDueDate = text => {
    return (
        typeof text === 'string' ? VMasker.toPattern(text, '99/9999') : ''
    );
};

export const maskCNPJ = text => (
    typeof text === 'string' ? VMasker.toPattern(text, '99.999.999/9999-99') : ''
);

export const maskTime = text => (
    typeof text === 'string' ? VMasker.toPattern(text, '99:99') : ''
);

export const maskTelefone = text => (
    typeof text === 'string'
        ? text.replace(/[^\d]/g, '').length > 10
            ? VMasker.toPattern(text, '(99) 9 9999-9999')
            : VMasker.toPattern(text, '(99) 9999-9999')
        : ''
);

export const maskInteger = text => {
    if (typeof text === 'string') {
        return text.replace(/[^\d]/gim, '');
    }
    return text;
};

export const maskCreditCardNumber = text => (
    typeof text === 'string' ? (text.length < 18
        ? VMasker.toPattern(text, '9999 999999 99999')
        : VMasker.toPattern(text, '9999 9999 9999 9999')) : ''
);

export const createDecimalFormatter = ({
    precision = 2,
    separator = ',',
    delimiter = '.',
    delimiterCase = 3,
    suffix = '',
    prefix = '',
    keepLeadingZeros = false,
}) => {
    const removeLeadingZeros = value => (keepLeadingZeros ? value : (value || '').replace(/^0+/, ''));

    const addLeadingZeros = value => (value || '').padStart(precision + 1, '0');

    const precisionRegex = new RegExp(`(\\d*?)(\\d{${precision}})$`);
    const separatorPattern = `$1${separator}$2`;
    const delimiterRegex = new RegExp(
        `(\\d+)(\\d{3}[${delimiter}${separator}\\d]*)$`,
    );
    const delimiterPattern = `$1${delimiter}$2`;

    const applyMask = (value = '') => {
        const counter = (value.length - (precision + delimiterCase)) / delimiterCase;
        let masked = precision
            ? value.replace(precisionRegex, separatorPattern)
            : value;

        for (let i = 0; i < counter; i += 1) {
            masked = masked.replace(delimiterRegex, delimiterPattern);
        }

        return masked;
    };

    const sanitizeValue = value => {
        switch (typeof value) {
            case 'string':
                return value;
            case 'number':
                return (value || 0).toFixed(precision);
            default:
                return '';
        }
    };

    const addPrefixSuffix = value => `${prefix}${value}${suffix}`;

    return pipe(
        sanitizeValue,
        removeMask,
        removeLeadingZeros,
        addLeadingZeros,
        applyMask,
        addPrefixSuffix,
    );
};

export const maskDecimal = createDecimalFormatter({
    precision: 2,
    separator: ',',
});

export const maskMoney = createDecimalFormatter({
    precision: 2,
    separator: ',',
    delimiter: '.',
    prefix: 'R$ ',
});

export const maskProjectExternalCode = text => (
    typeof text === 'string'
        ? text.replace(/[^A-Za-z]/g, '').toUpperCase()
        : ''
);

const maskNumberWithDigit = createDecimalFormatter({
    precision: 1,
    separator: '-',
    delimiter: '',
    keepLeadingZeros: true,
});

export const maskWithVerificationDigit = value => {
    const stripped = removeMask(value);
    return stripped && stripped.length >= 2
        ? maskNumberWithDigit(stripped)
        : stripped;
};

export const maskCNPJOrCPF = text => {
    if (typeof text !== 'string') return '';

    if (removeMask(text).length <= 11) {
        return maskCPF(text);
    }

    return maskCNPJ(text);
};

export const maskAccountDigit = text => (
    typeof text === 'string' ? VMasker.toPattern(text, '9999999-9') : ''
);
