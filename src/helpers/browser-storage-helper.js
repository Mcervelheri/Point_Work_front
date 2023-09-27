
export default {
    setItem(key, value) {
        if (window && window.localStorage) {
            localStorage.setItem(key, value);
        }
    },

    getItem(key) {
        if (!window || !window.localStorage) {
            return {};
        }

        return localStorage.getItem(key);
    },

    saveColumnsConfig(pageId, columns) {
        this.setItem(`${pageId}-columns`, JSON.stringify(columns));
    },

    loadColumnsConfig(pageId) {
        const columns = this.getItem(`${pageId}-columns`);
        return columns ? JSON.parse(columns) : null;
    },

    saveFilters(pageId, filters) {
        if (window && window.localStorage) {
            localStorage.setItem(`${pageId}-filters`, JSON.stringify(filters));
        }
    },

    loadFilters(pageId) {
        if (!window || !window.localStorage) {
            return {};
        }

        try {
            const content = localStorage.getItem(`${pageId}-filters`);
            return content ? JSON.parse(content) : {};
        } catch (err) {
            return {};
        }
    },
};
