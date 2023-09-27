import React, {
    forwardRef, useCallback, memo,
} from 'react';

import {
    Select as AntSelect,
    Button, Spin,
} from 'antd';

import useClassNames from '../hooks/use-classnames';

import styles from './styles.module.scss';

const Select = memo(forwardRef(({
    options, mode, onChange,
    renderOption, value, onAddClick,
    onLoadMoreClick, loading, className,
    renderLabel,
    ...others
}, $ref) => {
    const pickOptionProps = useCallback(option => {
        return {
            key: option.key,
            label: renderLabel(option),
            item: option.item,
        };
    }, [renderLabel]);

    const isMultiple = mode === 'multiple';

    const handleClear = useCallback((val, option) => {
        // usado quando é clicado no CLEAR
        if (isMultiple) {
            onChange([]);
        } else {
            onChange(null);
        }
    }, [onChange, isMultiple]);

    const getValue = useCallback(() => {
        if (mode === 'multiple') {
            return Array.isArray(value) ? value : [];
        }
        return value || undefined;
    }, [value, mode]);

    const handleSelect = useCallback((val, option) => {
        // quando seleciona um item
        if (isMultiple) {
            // se múltiplo concatena o item adicionado
            onChange([...getValue(), pickOptionProps(option)]);
        } else {
            // se single então seleciona apena este
            onChange(pickOptionProps(option));
        }
    }, [getValue, onChange, isMultiple, pickOptionProps]);

    const handleDeselect = useCallback((val, option) => {
        // utilizado apenas quando for múltiplo para desmarcar cada item
        const currentValue = getValue();
        if (isMultiple) {
            onChange(currentValue.filter(opt => opt.key !== val.key));
        }
    }, [getValue, onChange, isMultiple]);

    const selectClasses = useClassNames([styles.select, className]);

    const renderSelectOption = option => {
        const {
            key, disabled, item,
        } = option;
        return {
            key,
            value: key,
            label: renderOption(option),
            item,
            disabled,
        };
    };

    const renderDropdown = useCallback(menu => (
        <div>
            {onAddClick ? (
                <Button
                    className={styles.optionButton}
                    onClick={onAddClick}
                >
                    Adicionar
                </Button>
            ) : null}
            {menu}
            {loading
                ? (
                    <div className={styles.loadingContainer}>
                        <Spin className={styles.spin} />
                        <span>Aguarde...</span>
                    </div>
                )
                : onLoadMoreClick
                    ? (
                        <Button
                            className={styles.optionButton}
                            onClick={onLoadMoreClick}
                        >
                            Carregar mais
                        </Button>
                    )
                    : null}
        </div>
    ), [loading, onAddClick, onLoadMoreClick]);

    const getPopupContainer = useCallback(trigger => trigger.parentNode, []);

    return (
        <AntSelect
            dropdownRender={renderDropdown}
            {...others}
            ref={$ref}
            className={selectClasses}
            value={getValue()}
            labelInValue
            mode={mode}
            onSelect={handleSelect}
            onDeselect={handleDeselect}
            options={options.map(renderSelectOption)}
            onClear={handleClear}
            getPopupContainer={getPopupContainer}
        />
    );
}));

Select.defaultProps = {
    renderOption: option => option.label,
    renderLabel: option => option.label,
    filterOption: (input, option) => {
        const inputStr = input.accentsFolding().toLowerCase();
        const childrenStr = (option.props.label || option.props.children).accentsFolding().toLowerCase();
        return childrenStr.includes(inputStr);
    },
};

export default Select;
