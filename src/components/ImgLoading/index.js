import React, {
    useState, useEffect, useCallback, memo,
} from 'react';

import { Spin } from 'antd';

import useClassNames from '../hooks/use-classnames';

import styles from './styles.module.scss';

const ImgLoading = memo(({ src, className, ...others }) => {
    const [loaded, setLoaded] = useState(false);

    const requestImage = useCallback(() => {
        const image = new Image();
        image.addEventListener('error', () => {
            setLoaded(true);
        });
        image.addEventListener('load', () => {
            setLoaded(true);
        });
        image.src = src;
    }, [src]);

    useEffect(() => {
        requestImage();
    }, [requestImage]);

    const divClasses = useClassNames([styles.container, className]);

    if (!loaded) {
        return (
            <div className={divClasses} {...others}>
                <Spin />
            </div>
        );
    }

    return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
            src={src}
            className={className}
            {...others}
        />
    );
});

export default ImgLoading;
