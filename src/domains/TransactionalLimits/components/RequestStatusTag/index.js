import React from 'react';

import { Tag } from 'antd';

import { TRANSACTIONAL_LIMITS_STATUS } from '../values/enums/transactional-limits';

const TAG_VARIANTS = {
    [TRANSACTIONAL_LIMITS_STATUS.PENDING]: {
        title: 'Pendente',
        tagPreset: 'purple',
    },
    [TRANSACTIONAL_LIMITS_STATUS.DENIED]: {
        title: 'Negado',
        tagPreset: 'red',
    },
    [TRANSACTIONAL_LIMITS_STATUS.APPROVED]: {
        title: 'Aprovado',
        tagPreset: 'green',
    },
};

const RequestStatusTag = ({ status }) => {
    const { title, tagPreset } = TAG_VARIANTS[status];

    return (
        <Tag color={tagPreset}>{title}</Tag>
    );
};

export default RequestStatusTag;
