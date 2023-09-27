import React, { useCallback, useEffect } from 'react';

import { Empty, Spin } from 'antd';

import Breadcrumb from '../components/Breadcrumb';
import ContentPage from '../components/ContentPage';
import { formatDate, subtractDaysFromToday } from '../helpers/date-helper';
import useDidMount from '../hooks/use-did-mount';
import useUrlState from '../hooks/use-url-state';

import DownloadExportFile from '../../components/DownloadExportFile';
import ExportFilter from '../../components/ExportFilter';
import ExportStatusTable from '../../components/ExportStatusTable';
import FileExportSection from '../../components/FileExportSection';
import { getTitleFromExtractionType } from '../../helpers/extraction-type-mapper';
import { sanitizeExportDataQueries } from '../../helpers/sanitize-queries-helper';
import useDataFileExportStatus from '../../hooks/use-data-file-export-status';
import styles from './styles.module.scss';

const BREADCRUMB_PATHS = [
    {
        path: '/app',
        name: 'Início',
    },
    {
        name: 'Exportação de dados',
    },
];

const DataExportStatusPage = () => {
    const [urlState, setUrlState] = useUrlState({
        sanitize: sanitizeExportDataQueries,
    });

    const {
        loading,
        requestDataFileExportStatus,
        servicesExportStatusList,
    } = useDataFileExportStatus();

    const referenceDateQuery = urlState?.referenceDate;

    useDidMount(() => {
        setUrlState(
            state => ({
                referenceDate: state?.referenceDate ?? subtractDaysFromToday(1, 'YYYY-MM-DD'),
            }),
            'replace',
        );
    });

    useEffect(() => {
        if (referenceDateQuery) {
            requestDataFileExportStatus(referenceDateQuery);
        }
    }, [requestDataFileExportStatus, referenceDateQuery]);

    const handleSearch = useCallback(values => {
        const { referenceDate } = values;
        setUrlState({ referenceDate: referenceDate.format('YYYY-MM-DD') });
    }, [setUrlState]);

    const renderSection = item => {
        const {
            extractionType, status,
            link, services,
        } = item;

        return (
            <FileExportSection
                key={extractionType}
                title={getTitleFromExtractionType(extractionType)}
                extra={(
                    <DownloadExportFile
                        status={status}
                        link={link}
                    />
                )}
            >
                <ExportStatusTable dataSource={services} />
            </FileExportSection>
        );
    };

    const renderEmptyMessage = () => {
        const { referenceDate } = urlState;
        return `Não existem exportações para o dia ${formatDate(referenceDate, 'DD/MM/YYYY')}`;
    };

    const renderCenter = content => (
        <div className={styles.center}>
            {content}
        </div>
    );

    const renderLoadingFeedback = () => (
        renderCenter(<Spin data-testid="loading" />)
    );

    const renderData = () => servicesExportStatusList.map(renderSection);

    const renderEmptyFeedback = () => (
        renderCenter(<Empty description={renderEmptyMessage()} />)
    );

    const renderContent = () => {
        if (loading) return renderLoadingFeedback();

        if (servicesExportStatusList.length) return renderData();

        return renderEmptyFeedback();
    };

    return (
        <>
            <Breadcrumb routes={BREADCRUMB_PATHS} />
            <ContentPage headerTitle="Exportação de dados">
                <ExportFilter
                    onSearch={handleSearch}
                    initialFilters={urlState}
                />
                {renderContent()}
            </ContentPage>
        </>
    );
};

export default DataExportStatusPage;
