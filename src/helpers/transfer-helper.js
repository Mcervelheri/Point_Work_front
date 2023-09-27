import { STATUS_TRANSFER_TYPES } from '../values/enums';

export const getTransferStatusConfig = statusKey => {
    return STATUS_TRANSFER_TYPES.find(statusItem => statusItem.key === statusKey);
};
