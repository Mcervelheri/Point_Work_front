import React, {
    useCallback, useState, useMemo, useEffect,
} from 'react';

import {
    SaveOutlined, EditOutlined,
} from '@ant-design/icons';
import {
    Button, Row, Col,
} from 'antd';

import Form from '../../../../components/Form';
import LoadingSpin from '../../../../components/LoadingSpin';
import { extractRequestError } from '../../../../helpers/error-helper';
import { wrapForm } from '../../../../helpers/form-helper';
import useAsync from '../../../../hooks/use-async';
import useZipCode from '../../../../hooks/use-zip-code';

import DocumentsUpload from './components/DocumentsUpload';
import styles from './styles.module.scss';

const formAddressPhysical = {
    bairro: 'mainAddressNeighborhood',
    cidade: 'mainAddressCity',
    endereco: 'mainAddressStreet',
    uf: 'mainAddressState',
    country: 'mainAddressCountry',
};

const formAddressLegal = {
    bairro: 'pj__mainAddressNeighborhood',
    cidade: 'pj__mainAddressCity',
    endereco: 'pj__mainAddressStreet',
    uf: 'pj__mainAddressState',
    country: 'pj__mainAddressCountry',
};

const FormComp = wrapForm(props => {

    const {
        handleSubmit, onSave, onEdit,
        isInsertionMode, children,
        data, form, company, hasValidationErrors,
    } = props;

    const [initialized, setInitialized] = useState(false);

    const { loading: loadingZipCode } = useZipCode(
        form,
        company ? 'pj__mainAddressZipCode' : 'mainAddressZipCode',
        company ? formAddressLegal : formAddressPhysical,
    );

    const renderChildren = () => {
        if (typeof children === 'function') {
            return children(isInsertionMode, loadingZipCode);
        }
        return children;
    };

    useEffect(() => {
        if (data && !initialized) {
            setInitialized(true);
            form.initialize(data);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const { call: onSubmit, loading } = useAsync(async values => {

        try {
            await onSave(values);
        } catch (exception) {
            extractRequestError(exception);
        }
    }, [onSave]);

    const renderButtonSubmit = () => {
        if (!isInsertionMode) return null;

        return (
            <div className={styles.buttonSubmit}>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={hasValidationErrors}
                    icon={<SaveOutlined />}
                    loading={loading}
                >
                    Salvar
                </Button>
            </div>
        );
    };

    return (
        <>
            <Form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}
                key={isInsertionMode}
            >
                {renderChildren()}

                {renderButtonSubmit()}
            </Form>

            {!isInsertionMode && (
                <div className={styles.buttonEdit}>
                    <Button
                        type="primary"
                        onClick={onEdit}
                        icon={<EditOutlined />}
                    >
                        Editar
                    </Button>
                </div>
            )}
        </>
    );
});

const AccountForm = props => {

    const {
        onSave, onDelete,
        children, data, hasLog, company, idAccount, parentLoadingArr = [], createMode,
        idClient, documents,
    } = props;

    const [isInsertionMode, setIsInsertionMode] = useState(createMode);
    const [loadingDocumentsUpload, setLoadingDocumentsUpload] = useState(false);

    const handleEdit = useCallback(() => {
        setIsInsertionMode(true);
    }, []);

    const loadingArr = useMemo(() => {
        return [...parentLoadingArr, loadingDocumentsUpload];
    }, [parentLoadingArr, loadingDocumentsUpload]);

    return (
        <>
            <LoadingSpin loadingArr={loadingArr} />
            <div className={styles.container}>
                <Row gutter={12}>
                    <Col
                        sm={24}
                        lg={isInsertionMode ? 12 : 24}
                        className={styles.formCol}
                    >
                        <FormComp
                            hasLog={hasLog}
                            onSave={onSave}
                            onDelete={onDelete}
                            company={company}
                            onEdit={handleEdit}
                            isInsertionMode={isInsertionMode}
                            data={data}
                        >
                            {children}
                        </FormComp>
                    </Col>
                    {isInsertionMode && (
                        <Col sm={24} lg={12}>
                            <DocumentsUpload
                                idAccount={idAccount}
                                idClient={idClient}
                                company={company}
                                setLoading={setLoadingDocumentsUpload}
                                documents={documents}
                                createMode={createMode}
                            />
                        </Col>
                    )}
                </Row>
            </div>
        </>
    );
};

export default AccountForm;
