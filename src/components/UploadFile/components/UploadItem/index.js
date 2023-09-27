import React, {
    useCallback, useMemo, memo,
} from 'react';

import {
    DeleteOutlined, EyeOutlined, DownloadOutlined,
} from '@ant-design/icons';
import { Popconfirm } from 'antd';

import LoadingWrapper from '../components/LoadingWrapper';
import { extractRequestError } from '../helpers/error-helper';
import {
    base64ToByteArr, getPreviewByType, isFileImage,
} from '../helpers/file-helper';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';
import { urlDownloadDocument } from '../values/urls/accounts';

import ImgLoading from '../../../ImgLoading';
import styles from './styles.module.scss';

const UploadItem = memo(({
    onPreview, onRemove, onDownload,
    file, width, height,
}) => {

    const axios = useAxios();

    const handleRemove = useCallback(() => {
        onRemove(file);
    }, [file, onRemove]);

    const handlePreview = useCallback(() => {
        onPreview(file);
    }, [file, onPreview]);

    const { call: handleDownload, loading } = useAsync(async () => {

        if (file?.url) {
            // Quando o arquivo não foi salvo. (Comentário importante.)
            onDownload(file);
            return;
        }
        // Quando o arquivo está no servidor. (Comentário importante.)
        try {
            const documentResponse = await axios.post(urlDownloadDocument(file.id));

            const base64 = documentResponse?.data?.document;
            const base64ByteArr = base64ToByteArr(base64);
            const downloadedFile = new File(base64ByteArr, file.originalName, { type: file.mimetype });
            onDownload(downloadedFile);

        } catch (exception) {
            extractRequestError(exception);
        }

    }, [axios, onDownload, file]);

    const sizeStyle = useMemo(() => ({ width, height }), [width, height]);

    const renderDonwloadPreviewButton = () => {
        if (isFileImage(file?.type)) {
            return (
                <EyeOutlined
                    onClick={handlePreview}
                    className={styles.icon}
                    title="Visualizar"
                />
            );
        }
        return (
            <DownloadOutlined
                onClick={handleDownload}
                className={styles.icon}
                title="Baixar"
            />
        );
    };

    const renderImage = () => {
        const urlImage = getPreviewByType(file?.mimetype || file?.type);
        return (
            <ImgLoading
                src={urlImage}
                alt={file?.name}
                className={styles.image}
                style={sizeStyle}
            />
        );
    };

    const renderDeleteImage = () => {
        return (
            <Popconfirm
                title={(
                    <span>
                        Deseja excluir o arquivo
                        {' '}
                        <strong>
                            {file?.name}
                        </strong>
                        ?
                    </span>
                )}
                onConfirm={handleRemove}
                okText="Excluir"
                cancelText="Voltar"
                placement="topLeft"
            >
                <DeleteOutlined
                    className={styles.deleteIcon}
                    title="Excluir"
                />
            </Popconfirm>
        );
    };

    return (
        <LoadingWrapper
            loading={loading}
            spinnerClassName={styles.spinnerClassName}
        >
            <div className={styles.container}>
                <div className={styles.imageContainer} style={sizeStyle}>
                    {renderImage()}
                    <div className={styles.buttonsContainer} style={sizeStyle}>
                        {renderDonwloadPreviewButton()}
                    </div>
                </div>
                <div className={styles.infoContainer}>
                    <span className={styles.fileName}>
                        {file?.originalName || file?.name}
                    </span>
                    {renderDeleteImage()}
                </div>
            </div>
        </LoadingWrapper>
    );
});

export default UploadItem;
