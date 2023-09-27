import moment from 'moment-timezone';

export const sorterDate = (a, b, indexName) => {
    return moment(a[indexName]).unix() - moment(b[indexName]).unix();
};

export const sorterString = (a, b, indexName) => {
    return a[indexName] - b[indexName];
};

export const sorterName = (a, b, indexName) => {
    return a[indexName].localeCompare(b[indexName]);
};
