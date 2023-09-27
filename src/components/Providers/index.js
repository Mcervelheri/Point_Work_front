import React, { memo } from 'react';

import { ConfigProvider } from 'antd';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from 'react-router-dom';

import { history } from '../../helpers/history-helper';
import { AntLocale } from '../../helpers/locale-helper';
import store from '../../redux/store';

const ICON_PROP_VALUE = { className: 'react-icons' };

const Providers = memo(({ children }) => {
    return (
        <IconContext.Provider value={ICON_PROP_VALUE}>
            <ConfigProvider locale={AntLocale}>
                <Router history={history}>
                    <ReduxProvider store={store}>
                        {children}
                    </ReduxProvider>
                </Router>
            </ConfigProvider>
        </IconContext.Provider>
    );
});

Providers.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Providers;
