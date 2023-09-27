import { isValidDate } from '../helpers/date-helper';

export const sanitizeRechargesQueries = queries => {

    const page = queries?.page;
    const limit = queries?.limit;
    const status = queries?.status;
    const sort = queries?.sort;
    const phone = queries?.phone;
    const endDate = queries?.endDate;
    const startDate = queries?.startDate;

    return {
        page: page || 1,
        limit: limit || 10,
        status: status || undefined,
        sort: sort || 'ASC',
        phone: phone || undefined,
        endDate: endDate && isValidDate(endDate)
            ? endDate
            : undefined,
        startDate: startDate && isValidDate(startDate)
            ? startDate
            : undefined,
    };
};
