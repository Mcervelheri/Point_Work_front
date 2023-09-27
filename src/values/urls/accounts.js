
/**
 * COMPANY
*/

export const urlUpdateCompany = idClient => {
    return `/bff/private/v1/back-office/company/${idClient}`;
};

/**
 * DOCUMENT
*/

export const urlUploadDocument = (idClient, idAccount) => {
    return `/bff/private/v1/back-office/documents/${idClient}/account/${idAccount}`;
};

export const urlDownloadDocument = documentId => {
    return `/bff/private/v1/back-office/documents/${documentId}/base64`;
};

export const urlIntegrateCustomer = idClient => {
    return `/bff/private/v1/back-office/${idClient}/integrate-customer`;
};

/**
 * ACCOUNT
*/

export const urlGetAccountList = () => {
    return '/bff/private/v1/back-office/accounts?onlyMain=false';
};

export const urlGetBlockedAccountList = () => {
    return '/bff/private/v1/back-office/users/blocks';
};

export const urlGetHistoryUnlockAccountList = () => {
    return '/bff/private/v1/back-office/users/unblock/report';
};

export const urlGetAccountListOnlyCompany = accountDataSearch => {
    return `/bff/private/v1/back-office/accounts?accountData=${accountDataSearch}&totalItemsPerPage=1&page=1`;
};

export const urlGetOnboarding = idClientCompany => {
    return `/bff/private/v1/back-office/onboardings/${idClientCompany}`;
};

/**
 * PARTNER
*/

export const urlCreatePartner = () => {
    return '/bff/private/v1/back-office/partners';
};

export const urlCreatePartnerCompany = () => {
    return '/bff/private/v1/back-office/company/partners';
};

export const urlUpdatePartner = idClient => {
    return `/bff/private/v1/back-office/partners/${idClient}`;
};

export const urlUpdatePartnerCompany = idClient => {
    return `/bff/private/v1/back-office/company/${idClient}`;
};

export const urlGetTransactions = () => {
    return '/bff/private/v1/back-office/transactions';
};

export const urlGetRemittanceTransactions = () => {
    return '/bff/private/v1/back-office/bank-remittance';
};

export const urlGetTransactionsDetails = transactionId => {
    return `/bff/private/v1/back-office/transactions/${transactionId}`;
};

export const urlGetTransactionsDetailsRemittance = transactionId => {
    return `/bff/private/v1/back-office/bank-remittance/${transactionId}`;
};

/**
 * PASSWORD CHANGE HISTORY
*/

export const urlPasswordChangeHistory = () => {
    return '/bff/private/v1/back-office/users/password-update-history';
};

/**
 * CLIENTS VIP
*/

export const urlClientsVip = () => {
    return '/bff/private/back-office/onboarding-allowlist';
};

export const urlDeleteClientsVip = () => {
    return '/bff/private/back-office/onboarding-allowlist/delete';
};

export const urlEditClientsVip = id => {
    return `/bff/private/back-office/onboarding-allowlist/${id}`;
};

/**
 * ACCOUNT PHYSICAL PERSON
*/

export const urlGetPhysicalPersonAccountById = accountId => {
    return `/bff/private/v1/back-office/account/${accountId}`;
};

export const urlGetClientById = clientId => {
    return `/bff/private/v1/back-office/client/${clientId}`;
};

export const urlGetDocumentById = accountID => {
    return `/bff/private/v1/back-office/document/${accountID}`;
};

export const urlGetDocumentData = documentID => {
    return `/bff/private/v1/back-office/document/${documentID}/data`;
};

export const urlEditPhysicalPerson = clientId => {
    return `/bff/private/v1/back-office/client/${clientId}`;
};

export const urlGetStatusEdit = clientId => {
    return `/bff/private/v1/back-office/client/update-status/${clientId}`;
};
