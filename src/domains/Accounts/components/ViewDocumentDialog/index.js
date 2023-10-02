/* eslint-disable no-await-in-loop */
/* eslint-disable consistent-return */
import React, { useMemo, useState } from 'react';

import {
    CloseSquareOutlined,
} from '@ant-design/icons';
import { Button, Collapse } from 'antd';

import ImgLoading from '../../../../components/ImgLoading';
import Modal from '../../../../components/Modal';
import { wrapDialog } from '../../../../helpers/dialog-helper';
import { extractRequestError } from '../../../../helpers/error-helper';
import {
    base64ToByteArr, fileUrl, isFileDocument, isFileImage,
} from '../../../../helpers/file-helper';
import { wrapForm } from '../../../../helpers/form-helper';
import useAsync from '../../../../hooks/use-async';
import useAxios from '../../../../hooks/use-axios';
import {
    UPLOAD_FILES_COMPANY,
    UPLOAD_FILES_PARTNER,
} from '../../../../values/enums/accounts';
import { urlDownloadDocument } from '../../../../values/urls/accounts';

import styles from './styles.module.scss';

const { Panel } = Collapse;

const ViewDocumentsDialog = props => {

    const {
        documents: initialDocuments,
        company,
        onCancel,
        ...others
    } = props;

    const [documents, setDocuments] = useState(initialDocuments);

    const axios = useAxios();

    const uploadFiles = useMemo(() => (company ? UPLOAD_FILES_COMPANY : UPLOAD_FILES_PARTNER), [company]);

    const { call: downloadImage } = useAsync(async file => {

        if (!file?.id) return null;
        if (file?.__file) return file?.__file;

        try {
            const documentResponse = await axios.post(urlDownloadDocument(file?.id));

            const base64 = documentResponse?.data?.document;
            const base64ByteArr = base64ToByteArr(base64);
            const downloadedFile = new File(base64ByteArr, file.originalName, { type: file.mimetype });
            return downloadedFile;

        } catch (exception) {
            extractRequestError(exception);
            return null;
        }

    }, [axios]);

    const { call: onChangeCollapse } = useAsync(async openedItemArr => {

        const __documents = [...documents];

        for (let i = 0; i < openedItemArr.length; i += 1) {
            const typeOpened = openedItemArr[i];
            const openedDoc = __documents.find(document => document.type === typeOpened);
            openedDoc.__file = await downloadImage(openedDoc);
        }

        setDocuments(__documents);

    }, [documents, downloadImage]);

    const contentElement = useMemo(() => {
        if (!documents || documents.length === 0) {
            return (
                <div className={styles.notFound}>
                    <CloseSquareOutlined style={{ fontSize: 16, color: 'rgb(148, 148, 148)', paddingBottom: 2 }} />
                    <strong>Não foi encontrado documentos associados a esta conta.</strong>
                </div>
            );
        }

        return (
            <Collapse onChange={onChangeCollapse}>
                {documents && documents.map(document => {

                    const {
                        type,
                        __file,
                    } = document;

                    const config = uploadFiles.find(__uFile => __uFile.formDataKey === type);

                    let content = null;
                    if (__file && isFileImage(__file?.type)) {
                        content = (
                            <ImgLoading
                                src={fileUrl(__file)}
                                alt={`Pré-visualização do arquivo ${__file?.name}`}
                                className={styles.imagePreview}
                            />
                        );
                    } else if (__file && isFileDocument(__file?.type)) {
                        content = (
                            <object data={fileUrl(__file)} type="application/pdf" className={styles.pdfPreview}>
                                <div>No online PDF viewer installed</div>
                            </object>
                        );
                    }

                    return (
                        <Panel header={config?.label} key={type}>
                            {content}
                        </Panel>
                    );
                })}

            </Collapse>
        );
    }, [documents, onChangeCollapse, uploadFiles]);

    return (
        <Modal
            {...others}
            title="Visualizar Documentos"
            maskClosable
            destroyOnClose
            onCancel={onCancel}
            footer={(
                <Button htmlType="button" type="primary" onClick={onCancel}>
                    Fechar
                </Button>
            )}
        >
            {contentElement}
        </Modal>
    );
};

export default wrapDialog(wrapForm(ViewDocumentsDialog));
