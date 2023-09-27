import React, { useCallback } from 'react';

import { Button, Modal } from 'antd';

import { wrapDialog } from '../helpers/dialog-helper';

import styles from './styles.module.scss';

const Title = ({ title }) => {

    return (
        <span className={styles.title}>{title}</span>
    );
};

const Value = ({ value }) => {

    return (
        <span className={styles.values}>{value}</span>
    );
};

const RechargeInfoDialog = ({
    id, dataModal, onCancel, ...others
}) => {

    const renderModalTitle = () => {
        return (
            <span className={styles.modalTitle}>
                Dados Efetivada: ID {id}
            </span>
        );
    };

    const renderContent = () => {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <Title title="Operadora" />
                    <Title title="NSU" />
                    <Title title="NSU Operadora" />
                    <Title title="Tipo" />
                </div>
                <div className={styles.content}>
                    <Value value={dataModal?.Operadora} />
                    <Value value={dataModal?.NSU} />
                    <Value value={dataModal?.NSUOperadora} />
                    <Value value={dataModal?.Tipo} />
                </div>
            </div>
        );
    };

    const handleCloseDialog = useCallback(() => {
        onCancel();
    }, [onCancel]);

    return (

        <Modal
            {...others}
            title={renderModalTitle()}
            footer={(
                <Button htmlType="button" type="primary" onClick={handleCloseDialog}>
                    OK
                </Button>
            )}
            onCancel={onCancel}
        >
            {renderContent()}
        </Modal>
    );
};

export default wrapDialog(RechargeInfoDialog);
