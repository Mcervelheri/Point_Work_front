import React, {
    lazy, Suspense, forwardRef, memo, useCallback,
} from 'react';

import {
    Input as AntdInput, Form, Switch, Checkbox, InputNumber,
} from 'antd';
import omit from 'lodash/omit';

import { wrapFormField } from '../helpers/form-helper';

const DatePicker = lazy(() => import('../DatePicker'));
const Select = lazy(() => import('../Select'));
const DateRangePicker = lazy(() => import('../DateRangePicker'));
const InputMinMax = lazy(() => import('../InputMinMax'));

const { TextArea, Search } = AntdInput;
const { Item } = Form;

const Input = memo(forwardRef((props, ref) => {
    const {
        input, meta,
        label, formItemProps,
        required, hasFeedback,
        hasFormItem, charCounter, maxLength,
        errorMessage, help, alwaysShowErrorMessage,
    } = props;

    const { onChange, type, value } = input;

    const {
        valid, touched, error, submitError,
    } = meta;

    const displayError = Boolean(alwaysShowErrorMessage || touched);

    const handleDateChange = useCallback(newValue => {
        if (onChange) onChange(newValue);
    }, [onChange]);

    const getValidateStatus = () => {
        if (!displayError) return null;

        return valid ? 'success' : 'error';
    };

    const renderTextInput = inputProps => {

        return (
            <AntdInput
                {...inputProps}
                {...input}
                ref={ref}
            />
        );
    };

    const renderTextArea = inputProps => {
        return (
            <TextArea
                {...inputProps}
                {...input}
                ref={ref}
            />
        );
    };

    const renderSearch = inputProps => {
        return (
            <Search
                {...inputProps}
                {...input}
                ref={ref}
            />
        );
    };

    const renderDatePicker = inputProps => {
        const {
            dateFormat,
            ...others
        } = inputProps;
        return (
            <DatePicker
                {...others}
                {...input}
                ref={ref}
                onChange={handleDateChange}
                format={dateFormat}
            />
        );
    };

    const renderSelect = inputProps => {
        return (
            <Select
                {...inputProps}
                {...input}
                ref={ref}
            />
        );
    };

    const renderDateRangePicker = inputProps => {
        const {
            dateFormat,
            ...others
        } = inputProps;
        return (
            <DateRangePicker
                {...others}
                {...input}
                ref={ref}
                onChange={handleDateChange}
                format={dateFormat}
            />
        );
    };

    const renderSwitch = inputProps => {
        return (
            <Switch
                {...inputProps}
                {...input}
                ref={ref}
                value={null}
                checked={value || false}
            />
        );
    };

    const renderCheckbox = inputProps => {
        return (
            <Checkbox
                {...inputProps}
                {...input}
                ref={ref}
            />
        );
    };

    const renderCheckboxGroup = inputProps => {
        return (
            <Checkbox.Group
                {...inputProps}
                {...input}
                ref={ref}
            />
        );
    };

    const renderInputNumber = inputProps => {
        return (
            <InputNumber
                {...inputProps}
                {...input}
                ref={ref}
            />
        );
    };

    const renderInputMinMax = inputProps => {
        return (
            <InputMinMax
                {...inputProps}
                {...input}
                ref={ref}
            />
        );
    };

    const renderInputComponent = () => {

        const inputProps = omit(props, [
            'label', 'formItemProps', 'charCounter',
            'hasFormItem', 'meta', 'input', 'parser',
            'hasFeedback', 'alwaysShowErrorMessage',
        ]);

        switch (type) {
            case 'date':
                return renderDatePicker(inputProps);
            case 'textarea':
                return renderTextArea(inputProps);
            case 'select':
                return renderSelect(inputProps);
            case 'daterange':
                return renderDateRangePicker(inputProps);
            case 'switch':
                return renderSwitch(inputProps);
            case 'checkbox':
                return renderCheckbox(inputProps);
            case 'checkbox-group':
                return renderCheckboxGroup(inputProps);
            case 'search':
                return renderSearch(inputProps);
            case 'number':
                return renderInputNumber(inputProps);
            case 'minmax':
                return renderInputMinMax(inputProps);
            default:
                return renderTextInput(inputProps);
        }
    };

    if (!hasFormItem) return renderInputComponent();

    const renderHelp = () => {

        if (displayError && !valid) {
            return errorMessage || error || submitError;
        }

        if (charCounter) {
            const charCounterMessage = charCounter
                ? `${(value || '').length} / ${maxLength}`
                : null;
            return charCounterMessage;
        }

        return help;
    };

    return (
        <Suspense fallback="Carregando...">
            <Item
                label={label}
                help={renderHelp()}
                hasFeedback={!meta.active && meta.touched && hasFeedback}
                validateStatus={getValidateStatus()}
                required={required}
                {...formItemProps}
            >
                {renderInputComponent()}
            </Item>
        </Suspense>
    );

}));

Input.defaultProps = {
    meta: {},
    hasFormItem: true,
};

Input.Field = wrapFormField(Input);

export default Input;
