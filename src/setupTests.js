/* eslint-disable import/no-extraneous-dependencies */

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'moment/locale/pt-br';
import arrayMutators from 'final-form-arrays';
import moment from 'moment-timezone';
import { Form } from 'react-final-form';

moment.tz.setDefault('UTC');

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

Form.defaultProps = {
    ...Form.defaultProps,
    mutators: {
        ...arrayMutators,
    },
};

jest.mock('./hooks/use-axios');

jest.mock('axios');

process.env.REACT_APP_URL_IMAGE = 'www.al5-bank';
process.env.REACT_APP_URL_STORAGE = 'www.al5-storage';
