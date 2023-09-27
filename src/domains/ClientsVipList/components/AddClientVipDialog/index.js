import React, { useCallback } from 'react';

import { Button, Modal } from 'antd';

import Form from '../components/Form';
import Input from '../components/Input';
import { wrapDialog } from '../helpers/dialog-helper';
import { wrapForm } from '../helpers/form-helper';
import { maskCPF, removeMask } from '../helpers/masks';
import { validateCPF } from '../helpers/validations';

import useAddClientVip from '../../hooks/use-add-client-vip';

const AddClientVipDialog = ({
    onCancel, form, handleSubmit,
    onRefresh, ...others
}) => {

    const { hasValidationErrors } = form.getState();

    const handleSuccess = useCallback(() => {
        onCancel();

        onRefresh();
    }, [onCancel, onRefresh]);

    const { requestAddClientVip, loading } = useAddClientVip(handleSuccess);

    const handleAdd = useCallback(values => {
        const { name, nationalRegistration } = values;

        return requestAddClientVip(name, nationalRegistration);
    }, [requestAddClientVip]);

    const renderContent = () => {
        return (
            <Form id="add-client" onSubmit={handleSubmit(handleAdd)}>
                <Input.Field
                    label="CPF"
                    name="nationalRegistration"
                    placeholder="CPF do cliente"
                    parse={removeMask}
                    format={maskCPF}
                    validate={validateCPF}
                    required
                />

                <Input.Field
                    label="Nome"
                    name="name"
                    placeholder="Nome do cliente"
                />
            </Form>
        );
    };

    const renderButtonFooter = () => {
        return (
            <div>
                <Button htmlType="button" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button
                    htmlType="submit"
                    type="primary"
                    disabled={hasValidationErrors}
                    form="add-client"
                    loading={loading}
                >
                    Adicionar
                </Button>
            </div>
        );
    };

    return (
        <Modal
            {...others}
            title="Adicionar novo cliente convidado"
            footer={renderButtonFooter()}
            onCancel={onCancel}
        >
            {renderContent()}
        </Modal>
    );
};

export default wrapDialog(wrapForm(AddClientVipDialog));
