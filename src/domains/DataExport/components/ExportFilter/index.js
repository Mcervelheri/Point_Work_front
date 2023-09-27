import React from 'react';

import Filter from '../components/Filter';
import Input from '../components/Input';

const ExportFilter = ({ initialFilters, onSearch }) => {
    return (
        <Filter
            onSearch={onSearch}
            initialFilters={initialFilters}
            allowClearFilters={false}
        >
            <Input.Field
                type="date"
                name="referenceDate"
                dateFormat="DD/MM/YYYY"
                placeholder="Data de referência"
                allowClear={false}
                label="Data de referência"
            />
        </Filter>
    );
};

export default ExportFilter;
