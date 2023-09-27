
import { createLimitsBody, validatePendingLimit } from '../helpers/limits-helper';
import { TRANSACTIONAL_LIMITS_TYPE } from '../values/enums/transactional-limits';

const limits = {
    daytimeTransactionalLimit: 10000,
    nightTimeTransactionalLimit: 1000,
    totalDaytimeLimit: 10000,
    totalMonthlyLimit: 60000,
    totalNightTimeLimit: 1000,
};

const MOCK_RESPONSE_POST_LIMIT_REQUEST = {
    message: 'There is a pending limit request',
};

const RANDOM_MESSAGE = 'Random message for test limit request';

const STATUS_OK = 200;
const STATUS_ERROR = 500;

test('Testa se a função createLimitsBody retorna os valores corretos data a lista de limites', () => {

    const limitArray = createLimitsBody(limits);

    expect(limitArray).toHaveLength(5);
    expect(limitArray[0].requestLimit).toBe(limits.daytimeTransactionalLimit);
    expect(limitArray[1].requestLimit).toBe(limits.totalDaytimeLimit);
    expect(limitArray[2].requestLimit).toBe(limits.totalMonthlyLimit);
    expect(limitArray[3].requestLimit).toBe(limits.totalNightTimeLimit);
    expect(limitArray[4].requestLimit).toBe(limits.nightTimeTransactionalLimit);

    expect(limitArray[0].limitType).toBe(TRANSACTIONAL_LIMITS_TYPE.DAYTIME_TRANSACTION);
    expect(limitArray[1].limitType).toBe(TRANSACTIONAL_LIMITS_TYPE.DAYTIME_TOTAL);
    expect(limitArray[2].limitType).toBe(TRANSACTIONAL_LIMITS_TYPE.MONTHLY);
    expect(limitArray[3].limitType).toBe(TRANSACTIONAL_LIMITS_TYPE.NIGHTTIME_TOTAL);
    expect(limitArray[4].limitType).toBe(TRANSACTIONAL_LIMITS_TYPE.NIGHTTIME_TRANSACTION);
});

test(`Valida se a função validatePendingLimit retorna true quando passado um status 200 e uma mensagem de limites
pendentes`, () => {
    const result = validatePendingLimit(MOCK_RESPONSE_POST_LIMIT_REQUEST.message, STATUS_OK);

    expect(result).toBe(true);
});

test(`Valida se a função validatePendingLimit retorna false quando passado um status 500 e uma mensagem de limites
pendentes`, () => {
    const result = validatePendingLimit(MOCK_RESPONSE_POST_LIMIT_REQUEST.message, STATUS_ERROR);

    expect(result).toBe(false);
});

test(`Valida se a função validatePendingLimit retorna false quando passado um status 200 e uma mensagem que não
 é a de limites pendentes`, () => {
    const result = validatePendingLimit(RANDOM_MESSAGE, STATUS_ERROR);

    expect(result).toBe(false);
});
