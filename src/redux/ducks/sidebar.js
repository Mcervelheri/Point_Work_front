import { createAction, handleAction } from 'redux-actions';

const toggleSidebar = createAction('LAYOUT/TOGGLE_SIDEBAR');

export const actions = {
    toggleSidebar,
};

export const sidebarCollapsedHandler = handleAction(
    toggleSidebar,
    (state, action) => (
        typeof action.payload === 'boolean' ? action.payload : !state
    ),
    false,
);

export const reducers = {
    sidebarCollapsed: sidebarCollapsedHandler,
};
