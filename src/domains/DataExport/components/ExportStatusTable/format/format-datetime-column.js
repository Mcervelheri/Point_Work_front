import { formatDate } from '../helpers/date-helper';

const formatDatetimeColumn = datetime => {
    if (datetime) return formatDate(datetime, 'DD/MM/YYYY HH:mm:ss');

    return null;
};

export default formatDatetimeColumn;
