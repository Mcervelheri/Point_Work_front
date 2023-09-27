import React, { useEffect } from 'react';

import { Prompt } from 'react-router-dom';

const PreventNavigation = ({
    when,
    message,
}) => {
    useEffect(() => {
        if (!when) return undefined;
        const preventNavigation = event => {
            // eslint-disable-next-line no-param-reassign
            event.returnValue = message;
            return message;
        };
        window.addEventListener('beforeunload', preventNavigation);
        return () => {
            window.removeEventListener('beforeunload', preventNavigation);
        };
    }, [when, message]);
    return (
        <Prompt
            when={when}
            message={message}
        />
    );
};

export default PreventNavigation;
