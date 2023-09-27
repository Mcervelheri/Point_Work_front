const STATUS_CONFIG = {
    PENDING: {
        title: 'PENDENTE',
        color: 'orange',
    },
    NO_CONTENT: {
        title: 'SEM CONTEÚDO',
        color: 'geekblue',
    },
    FINISHED: {
        title: 'FINALIZADO',
        color: 'green',
    },
    ERROR: {
        title: 'FALHOU',
        color: 'red',
    },
};

export const getTitleFromMapperStatus = status => {
    return STATUS_CONFIG[status].title;
};

export const getColorFromMapperStatus = status => {
    return STATUS_CONFIG[status].color;
};
