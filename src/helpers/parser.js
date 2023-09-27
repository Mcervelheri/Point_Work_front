import { createDecimalFormatter, maskInteger } from './masks';

export const createDecimalParser = options => {
    const customMaskDecimal = createDecimalFormatter(options);
    return (text = '') => {
        const masked = customMaskDecimal(text.replace(/[^0-9,]+/g, ''));
        const parsed = masked.replace(/[.]/g, '').replace(',', '.');
        return Number(parsed);
    };
};

export const parseDecimal = createDecimalParser({
    precision: 2,
    separator: ',',
});

export const parseInteger = value => {
    return Number(maskInteger(value));
};

export const parseYear = momentDate => {
    return momentDate.format('YYYY');
};

export const parseDate = momentDate => {
    return momentDate.toISOString();
};
