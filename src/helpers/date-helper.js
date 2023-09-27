
import moment from 'moment-timezone';

export const disabledDate = (value, dates) => {
    const futureDate = value && value > moment().endOf('day');

    if (!dates || dates.length === 0) {
        return futureDate;
    }

    const tooLate = dates[0] && value.diff(dates[0], 'days') > 30;
    const tooEarly = dates[1] && dates[1].diff(value, 'days') > 30;

    return tooLate || futureDate || tooEarly;
};

/**
 * Faz a formatação da data fornecida e retorna no formato especificado
 * @param {string} date - Data que deverá ser formatada
 * @param {string} format - Padrão de data que será usado na formatação
 * @param {string} inputFormat - Padrão da data de entrada para datas diferentes do padrão ISO 8601
 * @returns {(string|null)} String da data formatada ou null caso não tenha sido informado uma data
 */
export const formatDate = (date, format, inputFormat) => {
    if (date) {
        return moment(date, inputFormat).format(format);
    }

    return null;
};

/**
 * Faz a formatação da data atual e retorna no formato especificado
 * @param {string} format - Padrão de data que será usado na formatação
 * @returns {string} String da data atual no formato especificado
 */
export const formatCurrentDate = format => {
    return moment().format(format);
};

/**
 * Faz a validação se a data informada é uma data válida
 * @param {string} date - Data de referência para validação
 * @param {string} datePattern - Padrão da data de referência
 * @returns {boolean} true caso a data seja considerada válida e false para o contrário
 * @see {@link https://momentjs.com/docs/#/parsing/is-valid/}
 */
export const isValidDate = (date, datePattern) => {
    return moment(date, datePattern).isValid();
};

/**
 * Faz a subtração de uma quantidade de dias a partir da data atual
 * @param {number} amount - Quantidade de dias para subtrair
 * @param {string} [format=YYYY-MM-DD] - Padrão de data que será usado na formatação
 * @returns {string} String da data resultante no formato YYYY-MM-DD (padrão)
 * @see {@link https://momentjs.com/docs/#/manipulating/subtract/}
 */
export const subtractDaysFromToday = (amount, format = 'YYYY-MM-DD') => {
    return moment().subtract(amount, 'days').format(format);
};
