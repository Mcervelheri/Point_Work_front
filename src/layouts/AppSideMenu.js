import React, { useCallback, useMemo, useState } from 'react';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {
    Layout, Menu, Drawer,
    Button, Divider,
} from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter, matchPath } from 'react-router-dom';
import urlJoin from 'url-join';

import AppVersion from '../components/AppVersion';
import Icon, { AntDesign } from '../components/Icon';
import { connectScreenSize } from '../helpers/screen-size-helper';
import useDidMount from '../hooks/use-did-mount';
import useDidMountAndUpdate from '../hooks/use-did-mount-and-update';
import { actions } from '../redux/ducks';
import { findParentGroups, hasRoutePermission } from '../routes/manager';
import routes, { allRoutes } from '../routes/private';
import colors from '../values/colors';

import styles from './AppSideMenu.module.scss';

const { Sider } = Layout;
const { Item: MenuItem, SubMenu } = Menu;

const getItemIcon = icon => {
    if (!icon) return null;
    return (
        <i className={classNames(['anticon', styles.menuItemIcon])}>
            <Icon family={icon.family} name={icon.name} size={20} />
        </i>
    );
};

const SIDEBAR_WIDTH = 230;
const DRAWER_BODY_STYLE = { padding: 0, heigth: '100%' };

const AppSideMenu = ({
    toggleSidebar, isDesktop, sidebarCollapsed,
    theme, location, history,
}) => {

    const [openedKeys, setOpenedKeys] = useState([]);

    useDidMount(() => {
        toggleSidebar(!isDesktop);
    });

    useDidMountAndUpdate(() => {
        if (sidebarCollapsed) {
            setOpenedKeys([]);
        }
    }, [sidebarCollapsed]);

    const handleCollapse = useCallback((collapsed, type) => {
        toggleSidebar(collapsed);
    }, [toggleSidebar]);

    const handleCloseDrawer = useCallback(() => {
        handleCollapse(true);
    }, [handleCollapse]);

    const handleLinkClick = useCallback(() => {
        if (!isDesktop) {
            toggleSidebar(true);
        }
    }, [isDesktop, toggleSidebar]);

    const handleLogout = useCallback(() => {
        history.push('/login');
    }, [history]);

    const menuState = useMemo(() => {
        const { pathname } = location;

        const selectedRoute = allRoutes
            .find(route => {
                return matchPath(pathname, {
                    path: urlJoin('/app', route.path),
                    exact: route.exact,
                });
            });

        if (!selectedRoute) {
            return { selectedRoute: {}, openedGroups: [] };
        }

        const openedGroups = sidebarCollapsed
            ? []
            : findParentGroups(routes, selectedRoute).map(r => r.group);

        return {
            selectedRoute,
            openedGroups: [
                ...openedKeys,
                ...openedGroups.filter(item => (
                    openedKeys.indexOf(item) === -1
                )),
            ],
        };
    }, [location, openedKeys, sidebarCollapsed]);

    const drawerBodyStyle = useMemo(() => ({
        ...DRAWER_BODY_STYLE,
        backgroundColor: theme === 'dark' ? colors.primaryDark : colors.white,
    }), [theme]);

    const renderMenuGroup = route => {
        if (!hasRoutePermission(route)) return null;

        return (
            <SubMenu
                key={route.group}
                title={(
                    <span>
                        {getItemIcon(route.icon)}
                        <span className="nav-text">
                            {route.group}
                        </span>
                    </span>
                )}
                className={styles.subMenu}
            >
                {/* eslint-disable-next-line no-use-before-define */}
                {route.routes.map(renderMenuItem)}
            </SubMenu>
        );
    };

    const renderMenuItem = route => {
        if (route.group) return renderMenuGroup(route);

        if (!route.text) return null;

        if (!hasRoutePermission(route)) return null;

        return (
            <MenuItem className={styles.menuItem} key={route.menuKey} title={route.longText}>
                <Link
                    to={{
                        pathname: urlJoin('/app', route.path),
                        search: route.query,
                    }}
                    onClick={handleLinkClick}
                >
                    {getItemIcon(route.icon)}
                    <span>
                        {route.text}
                    </span>
                </Link>
            </MenuItem>
        );
    };

    const renderContent = () => {
        const { selectedRoute, openedGroups } = menuState;
        return (
            <div className={styles.scrollContainer}>

                <Menu
                    theme={theme}
                    mode="inline"
                    selectedKeys={[selectedRoute.menuKey]}
                    openKeys={openedGroups}
                    onOpenChange={setOpenedKeys}
                    className={styles.menu}
                >
                    {routes.map(renderMenuItem)}
                </Menu>
                <div>
                    <button
                        type="button"
                        className={styles.buttonExit}
                        onClick={handleLogout}
                    >
                        <Icon
                            family={AntDesign}
                            name="OutlineLogout"
                            size={13}
                            className={styles.icon}
                        />
                        Sair
                    </button>
                    <Divider className={styles.divider} />
                    <div className={styles.containerButtonCollapse}>
                        <Button onClick={toggleSidebar}>
                            {sidebarCollapsed
                                ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )}
                        </Button>
                        <AppVersion />
                    </div>
                </div>
            </div>
        );
    };

    if (!isDesktop) {
        return (
            <Drawer
                placement="left"
                onClose={handleCloseDrawer}
                open={!sidebarCollapsed}
                width={SIDEBAR_WIDTH}
                bodyStyle={drawerBodyStyle}
                className={styles.drawer}
            >
                {renderContent()}
            </Drawer>
        );
    }

    return (
        <Sider
            theme={theme}
            trigger={null}
            collapsible
            collapsed={sidebarCollapsed}
            onCollapse={handleCollapse}
            width={SIDEBAR_WIDTH}
            className={styles.sider}
        >
            {renderContent()}
        </Sider>
    );
};

AppSideMenu.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    sidebarCollapsed: PropTypes.bool.isRequired,
    isDesktop: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    theme: PropTypes.string,
};

AppSideMenu.defaultProps = {
    theme: 'light',
};

const mapStateToProps = ({ sidebarCollapsed }) => ({
    sidebarCollapsed,
});

const mapDispatchToProps = {
    toggleSidebar: actions.sidebar.toggleSidebar,
};

export default connectScreenSize(
    withRouter(
        connect(mapStateToProps, mapDispatchToProps)(AppSideMenu),
    ),
);
