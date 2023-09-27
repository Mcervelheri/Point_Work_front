import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import thunks from '../redux/thunks';

export const ElementUseSelector = () => {

    const mockValues = useSelector(state => state.values);

    return (
        <span>{mockValues.title}</span>
    );
};

export const ElementUseDispatch = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunks.usuario.refreshUserAuthentication());
    }, [dispatch]);

    return (
        <span>use dispatch element</span>
    );
};

export const ElementUseLocation = () => {
    const location = useLocation();

    return (
        <div>
            <span>Location props:</span>
            <span>State example: {location.state?.title}</span>
            <span>key: {location.key}</span>
            <span>pathname: {location.pathname}</span>
            <span>search: {location.search}</span>
        </div>
    );
};
