import React, { forwardRef, useCallback, useMemo } from 'react';

import { SwapRightOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import { maskMoney } from '../helpers/masks';
import { parseDecimal } from '../helpers/parser';

import styles from './styles.module.scss';

const InputMinMax = forwardRef((props, $ref) => {

    const {
        onChange, value, disabled,
    } = props;

    const handleChange = useCallback((v, type) => {
        onChange({ ...value, [type]: parseDecimal(v) });
    }, [onChange, value]);

    const handleMinChange = useCallback(e => {
        const valueMin = e.target.value;
        if (!value?.max || parseDecimal(valueMin) <= value?.max) handleChange(valueMin, 'min');
    }, [handleChange, value]);

    const handleMaxChange = useCallback(e => {
        const valueMax = e.target.value;
        handleChange(valueMax, 'max');
    }, [handleChange]);

    const minInputSuffix = useMemo(() => {
        return <SwapRightOutlined className={styles.inputMinSuffix} />;
    }, []);

    return (
        <Input.Group compact ref={$ref} className={styles.inputGroup}>
            <Input placeholder="Valor" disabled className={styles.inputLabel} />
            <Input
                placeholder="Min."
                className={styles.inputMin}
                suffix={minInputSuffix}
                onChange={handleMinChange}
                value={(value?.min === 0 || !value?.min) ? null : maskMoney(value?.min)}
                disabled={disabled}
                format={maskMoney}
                parse={parseDecimal}
            />
            <Input
                placeholder="Max."
                className={styles.inputMax}
                onChange={handleMaxChange}
                value={(value?.max === 0 || !value?.max) ? null : maskMoney(value?.max)}
                disabled={disabled}
                format={maskMoney}
                parse={parseDecimal}
            />
        </Input.Group>
    );
});

export default InputMinMax;
