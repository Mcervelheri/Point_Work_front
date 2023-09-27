import { useState, useEffect } from 'react';

import throttle from 'lodash/throttle';

const useScrollObserver = ({ ref, horizontal, throttleWait = 1000 }) => {
    const [, forceUpdate] = useState(0);

    const elementRef = ref && ref.current;

    useEffect(() => {
        if (elementRef) {
            const onScroll = throttle(
                () => forceUpdate(i => i + 1),
                throttleWait,
                { trailing: true },
            );

            elementRef.addEventListener('scroll', onScroll);

            return () => {
                elementRef.removeEventListener('scroll', onScroll);
            };
        }

        return undefined;
    }, [elementRef, throttleWait]);

    const scrollLeft = elementRef?.scrollLeft || 0;
    const offsetWidth = elementRef?.offsetWidth || 0;
    const scrollWidth = elementRef?.scrollWidth || 0;

    const scrollTop = elementRef?.scrollTop || 0;
    const offsetHeight = elementRef?.offsetHeight || 0;
    const scrollHeight = elementRef?.scrollHeight || 0;

    const scrollStart = horizontal
        ? scrollLeft === 0
        : scrollTop === 0;
    const scrollEnd = horizontal
        ? offsetWidth + scrollLeft >= scrollWidth
        : offsetHeight + scrollTop >= scrollHeight;

    return {
        scrollStart,
        scrollEnd,
        scrollLeft,
        offsetWidth,
        scrollWidth,
        scrollTop,
        offsetHeight,
        scrollHeight,
    };
};

export default useScrollObserver;
