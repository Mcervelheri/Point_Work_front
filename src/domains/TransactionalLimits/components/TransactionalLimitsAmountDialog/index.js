import React, { useCallback } from 'react';

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import Form from '../components/Form';
import Input from '../components/Input';
import Modal from '../components/Modal';
import { wrapDialog } from '../helpers/dialog-helper';
import { wrapForm } from '../helpers/form-helper';
import { maskDecimal, maskMoney } from '../helpers/masks';
import { parseDecimal } from '../helpers/parser';
import useDidMount from '../hooks/use-did-mount';
import { TRANSACTIONAL_GROUP_LIMITS_CONFIG } from '../values/enums/transactional-limits';

import styles from './styles.module.scss';

const ColumnInput = ({
    accountLimit, defaultLimit, inputComponent, limitLabel,
}) => {
    return (
        <div className={styles.columnInputContainer}>
            <div className={styles.leftColumn}>
                <span className={styles.listText}>
                    {limitLabel || 'Limite atual total:'}
                </span>
                <span className={styles.listText}>
                    Máx. pré-aprovado:
                </span>
                <span className={styles.darkText}>
                    Novo limite:
                </span>
            </div>
            <div className={styles.rightColumn}>
                <span className={styles.listText}>
                    {maskMoney(accountLimit)}
                </span>
                <span className={styles.listText}>
                    {defaultLimit ? maskMoney(defaultLimit) : 'n/a'}
                </span>

                <Form>
                    {inputComponent}
                </Form>

            </div>
        </div>
    );
};

const TransactionalLimitsAmountDialog = ({
    form, onCancel, onContinue,
    limit, handleSubmit,
    ...others
}) => {

    const { hasValidationErrors, pristine, values: formValues } = form.getState();

    const {
        tab,
        defaultTotalMonthlyLimit,
        currentTotalMonthlyLimit,
        defaultTotalDaytimeLimit,
        currentTotalDaytimeLimit,
        defaultTotalNightTimeLimit,
        currentTotalNightTimeLimit,
        defaultDaytimeTransactionalLimit,
        currentDaytimeTransactionalLimit,
        defaulNightTimeTransactionalLimit,
        currentNightTimeTransactionalLimit,
    } = limit;

    const { tabTitle } = TRANSACTIONAL_GROUP_LIMITS_CONFIG[tab];

    useDidMount(() => {
        form.initialize({
            nightTimeTransactionalLimit: currentNightTimeTransactionalLimit,
            totalDaytimeLimit: currentTotalDaytimeLimit,
            totalMonthlyLimit: currentTotalMonthlyLimit,
            daytimeTransactionalLimit: currentDaytimeTransactionalLimit,
            totalNightTimeLimit: currentTotalDaytimeLimit,
        });
    });

    const validateDaytimeTotalLimits = useCallback(value => {

        if (!value) return 'Campo obrigatório';

        if (value > formValues.totalMonthlyLimit) {
            return 'O valor diário deve ser menor que o limite mensal.';
        }
        return undefined;
    }, [formValues]);

    const validateDaytimeTransactionLimits = useCallback(value => {
        if (!value) return 'Campo obrigatório';

        if (value > formValues.totalDaytimeLimit) {
            return 'O valor por transação deve ser menor que o limite diário.';
        }
        return undefined;
    }, [formValues]);

    const validateNightTimeTransactionalLimits = useCallback(value => {
        if (!value) return 'Campo obrigatório';

        if (value > formValues.totalNightTimeLimit) {
            return 'O valor selecionado excede o seu limite total noturno.';
        }
        return undefined;
    }, [formValues]);

    const validateNightTimeTotalLimits = useCallback(value => {
        if (!value) return 'Campo obrigatório';

        if (value > formValues.totalDaytimeLimit) {
            return 'O valor de transações noturnas deve ser menor que o limite diário.';
        }
        return undefined;
    }, [formValues]);

    const handleContinue = useCallback(values => {

        if (hasValidationErrors) return null;

        if (onContinue) {
            onContinue({
                ...limit,
                totalMonthlyLimit: values?.totalMonthlyLimit,
                totalDaytimeLimit: values?.totalDaytimeLimit,
                totalNightTimeLimit: values?.totalNightTimeLimit,
                daytimeTransactionalLimit: values?.daytimeTransactionalLimit,
                nightTimeTransactionalLimit: values?.nightTimeTransactionalLimit,
            });
        }
        return onCancel();
    }, [onContinue, onCancel, limit, hasValidationErrors]);

    const modalTitle = `Alterar limite: ${tabTitle}`;

    const renderModalTitle = () => {
        return (
            <span className={styles.modalTitle}>
                {modalTitle}
            </span>
        );
    };

    const renderMonthlyContent = () => {
        return (
            <>
                <span className={styles.sectionTitle}>
                    Limite Mensal
                </span>
                <div className={styles.columnContainer}>

                    <ColumnInput
                        limitLabel="Limite atual mensal:"
                        accountLimit={currentTotalMonthlyLimit}
                        defaultLimit={defaultTotalMonthlyLimit}
                        inputComponent={
                            (
                                <Input.Field
                                    alwaysShowErrorMessage
                                    required
                                    addonBefore="R$"
                                    parse={parseDecimal}
                                    format={maskDecimal}
                                    name="totalMonthlyLimit"
                                    placeholder="Digite o valor"
                                    data-testid="monthly-input"
                                    className={styles.inputNumber}
                                />
                            )
                        }
                    />
                </div>
            </>
        );
    };

    const renderDaytimeContent = () => {
        return (
            <>
                <span className={styles.sectionTitle}>
                    Limites Diurnos
                </span>
                <div className={styles.columnContainer}>

                    <ColumnInput
                        accountLimit={currentTotalDaytimeLimit}
                        defaultLimit={defaultTotalDaytimeLimit}
                        inputComponent={
                            (
                                <Input.Field
                                    alwaysShowErrorMessage
                                    required
                                    addonBefore="R$"
                                    parse={parseDecimal}
                                    format={maskDecimal}
                                    name="totalDaytimeLimit"
                                    placeholder="Digite o valor"
                                    className={styles.inputNumber}
                                    data-testid="totalDaytime-input"
                                    validate={validateDaytimeTotalLimits}
                                />
                            )
                        }
                    />
                    <ColumnInput
                        limitLabel="Limite atual por transação:"
                        accountLimit={currentDaytimeTransactionalLimit}
                        defaultLimit={defaultDaytimeTransactionalLimit}
                        inputComponent={
                            (
                                <Input.Field
                                    alwaysShowErrorMessage
                                    required
                                    addonBefore="R$"
                                    parse={parseDecimal}
                                    format={maskDecimal}
                                    placeholder="Digite o valor"
                                    className={styles.inputNumber}
                                    name="daytimeTransactionalLimit"
                                    data-testid="daytimeTransactional-input"
                                    validate={validateDaytimeTransactionLimits}
                                />
                            )
                        }
                    />
                </div>
            </>
        );
    };

    const renderNightTimeContent = () => {
        return (
            <>
                <span className={styles.sectionTitle}>
                    Limites Noturnos
                </span>
                <div className={styles.columnContainer}>

                    <ColumnInput
                        accountLimit={currentTotalNightTimeLimit}
                        defaultLimit={defaultTotalNightTimeLimit}
                        inputComponent={
                            (
                                <Input.Field
                                    alwaysShowErrorMessage
                                    required
                                    addonBefore="R$"
                                    parse={parseDecimal}
                                    format={maskDecimal}
                                    name="totalNightTimeLimit"
                                    placeholder="Digite o valor"
                                    className={styles.inputNumber}
                                    data-testid="totalNightTime-input"
                                    validate={validateNightTimeTotalLimits}
                                />
                            )
                        }
                    />
                    <ColumnInput
                        limitLabel="Limite atual por transação:"
                        accountLimit={currentNightTimeTransactionalLimit}
                        defaultLimit={defaulNightTimeTransactionalLimit}
                        inputComponent={
                            (
                                <Input.Field
                                    alwaysShowErrorMessage
                                    required
                                    addonBefore="R$"
                                    parse={parseDecimal}
                                    format={maskDecimal}
                                    placeholder="Digite o valor"
                                    className={styles.inputNumber}
                                    name="nightTimeTransactionalLimit"
                                    data-testid="nightTimeTransactional-input"
                                    validate={validateNightTimeTransactionalLimits}
                                />
                            )
                        }
                    />
                </div>
            </>
        );
    };

    const renderFooterButtons = () => {
        return (
            <>
                <Button
                    type="default"
                    htmlType="button"
                    onClick={onCancel}
                    icon={<CloseCircleOutlined />}
                >
                    Cancelar
                </Button>

                <Button
                    type="primary"
                    icon={<CheckCircleOutlined />}
                    disabled={pristine}
                    onClick={handleSubmit(handleContinue)}
                >
                    Ok! Alterar
                </Button>
            </>
        );
    };

    return (
        <Modal
            {...others}
            className={styles.modalSize}
            maskClosable
            onCancel={onCancel}
            title={renderModalTitle()}
            footer={renderFooterButtons()}
        >
            {renderMonthlyContent()}
            {renderDaytimeContent()}
            {renderNightTimeContent()}
        </Modal>
    );
};

export default wrapDialog(wrapForm(TransactionalLimitsAmountDialog, { validateOnBlur: true }));
