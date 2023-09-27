import React from 'react';

import data from './data.json';
import styles from './styles.module.scss';

const renderChange = (change, index) => (
    <li key={index}>{change}</li>
);

const renderVersion = (version, index) => (
    <div key={index}>
        <h3>{version.title}</h3>
        <ul className={styles.infoText}>
            {version.changes.map(renderChange)}
        </ul>
    </div>
);

const ChangeLog = () => data.filter(version => __DEV__ || version.title !== 'dev').map(renderVersion);

export default ChangeLog;
