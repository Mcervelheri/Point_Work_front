import React, { useCallback, useMemo, memo } from 'react';

import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';

import { isFileImage, resolvePreview, resolveStorageUrl } from '../helpers/file-helper';

import ImgLoading from '../../../ImgLoading';
import styles from './styles.module.scss';

const FileItem = memo(({
    file, onPreview,
    width, height,
}) => {

    const handlePreview = useCallback(() => {
        onPreview(file);
    }, [file, onPreview]);

    const sizeStyle = useMemo(() => ({ width, height }), [width, height]);
    const urlPreview = useMemo(
        () => resolvePreview(file.caminho, file.mimetype, width * 2),
        [file.caminho, file.mimetype, width],
    );
    const urlDownload = useMemo(
        () => resolveStorageUrl(file.caminho),
        [file.caminho],
    );

    const renderDonwloadPreviewButton = () => {
        if (!isFileImage(file.mimetype)) {
            return null;
        }
        return (
            <EyeOutlined
                onClick={handlePreview}
                className={styles.icon}
                title="Visualizar"
            />
        );
    };

    return (
        <Tooltip title={file.nome_original}>
            <li className={styles.container} style={sizeStyle}>
                <ImgLoading
                    src={urlPreview}
                    alt={file.nome_original}
                    className={styles.image}
                    style={sizeStyle}
                />

                <div className={styles.content} style={sizeStyle}>
                    <div className={styles.buttonsContainer}>
                        {renderDonwloadPreviewButton()}

                        <a
                            href={urlDownload}
                            target="__blank"
                            download={file.nome_original}
                        >
                            <DownloadOutlined
                                className={styles.icon}
                                title="Baixar"
                            />
                        </a>
                    </div>
                </div>
            </li>
        </Tooltip>
    );
});

FileItem.propTypes = {
    file: PropTypes.shape({
        caminho: PropTypes.string.isRequired,
        nome_original: PropTypes.string.isRequired,
        mimetype: PropTypes.string.isRequired,
    }).isRequired,
};

export default FileItem;
