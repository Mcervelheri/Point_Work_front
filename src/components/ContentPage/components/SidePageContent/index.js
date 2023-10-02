import React, { useMemo, memo } from 'react';

import { Drawer } from 'antd';
import PropTypes from 'prop-types';

import useClassNames from '../../../../hooks/use-classnames';
import useScreen from '../../../../hooks/use-screen';

import styles from './styles.module.scss';

const SidePageContent = memo(({
    children, visible, onClose,
    isDesktop, className,
    style, width,
}) => {
    const siderClasses = useClassNames([styles.sider, className]);
    const siderStyle = useMemo(() => ({ ...style, width }), [width, style]);
    const screen = useScreen();

    if (!isDesktop) {
        const { window } = screen;
        const drawerWidth = Math.min(width, window.width);
        return (
            <Drawer
                closable
                open={visible}
                placement="right"
                onClose={onClose}
                width={drawerWidth}
            >
                {children}
            </Drawer>
        );
    }

    return (
        <div className={siderClasses} style={siderStyle}>
            {children}
        </div>
    );
});

SidePageContent.propTypes = {
    isDesktop: PropTypes.bool,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    width: PropTypes.number,
};

SidePageContent.defaultProps = {
    isDesktop: false,
    visible: true,
    onClose: () => { },
    width: 256,
};

export default SidePageContent;
