import { useMemo, useCallback } from 'react';

import { parse, stringify } from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';

const useUrlState = (options = {}) => {
    const {
        parseOptions,
        stringifyOptions,
        sanitize,
    } = options;

    const location = useLocation();
    const history = useHistory();

    const queryFromUrl = useMemo(() => {
        const parsedUrl = parse(location.search, parseOptions);
        return sanitize ? sanitize(parsedUrl) : parsedUrl;
    }, [sanitize, location.search, parseOptions]);

    const setState = useCallback((state, navigateMode = 'push') => {
        const newQuery = typeof state === 'function' ? state(queryFromUrl) : state;

        history[navigateMode]({
            hash: location.hash,
            search: stringify({ ...queryFromUrl, ...newQuery }, stringifyOptions) || '?',
        });
    }, [history, location.hash, stringifyOptions, queryFromUrl]);

    return [queryFromUrl, setState];
};

export default useUrlState;
