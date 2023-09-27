import React from 'react';

import { SearchOutlined } from '@ant-design/icons';

import Filter from '../components/Filter';
import Input from '../components/Input';
import { wrapForm } from '../helpers/form-helper';
import { maskCPF, removeMask } from '../helpers/masks';

import styles from './styles.module.scss';

const FilterClientsVip = ({ onSearch }) => {

    const renderInputs = () => {
        return (
            <div className={styles.filtersContainer}>
                <Input.Field
                    name="nationalRegistration"
                    placeholder="Pesquisar CPF"
                    className={styles.searchInput}
                    prefix={<SearchOutlined className={styles.searchIcon} />}
                    format={maskCPF}
                    parse={removeMask}
                />

                <Input.Field
                    name="name"
                    placeholder="Pesquisar nome"
                    className={styles.searchInput}
                    prefix={<SearchOutlined className={styles.searchIcon} />}
                />
            </div>
        );
    };

    return (
        <Filter onSearch={onSearch}>
            {renderInputs()}
        </Filter>
    );
};

export default wrapForm(FilterClientsVip);
