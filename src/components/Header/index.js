import React from 'react';

import { Divider } from 'antd';

import BackButton from '../components/BackButton';

import Title from '../Title';
import styles from './styles.module.scss';

const Header = ({
    title, leftComponent, rightComponent, redirect,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.base}>
                <div className={styles.header}>
                    <BackButton redirect={redirect} />
                    <Title
                        level={4}
                        className={styles.title}
                    >
                        {title}
                    </Title>
                    {leftComponent}
                </div>
                {rightComponent}
            </div>
            <Divider className={styles.divider} />
        </div>
    );
};

export default Header;
