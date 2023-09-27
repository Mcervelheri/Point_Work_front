import { messageWarn } from '../helpers/toast';
import { TRANSACTIONAL_LIMITS_TYPE } from '../values/enums/transactional-limits';

const PENDING_LIMIT_MESSAGE = 'pending limit request';

export const createLimitsBody = limitList => {
    return [
        {
            limitType: TRANSACTIONAL_LIMITS_TYPE.DAYTIME_TRANSACTION,
            requestLimit: limitList.daytimeTransactionalLimit,
        },
        {
            limitType: TRANSACTIONAL_LIMITS_TYPE.DAYTIME_TOTAL,
            requestLimit: limitList.totalDaytimeLimit,
        },
        {
            limitType: TRANSACTIONAL_LIMITS_TYPE.MONTHLY,
            requestLimit: limitList.totalMonthlyLimit,
        },
        {
            limitType: TRANSACTIONAL_LIMITS_TYPE.NIGHTTIME_TOTAL,
            requestLimit: limitList.totalNightTimeLimit,
        },
        {
            limitType: TRANSACTIONAL_LIMITS_TYPE.NIGHTTIME_TRANSACTION,
            requestLimit: limitList.nightTimeTransactionalLimit,
        },
    ];
};

export const validatePendingLimit = (message, status) => {

    if (status === 200 && message?.includes(PENDING_LIMIT_MESSAGE)) {
        messageWarn('Você tem uma solicitação de alteração de limite pendente neste grupo.'
            + ' Aguarde a resposta e tente novamente.');
        return true;
    }
    return false;
};
