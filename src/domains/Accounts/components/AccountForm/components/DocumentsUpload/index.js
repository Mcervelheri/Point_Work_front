import React, {
    useCallback, useMemo, useEffect,
} from 'react';

import { SaveOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';

import UploadFile from '../../../../../../components/UploadFile';
import { extractRequestError } from '../../../../../../helpers/error-helper';
import { wrapForm } from '../../../../../../helpers/form-helper';
import { messageError, messageSuccess } from '../../../../../../helpers/toast';
import useAsync from '../../../../../../hooks/use-async';
import useAxios from '../../../../../../hooks/use-axios';
import {
    UPLOAD_ACCEPT_FILES,
    UPLOAD_FILES_COMPANY,
    UPLOAD_FILES_PARTNER,
    UPLOAD_MAX_FILE_SIZE,
} from '../../../../../../values/enums/accounts';
import { urlIntegrateCustomer, urlUploadDocument } from '../../../../../../values/urls/accounts';

import styles from './styles.module.scss';

const DocumentsUpload = props => {

    const {
        company,
        createMode,
        handleSubmit,
        setLoading,
        idAccount,
        idClient,
        documents,
        form,
    } = props;

    const axios = useAxios();

    const uploadFiles = useMemo(() => (company ? UPLOAD_FILES_COMPANY : UPLOAD_FILES_PARTNER), [company]);

    useEffect(() => {
        if (!documents) return;

        const initialDataDocuments = {};

        documents.forEach(document => {
            const { type: formDataKey } = document;

            const inputName = uploadFiles.find(uFileComponent => uFileComponent.formDataKey === formDataKey)?.name;

            initialDataDocuments[inputName] = [document];
        });

        form.initialize(initialDataDocuments);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [documents]);

    const { loading, call: uploadImage } = useAsync(async formData => {

        try {
            const config = { headers: { 'content-type': 'multipart/form-data' } };
            const response = await axios.post(urlUploadDocument(idClient, idAccount), formData, config);
            return response;
        } catch (exception) {
            extractRequestError(exception, 'Não foi possível realizar a operação, tente novamente mais tarde.');
            return Promise.reject();
        }

    }, [axios, idClient, idAccount]);

    const { call: afterUpdateDocuments } = useAsync(async () => {
        await axios.post(urlIntegrateCustomer(idClient));
    }, [axios, idClient]);

    const handleSave = useCallback(values => {
        const promisses = [];

        for (let i = 0; i < uploadFiles.length; i += 1) {
            const item = uploadFiles[i];

            const { name, formDataKey } = item;
            const formData = new FormData();
            let hasNewFiles = false;

            if (values[name] && values[name]?.length > 0) {

                [...values[name]].forEach(file => {
                    if (file?.id === undefined) {
                        formData.append(formDataKey, file);
                        if (!hasNewFiles) hasNewFiles = true;
                    }
                });

                if (hasNewFiles) {
                    const uploadImagePromisse = uploadImage(formData);
                    promisses.push(uploadImagePromisse);
                }

            }
        }

        if (promisses.length > 0) {
            Promise.all(promisses).then(() => {
                messageSuccess('Imagens enviadas com sucesso!');
                afterUpdateDocuments();
                window.location.reload();
            }).catch(() => {
                messageError('Erro ao enviar as imagens');
            });
        }

    }, [uploadFiles, uploadImage, afterUpdateDocuments]);

    useEffect(() => {
        setLoading(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    return (
        <>
            <form onSubmit={handleSubmit(handleSave)}>
                <div className={styles.formLabel}>Envio de documentos</div>
                <>
                    {uploadFiles.map(uFileComponent => {
                        return (
                            <UploadFile.Field
                                key={uFileComponent.name}
                                name={uFileComponent.name}
                                maxSize={UPLOAD_MAX_FILE_SIZE}
                                maxFiles={1}
                                label={uFileComponent.label}
                                accept={UPLOAD_ACCEPT_FILES}
                                className={styles.uploadFile}
                            />
                        );
                    })}
                </>
                <div className={styles.buttonContainer}>

                    {createMode && (
                        <Tooltip
                            placement="bottom"
                            title="Preencha e salve os dados antes de enviar os documentos."
                        >
                            <Button
                                type="primary"
                                disabled={createMode}
                                htmlType="submit"
                                icon={<SaveOutlined />}
                            >
                                Salvar
                            </Button>
                        </Tooltip>
                    )}

                    {!createMode && (

                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined />}
                        >
                            Salvar
                        </Button>

                    )}

                </div>
            </form>
        </>
    );
};

export default wrapForm(DocumentsUpload);
