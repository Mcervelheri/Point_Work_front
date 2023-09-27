import React from 'react';

import { Tag } from 'antd';
import PropTypes from 'prop-types';

import { getColorFromMapperStatus, getTitleFromMapperStatus } from '../../helpers/export-status-mapper';

const ExportStatus = ({ status }) => {
    const title = getTitleFromMapperStatus(status);
    const color = getColorFromMapperStatus(status);

    return (
        <Tag color={color}>
            {title}
        </Tag>
    );
};

ExportStatus.propTypes = {
    status: PropTypes.string.isRequired,
};

export default ExportStatus;
