import React, { useCallback } from 'react';

import { UserDeleteOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

import { wrapDialog } from '../helpers/dialog-helper';

import useDeleteClientVip from '../../hooks/use-delete-client-vip';
import styles from './styles.module.scss';

const DeleteClientVipDialog = ({
    onCancel, ids, onRefresh, ...others
}) => {

    const handleSuccess = useCallback(() => {
        onCancel();

        onRefresh();
    }, [onCancel, onRefresh]);

    const { requestDeleteClientVip, loading } = useDeleteClientVip(handleSuccess);

    const handleConfirm = useCallback(() => {
        return requestDeleteClientVip(ids);
    }, [requestDeleteClientVip, ids]);

    const renderMessageConfirmation = () => {
        const MULTIPLES_CUSTOMERS = ids.length;

        if (MULTIPLES_CUSTOMERS > 1) {
            return (
                <span className={styles.text}>
                    Tem certeza que deseja excluir
                    <b> {MULTIPLES_CUSTOMERS}</b> clientes convidados?
                </span>
            );
        }

        return (
            <span className={styles.text}>
                Tem certeza que deseja excluir o cliente convidado?
            </span>
        );
    };

    const renderContent = () => {
        return (
            <div className={styles.content}>
                {renderMessageConfirmation()}
                <span className={styles.text}>Essa ação não poderá ser desfeita.</span>
            </div>
        );
    };

    const renderButtonFooter = () => {
        return (
            <div>
                <Button onClick={onCancel}>
                    Cancelar
                </Button>
                <Button
                    type="primary"
                    onClick={handleConfirm}
                    danger
                    icon={<UserDeleteOutlined />}
                    loading={loading}
                >
                    Sim, excluir
                </Button>
            </div>
        );
    };

    return (
        <Modal
            {...others}
            title="Excluir cliente convidado"
            footer={renderButtonFooter()}
            onCancel={onCancel}
        >
            {renderContent()}
        </Modal>
    );
};

export default wrapDialog(DeleteClientVipDialog);
