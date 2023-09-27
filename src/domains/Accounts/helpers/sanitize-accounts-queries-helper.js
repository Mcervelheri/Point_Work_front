import { isValidDate } from '../helpers/date-helper';

import { BLOCKED_TAB_TYPE } from '../pages/AccountsList/utils/constants';

export const sanitizeAccountsQueries = queries => {

    const spd = queries?.spd;
    const page = queries?.page;
    const limit = queries?.limit;
    const order = queries?.order;
    const status = queries?.status;
    const orderBy = queries?.orderBy;
    const account = queries?.account;
    const finalDate = queries?.finalDate;
    const initialDate = queries?.initialDate;
    const totalItemsPerPage = queries?.totalItemsPerPage;

    return {
        page: page || 1,
        limit: limit || 10,
        spd: spd || undefined,
        order: order || undefined,
        status: status || undefined,
        orderBy: orderBy || undefined,
        account: account || undefined,
        totalItemsPerPage: totalItemsPerPage || 10,
        finalDate: isValidDate(finalDate) ? finalDate : undefined,
        initialDate: isValidDate(initialDate) ? initialDate : undefined,
    };
};

export const sanitizeBlockedAccountsQueries = queries => {

    const tab = queries?.tab;
    const page = queries?.page;
    const sort = queries?.sort;
    const limit = queries?.limit;
    const orderBy = queries?.orderBy;
    const endDate = queries?.endDate;
    const account = queries?.account;
    const operator = queries?.operator;
    const startDate = queries?.startDate;
    const nationalRegistration = queries?.nationalRegistration;

    return {
        page: page || 1,
        limit: limit || 10,
        sort: sort || undefined,
        account: account || undefined,
        orderBy: orderBy || undefined,
        operator: operator || undefined,
        tab: tab || BLOCKED_TAB_TYPE.BLOCKED_ACCONTS,
        endDate: isValidDate(endDate) ? endDate : undefined,
        nationalRegistration: nationalRegistration || undefined,
        startDate: isValidDate(startDate) ? startDate : undefined,
    };
};
