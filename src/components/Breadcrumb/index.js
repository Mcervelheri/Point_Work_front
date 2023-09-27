import React from 'react';

import { Breadcrumb as AntBreadcrumb } from 'antd';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const Breadcrumb = ({ routes }) => {

    const renderBreadcrumbItem = route => {
        const last = routes.indexOf(route) === routes.length - 1;
        let routeName;

        if (last) {
            routeName = route.name;
        } else {
            routeName = (
                <Link to={route.path}>{route.name}</Link>
            );
        }

        return (
            <AntBreadcrumb.Item key={route.name}>{routeName}</AntBreadcrumb.Item>
        );
    };

    return (
        <AntBreadcrumb className={styles.breadcrumbContainer}>
            {routes.map(renderBreadcrumbItem)}
        </AntBreadcrumb>
    );
};

export default Breadcrumb;
