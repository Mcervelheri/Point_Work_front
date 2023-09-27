import React, {
    useState, useCallback,
    useMemo, memo, useImperativeHandle, forwardRef,
} from 'react';

import { Empty } from 'antd';
import throttle from 'lodash/throttle';

import { wrapFormField } from '../helpers/form-helper';
import { messageError } from '../helpers/toast';
import useAxios from '../hooks/use-axios';

import Input from '../Input';
import requestCidadesTest from './request-cidades-test';

const LIMIT = 10;

const useRequestByType = searchType => {
    return useMemo(() => {
        switch (searchType) {
            case 'cidades': return requestCidadesTest;
            default: return Promise.resolve;
        }
    }, [searchType]);
};

const requestOptions = async ({
    axios,
    requestSearch,
    searchValue,
    page,
    dataSource,
    params,
}) => {
    try {
        const firstPage = page === 1;

        const response = await requestSearch(axios, searchValue, page, LIMIT, params);
        const { resultado, metadados } = response;

        return {
            dataSource: firstPage ? resultado : [...dataSource, ...resultado],
            canLoadMore: metadados.pagina < metadados.paginas,
            page: metadados.pagina,
        };
    } catch (err) {
        console.warn(err);
        if (err.response) {
            messageError('Não foi possível carregar as opções, tente novamente mais tarde.');
        } else {
            messageError('Você parece estar offline, verifique sua conexão com a Internet.');
        }
        throw err;
    }
};

const InputSearch = memo(forwardRef(({
    input, params, searchType,
    onDropdownVisibleChange,
    ...others
}, ref) => {
    const axios = useAxios();
    const requestSearch = useRequestByType(searchType);

    const [fetching, setFetching] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [canLoadMore, setCanLoadMore] = useState(false);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');

    useImperativeHandle(ref, () => ({
        clearOptions: () => {
            setDataSource([]);
            setCanLoadMore(false);
            setPage(1);
        },
    }), []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearch = useCallback(throttle(
        async value => {
            setFetching(true);
            setDataSource([]);
            setCanLoadMore(false);
            setPage(1);
            setSearchValue(value);

            const result = await requestOptions({
                axios,
                dataSource: [],
                page: 1,
                searchValue: value,
                requestSearch,
                params,
            });

            setDataSource(result.dataSource);
            setCanLoadMore(result.canLoadMore);
            setPage(result.page);
            setFetching(false);
        },
        2000,
        {
            trailing: true,
        },
    ), [axios, requestSearch, params]);

    const handleLoadMore = useCallback(async () => {
        setFetching(true);

        const nextPage = page + 1;

        const result = await requestOptions({
            axios,
            dataSource,
            page: nextPage,
            searchValue,
            requestSearch,
            params,
        });

        setDataSource(result.dataSource);
        setCanLoadMore(result.canLoadMore);
        setPage(result.page);
        setFetching(false);
    }, [page, axios, dataSource, searchValue, requestSearch, params]);

    const handleDropdownVisibleChange = useCallback(visible => {
        if (onDropdownVisibleChange) onDropdownVisibleChange(visible);

        if (visible && !dataSource.length) {
            handleSearch('');
        }
    }, [onDropdownVisibleChange, dataSource, handleSearch]);

    const inputProps = useMemo(() => ({
        ...input,
        type: 'select',
    }), [input]);

    return (
        <Input
            {...others}
            onSearch={handleSearch}
            options={dataSource}
            input={inputProps}
            loading={fetching}
            showSearch
            notFoundContent={<Empty description={false} />}
            onLoadMoreClick={canLoadMore ? handleLoadMore : null}
            onDropdownVisibleChange={handleDropdownVisibleChange}
            filterOption={false}
        />
    );
}));

InputSearch.Field = wrapFormField(InputSearch);

export default InputSearch;
