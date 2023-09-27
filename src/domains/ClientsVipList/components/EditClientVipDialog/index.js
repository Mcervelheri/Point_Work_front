import React, { useCallback } from 'react';

import { Button, Modal } from 'antd';

import Form from '../components/Form';
import Input from '../components/Input';
import { wrapDialog } from '../helpers/dialog-helper';
import { wrapForm } from '../helpers/form-helper';
import { maskCPF, removeMask } from '../helpers/masks';
import { validateCPF } from '../helpers/validations';
import useDidMount from '../hooks/use-did-mount';

import useEditClientVip from '../../hooks/use-edit-client-vip';

const EditClientVipDialog = ({
    onCancel, form, currentName, onRefresh,
    currentNationalRegistration, id, handleSubmit,
    ...others
}) => {

    const { hasValidationErrors, pristine } = form.getState();

    const handleSuccess = useCallback(() => {
        onCancel();

        onRefresh();
    }, [onRefresh, onCancel]);

    const { requestEditClientVip, loading } = useEditClientVip(handleSuccess);

    const handleEdit = useCallback(values => {
        const { name, nationalRegistration } = values;

        return requestEditClientVip(nationalRegistration, name, id);
    }, [requestEditClientVip, id]);

    useDidMount(() => {
        form.initialize({
            nationalRegistration: currentNationalRegistration,
            name: currentName,
        });
    });

    const renderContent = () => {
        return (
            <Form id="edit-client" onSubmit={handleSubmit(handleEdit)}>
                <Input.Field
                    label="CPF"
                    name="nationalRegistration"
                    placeholder="CPF do cliente"
                    format={maskCPF}
                    parse={removeMask}
                    validate={validateCPF}
                    required
                />

                <Input.Field
                    label="Nome"
                    name="name"
                    placeholder="Nome do cliente"
                    maxLength={80}
                />
            </Form>
        );
    };

    const renderButtonFooter = () => {
        return (
            <div>
                <Button onClick={onCancel}>
                    Cancelar
                </Button>
                <Button
                    htmlType="submit"
                    type="primary"
                    disabled={pristine || hasValidationErrors}
                    form="edit-client"
                    loading={loading}
                >
                    Salvar
                </Button>
            </div>
        );
    };

    return (
        <Modal
            {...others}
            title="Editar cliente convidado"
            footer={renderButtonFooter()}
            onCancel={onCancel}
        >
            {renderContent()}
        </Modal>
    );
};

export default wrapDialog(wrapForm(EditClientVipDialog));
