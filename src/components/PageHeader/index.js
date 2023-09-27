import React, { memo } from 'react';

import { PageHeader as AntdPageHeader } from 'antd';
import { useHistory } from 'react-router-dom';

import useClassNames from '../hooks/use-classnames';

import styles from './styles.module.scss';

const PageHeader = memo(({
    title, buttons, hasBackButton, ...others
}) => {
    const history = useHistory();

    const dividerClassNames = useClassNames([
        title ? styles.dividerColor : styles.dividerNoColor,
    ]);

    return (
        <AntdPageHeader
            {...others}
            title={title}
            extra={buttons}
            className={dividerClassNames}
            onBack={hasBackButton ? history.goBack : null}
        />
    );
});

PageHeader.defaultProps = {
    hasBackButton: false,
};

export default PageHeader;
