import React from 'react';

import { CloudDownloadOutlined } from '@ant-design/icons';

import ExportStatus from '../ExportStatus';
import styles from './styles.module.scss';

const DownloadExportFile = ({ status, link }) => {
    const renderButtonDownload = () => {
        if (link) {
            return (
                <a
                    className={styles.link}
                    href={link}
                    download
                    title="Clique para baixar o arquivo"
                >
                    <CloudDownloadOutlined className={styles.icon} />
                </a>
            );
        }

        return null;
    };

    return (
        <div className={styles.container}>
            <ExportStatus status={status} />
            {renderButtonDownload()}
        </div>
    );
};

export default DownloadExportFile;
