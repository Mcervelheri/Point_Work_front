import { isValidDate } from '../helpers/date-helper';

export const sanitizeExportDataQueries = queries => {
    const referenceDate = queries?.referenceDate;
    return {
        referenceDate: referenceDate && isValidDate(referenceDate)
            ? referenceDate
            : undefined,
    };
};
