import React, { useCallback, useEffect } from 'react';

import { ClearOutlined, FilterOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import PropTypes from 'prop-types';

import { wrapForm } from '../helpers/form-helper';
import useClassNames from '../hooks/use-classnames';

import Form from '../Form';
import styles from './styles.module.scss';

const Filter = ({
    form, onSearch, handleSubmit,
    children, className, initialFilters,
    allowClearFilters,
}) => {

    const { initialize } = form;

    const wrapperClassName = useClassNames([styles.container, className]);

    const { hasValidationErrors, pristine } = form.getState();

    const handleSearch = useCallback(value => {
        onSearch(value);
    }, [onSearch]);

    const onClearFilters = useCallback(() => {
        onSearch({});
        form.reset({});
    }, [form, onSearch]);

    useEffect(() => {
        if (initialFilters) {
            initialize(initialFilters);
        }
    }, [initialFilters, initialize]);

    const renderButtonClearFilters = () => {
        if (allowClearFilters) {
            return (
                <Tooltip placement="bottom" title="Limpar filtros">
                    <Button
                        onClick={onClearFilters}
                        icon={<ClearOutlined />}
                        data-testid="clean-button"
                    />
                </Tooltip>
            );
        }

        return null;
    };

    return (
        <div>
            <Form onSubmit={handleSubmit(handleSearch)}>

                <div className={wrapperClassName}>
                    <div className={styles.filterContainer}>
                        {children}
                    </div>

                    <div className={styles.buttonContainer}>
                        {renderButtonClearFilters()}

                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<FilterOutlined />}
                            disabled={hasValidationErrors || pristine}
                        >
                            Filtrar
                        </Button>

                    </div>
                </div>
            </Form>
        </div>
    );
};

Filter.defaultProps = {
    allowClearFilters: true,
};

Filter.propTypes = {
    onSearch: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    allowClearFilters: PropTypes.bool,
};

export default wrapForm(Filter);
