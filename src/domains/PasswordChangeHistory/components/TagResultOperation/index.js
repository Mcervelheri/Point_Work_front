import React from 'react';

import { Tag } from 'antd';

const COMPLETED = 'COMPLETED';
const NOT_COMPLETED = 'NOT_COMPLETED';

const TAG_CONFIG = {
    COMPLETED: {
        text: 'Concluído',
        color: 'blue',
    },
    NOT_COMPLETED: {
        text: 'Não concluído',
        color: 'red',
    },
};

const getTextFromMapper = result => {
    return TAG_CONFIG[result].text;
};

const getColorFromMapper = result => {
    return TAG_CONFIG[result].color;
};

const TagResultOperation = ({ isSuccess }) => {

    const resultOperation = isSuccess ? COMPLETED : NOT_COMPLETED;

    return (
        <Tag color={getColorFromMapper(resultOperation)}>
            {getTextFromMapper(resultOperation)}
        </Tag>
    );
};

export default TagResultOperation;
