import { useEffect, useState, useMemo } from 'react';

import throttle from 'lodash/throttle';

const DEFAULT_WIDTH = 1366;
const DEFAULT_HEIGHT = 720;

const SCREEN_SIZES_MEDIAS = {
    xs: { maxWidth: 575 },
    sm: { maxWidth: 767, minWidth: 576 },
    md: { maxWidth: 991, minWidth: 768 },
    lg: { maxWidth: 1199, minWidth: 992 },
    xl: { maxWidth: 1599, minWidth: 1200 },
    xxl: { maxWidth: 3840, minWidth: 1600 },
    gtXs: { minWidth: 576 },
    gtSm: { minWidth: 768 },
    gtMd: { minWidth: 992 },
    gtLg: { minWidth: 1200 },
    gtXl: { minWidth: 1600 },
    gtXxl: { minWidth: 3841 },
};

const calculeScreenSizes = windowWidth => {
    return Object.entries(SCREEN_SIZES_MEDIAS)
        .reduce((acc, [key, value]) => {
            const { maxWidth, minWidth } = value;
            return {
                ...acc,
                [key]: (!maxWidth || windowWidth <= maxWidth)
                && (!minWidth || windowWidth >= minWidth),
            };
        }, {});
};

const mapScreenSizeToProps = ({
    sm, md,
    xs, lg, xl, xxl,
    gtMd,
}) => ({
    isMobile: xs,
    isTablet: sm || md,
    isDesktop: gtMd,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
});

const getScreenSizes = windowWidth => {
    const sizes = calculeScreenSizes(windowWidth);
    return mapScreenSizeToProps(sizes);
};

const useScreen = (throttleWait = 1000) => {
    const [, forceUpdate] = useState(0);

    const hasWindow = typeof window !== 'undefined';

    useEffect(() => {
        if (!hasWindow) return undefined;

        const onResize = throttle(() => {
            forceUpdate(i => i + 1);
        }, throttleWait, { trailing: true });

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [throttleWait, hasWindow]);

    const windowWidth = hasWindow
        ? window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth
        : DEFAULT_WIDTH;

    const windowHeight = hasWindow
        ? window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight
        : DEFAULT_HEIGHT;

    const sizes = useMemo(() => getScreenSizes(windowWidth), [windowWidth]);

    return {
        window: {
            width: windowWidth,
            height: windowHeight,
        },
        sizes,
    };
};

export default useScreen;
