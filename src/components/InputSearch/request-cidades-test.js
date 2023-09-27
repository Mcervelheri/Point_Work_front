export default (axios, value, page, limit, params = {}) => {
    return axios.get('https://api.govfacilcidadao.com.br/orgaos/cidades', {
        params: {
            filtro: [
                {
                    where: ['cidades.nome', 'like', `%${value}%`],
                },
            ],
            limite: limit,
            pagina: page,
        },
    }).then(response => {
        const { data } = response;
        const { metadados, resultado } = data;
        return {
            metadados,
            resultado: resultado.map(cidade => ({
                label: `${cidade.nome} - ${cidade.estado.sigla}`,
                key: cidade.id,
            })),
        };
    });
};
