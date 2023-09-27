import React, { memo } from 'react';

import { Layout } from 'antd';

import styles from './AppHeaderBar.module.scss';

const { Header } = Layout;

const AppHeaderBar = memo(() => {

    const renderContent = () => {
        return (
            <div className={styles.headerContainer}>
                <div>
                    <img
                        src={require('../../assets/Point work (2).png').default}
                        alt="Logotipo Point Work"
                        className={styles.logo}
                    />
                </div>
            </div>
        );
    };

    return (
        <Header className={styles.header}>
            {renderContent()}
        </Header>
    );

});

export default AppHeaderBar;
