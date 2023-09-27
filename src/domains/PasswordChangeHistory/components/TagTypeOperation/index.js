import React from 'react';

import { Tag } from 'antd';

const TAG_CONFIG = {
    UPDATE_PASSWORD: {
        text: 'Alteração',
        color: 'green',
    },
    RESET_PASSWORD: {
        text: 'Reset',
        color: 'purple',
    },
};

const getTextFromMapper = type => {
    return TAG_CONFIG[type].text;
};

const getColorFromMapper = type => {
    return TAG_CONFIG[type].color;
};

const TagTypeOperation = ({ type }) => {
    return (
        <Tag color={getColorFromMapper(type)}>
            {getTextFromMapper(type)}
        </Tag>
    );
};

export default TagTypeOperation;
