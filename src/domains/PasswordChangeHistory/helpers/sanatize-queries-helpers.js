export const sanitizePasswordChangeHistoryQueries = queries => {

    const page = queries?.page;
    const totalItemsPerPage = queries?.totalItemsPerPage;
    const operation = queries?.operation;
    const clientIdentification = queries?.clientIdentification;
    const operationResult = queries?.operationResult;
    const endDate = queries?.endDate;
    const initialDate = queries?.initialDate;
    const order = queries?.order;
    const orderBy = queries?.orderBy;

    return {
        page: page || 1,
        totalItemsPerPage: totalItemsPerPage || 10,
        clientIdentification: clientIdentification || undefined,
        operation: operation || undefined,
        operationResult: operationResult || undefined,
        order: order || undefined,
        orderBy: orderBy || undefined,
        endDate: endDate || undefined,
        initialDate: initialDate || undefined,
    };
};
