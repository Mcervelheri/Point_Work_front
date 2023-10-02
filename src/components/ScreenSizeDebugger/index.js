import React, { useState, useCallback, memo } from 'react';

import { Tooltip } from 'antd';

import useClassNames from '../../hooks/use-classnames';
import useScreen from '../../hooks/use-screen';

import styles from './styles.module.scss';

const Content = memo(() => {
    const [hide, setHide] = useState(false);
    const handleHideClick = useCallback(() => {
        setHide(h => !h);
    }, []);
    const classes = useClassNames([styles.default, hide ? styles.hide : null]);

    const { sizes } = useScreen();
    const {
        isTablet,
        isMobile,
        isDesktop,
        xs,
        sm,
        md,
        lg,
        xl,
        xxl,
        gtLg,
    } = sizes;

    return (
        <Tooltip
            title="Screen size debugger (click to hide/show)"
        >
            <span
                onClick={handleHideClick}
                className={classes}
                role="button"
                tabIndex="-1"
            >
                {'{'}
                <span>{isTablet && ' isTablet '}</span>
                <span>{isMobile && ' isMobile '}</span>
                <span>{isDesktop && ' isDesktop '}</span>
                <span>{xs && ' xs '}</span>
                <span>{sm && ' sm '}</span>
                <span>{md && ' md '}</span>
                <span>{lg && ' lg '}</span>
                <span>{xl && ' xl '}</span>
                <span>{xxl && ' xxl '}</span>
                <span>{gtLg && ' gtLg '}</span>
                {'}'}
            </span>
        </Tooltip>
    );
});

const ScreenSizeDebugger = memo(() => {
    return (
        <Content />
    );
});

export default ScreenSizeDebugger;
