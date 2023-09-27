import colors from '../colors';

export const TRANSACTIONAL_LIMITS_TYPE = {
    MONTHLY: 'MONTHLY',
    TRANSACTION: 'TRANSACTION',
    DAYTIME_TOTAL: 'DAYTIME_TOTAL',
    NIGHTTIME_TOTAL: 'NIGHTTIME_TOTAL',
    DAYTIME_TRANSACTION: 'DAYTIME_TRANSACTION',
    NIGHTTIME_TRANSACTION: 'NIGHTTIME_TRANSACTION',
};

export const TRANSACTIONAL_LIMITS_STATUS = {
    PENDING: 'PENDING',
    DENIED: 'DENIED',
    APPROVED: 'APPROVED',
};

export const TRANSACTIONAL_GROUP_TYPE = {
    P2P: 'P2P',
    TED: 'TED',
    PIX: 'PIX',
    BILL_PAYMENTS: 'BILL_PAYMENTS',
    PIX_WITHDRAW_AND_CHANGE: 'PIX_WITHDRAW_AND_CHANGE',
};

export const TRANSACTIONAL_LIMITS_CONFIG = {
    [TRANSACTIONAL_LIMITS_TYPE.MONTHLY]: {
        title: 'Total mensal',
    },
    [TRANSACTIONAL_LIMITS_TYPE.DAYTIME_TOTAL]: {
        title: 'Total Diurno',
    },
    [TRANSACTIONAL_LIMITS_TYPE.NIGHTTIME_TOTAL]: {
        title: 'Total Noturno',
    },
    [TRANSACTIONAL_LIMITS_TYPE.DAYTIME_TRANSACTION]: {
        title: 'Transação Diurno',
    },
    [TRANSACTIONAL_LIMITS_TYPE.NIGHTTIME_TRANSACTION]: {
        title: 'Transação Noturno',
    },

};

export const TRANSACTIONAL_GROUP_LIMITS_CONFIG = {
    [TRANSACTIONAL_GROUP_TYPE.PIX]: {
        tabTitle: 'Pix',
        color: colors.primaryCyan400,
    },
    [TRANSACTIONAL_GROUP_TYPE.TED]: {
        tabTitle: 'Transferência',
        color: colors.primaryCyan400,
    },

};

export const TRANSACTIONAL_STATUS_OPTIONS = [
    {
        label: 'Aprovado',
        key: TRANSACTIONAL_LIMITS_STATUS.APPROVED,
    },
    {
        label: 'Negado',
        key: TRANSACTIONAL_LIMITS_STATUS.DENIED,
    },
    {
        label: 'Pendente',
        key: TRANSACTIONAL_LIMITS_STATUS.PENDING,
    },
];
