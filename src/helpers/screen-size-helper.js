import React, { forwardRef } from 'react';

import useScreen from '../hooks/use-screen';

export const connectScreenSize = Component => {

    const ScreenSizeWrapper = forwardRef((props, $ref) => {
        const { sizes } = useScreen();
        return (
            <Component ref={$ref} {...props} {...sizes} />
        );
    });

    return ScreenSizeWrapper;
};
