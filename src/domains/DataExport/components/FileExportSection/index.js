import React from 'react';

import { Card } from 'antd';

const FileExportSection = ({ title, extra, children }) => {
    return (
        <Card
            title={title}
            extra={extra}
            bordered={false}
        >
            {children}
        </Card>
    );
};

export default FileExportSection;
