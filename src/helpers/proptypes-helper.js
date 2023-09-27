import moment from 'moment-timezone';

import { validateColor } from './validations';

class PropTypeError extends Error {

    /**
     * @param {string} propName
     * @param {string} componentName
     * @param {string} value
     * @param {string} expected
     */
    constructor(propName, componentName, value, expected = '') {
        super(
            `Invalid prop \`${propName}\` supplied to `
            + `\`${componentName}\`. Received color: \`${value}\`. `
            + `${expected}`,
        );
    }

}

const createCustomPropValidator = callback => {
    const validator = (props, propName, componentName) => {
        const valor = props[propName];
        if (valor === undefined) return undefined;
        return callback(props, propName, componentName);
    };

    validator.isRequired = callback;

    return validator;
};

const PropTypesHelper = {
    color: createCustomPropValidator((props, propName, componentName) => {
        const value = props[propName];
        if (value && validateColor(value)) {
            return new PropTypeError(propName, componentName, value, 'Expected format `#000000`.');
        }
        return undefined;
    }),
    moment: createCustomPropValidator((props, propName, componentName) => {
        const value = props[propName];
        if (value && !moment.isMoment(value)) {
            return new PropTypeError(propName, componentName, value, 'Expected a `moment` instance.');
        }
        return undefined;
    }),
};

export default PropTypesHelper;
