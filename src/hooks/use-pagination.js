import { useState, useCallback } from 'react';

const INITIAL_DATA_SOURCE = [];
const INITIAL_PAGE = 0;

const usePagination = ({
    initialPage = INITIAL_PAGE,
    requestDataSource,
    initialDataSource = INITIAL_DATA_SOURCE,
}) => {
    const [dataSource, setDataSource] = useState(initialDataSource);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [loadingMore, setLoadingMore] = useState(false);
    const [canLoadMore, setCanLoadMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        setCanLoadMore(false);
        setCurrentPage(initialPage);

        try {
            const result = await requestDataSource({
                page: initialPage,
                dataSource: initialDataSource,
            });

            if (result.ok) {
                setCanLoadMore(result.canLoadMore);
                setDataSource(result.dataSource);
            }
        } finally {
            setRefreshing(false);
        }
    }, [initialPage, initialDataSource, requestDataSource]);

    const handleLoadMore = useCallback(async () => {
        if (canLoadMore && !loadingMore && !refreshing && dataSource.length) {
            const nextPage = currentPage + 1;
            setLoadingMore(true);

            try {
                const result = await requestDataSource({
                    page: nextPage,
                    dataSource,
                });

                if (result.ok) {
                    setCurrentPage(nextPage);
                    setCanLoadMore(result.canLoadMore);
                    setDataSource(result.dataSource);
                }
            } finally {
                setLoadingMore(false);
            }
        }
    }, [canLoadMore, loadingMore, refreshing, dataSource, currentPage, requestDataSource]);

    return {
        dataSource,
        loadingMore,
        canLoadMore,
        refreshing,
        currentPage,
        doRefresh: handleRefresh,
        doLoadMore: handleLoadMore,
    };
};

export default usePagination;
