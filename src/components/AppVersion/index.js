import React from 'react';

import useClassNames from '../../hooks/use-classnames';
import { appVersion } from '../../values/strings';

import styles from './styles.module.scss';

const AppVersion = ({ className }) => {
    const versionClassNames = useClassNames([
        styles.version,
        className,
    ]);

    return (
        <p className={versionClassNames}>
            v{appVersion}
        </p>
    );
};

export default AppVersion;
