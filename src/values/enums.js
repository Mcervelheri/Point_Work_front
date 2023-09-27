export const SPD_STATUS = [
    {
        key: '01',
        label: 'Aguardando Documentos',
    },
    {
        key: '02',
        label: 'Bloqueio por pendência de ajuste documental (onboarding)',
    },
    {
        key: '03',
        label: 'Bloqueio por cadastro incompleto - sanitização',
    },
    {
        key: '04',
        label: 'Bloqueio por BACENJUD',
    },
    {
        key: '08',
        label: 'Bloqueio por política preventiva de risco',
    },
    {
        key: '09',
        label: 'Bloqueio por CPF/CNPJ irregular',
    },
    {
        key: '10',
        label: 'Bloqueio por notificação judicial',
    },
    {
        key: '11',
        label: 'Aguardando Documentos - Cash-in liberado',
    },
    {
        key: '12',
        label: 'Bloqueio por analise de documentos - Cash-in liberado',
    },
    {
        key: '13',
        label: 'Bloqueio por analise de documentos - Bloqueio total',
    },
    {
        key: '14',
        label: 'Desinteresse Comercial - 14',
    },
    {
        key: '15',
        label: 'Bloqueio por suspeita de fraude transacional',
    },
    {
        key: '16',
        label: 'Bloqueio por política de risco',
    },
    {
        key: '17',
        label: 'Bloqueio por fraude transacional confirmada',
    },
    {
        key: '18',
        label: 'Bloqueio por pendência de dados (sanitização)',
    },
    {
        key: '19',
        label: 'Bloqueio por pendência no envio de documentos (sanitização)',
    },
    {
        key: '20',
        label: 'Bloqueio por pendência de ajuste documental (sanitização)',
    },
    {
        key: '21',
        label: 'Desinteresse Comercial - 21',
    },
    {
        key: '22',
        label: 'Bloqueio por documentação incompleta - sanitização',
    },
    {
        key: '23',
        label: 'Bloqueio por encerramento de cadastro',
    },
    {
        key: '24',
        label: 'Bloqueio por inatividade',
    },
    {
        key: '25',
        label: 'Bloqueio por notificação de infração',
    },
];

export const STATUS_TYPES = [
    {
        key: 'WAITING_DOCUMENTS',
        label: 'Aguardando Documentos',
        color: 'orange',
    },
    {
        key: 'WAITING_ANALYSIS',
        label: 'Aguardando Análise',
        color: 'purple',
    },
    {
        key: 'WAITING_CORRECTIONS',
        label: 'Aguardando Correções',
        color: 'orange',
    },
    {
        key: 'ACTIVE',
        label: 'Ativo',
        color: 'green',
    },
    {
        key: 'DECLINED',
        label: 'Rejeitado',
        color: 'red',
    },
    {
        key: 'CANCELED',
        label: 'Cancelado',
        color: 'red',
    },
    {
        key: 'BLOCKED',
        label: 'Bloqueado',
        color: 'red',
    },
    {
        key: 'OUTDATED',
        label: 'Desatualizado',
        color: 'grey',
    },
];

export const STATUS_TRANSFER_TYPES = [
    {
        key: 'null',
        label: '-',
        color: '#000',
        borderColor: '#000',
        backgroundColor: '#000',
    },
    {
        key: 'SCHEDULED',
        label: 'Agendado',
        color: '#FA8C16',
        borderColor: '#FA8C16',
        backgroundColor: '#FFF7E6',
    },
    {
        key: 'WAITING_APPROVE',
        label: 'Aguardando',
        color: '#000000',
        borderColor: '#000000',
        backgroundColor: '#FAFAFA',
    },
    {
        key: 'APPROVED',
        label: 'Aprovado',
        color: '#B7EB8F',
        borderColor: '#B7EB8F',
        backgroundColor: '#F6FFED',
    },
    {
        key: 'CANCELED',
        label: 'Cancelado',
        color: '#F5222D',
        borderColor: '#F5222D',
        backgroundColor: '#FFF1F0',
    },
    {
        key: 'PROCESSING_ERROR',
        label: 'Erro',
        color: '#F5222D',
        borderColor: '#F5222D',
        backgroundColor: '#FFF1F0',
    },
    {
        key: 'EXPIRED',
        label: 'Expirado',
        color: '#EB2F96',
        borderColor: '#EB2F96',
        backgroundColor: '#FFF0F6',
    },
    {
        key: 'PROCESSING',
        label: 'Processando',
        color: '#2F54EB',
        borderColor: '#2F54EB',
        backgroundColor: '#F0F5FF',
    },
    {
        key: 'REJECTED',
        label: 'Rejeitado',
        color: '#F5222D',
        borderColor: '#F5222D',
        backgroundColor: '#FFF1F0',
    },

];

export const TYPES_TRANSACTION_TYPES_FILTER = [
    { key: 'null', label: '-' },
    { searchQuery: ['PAYMENT'], key: 'PAYMENT', label: 'Boleto' },
    { searchQuery: ['PAYMENT_SCHEDULE'], key: 'PAYMENT_SCHEDULE', label: 'Boleto agendado' },
    { searchQuery: ['PIX'], key: 'PIX', label: 'Pix' },
    { searchQuery: ['PIX_SCHEDULE'], key: 'PIX_SCHEDULE', label: 'Pix agendado' },
    { searchQuery: ['TEDOUT', 'TED'], key: 'TED', label: 'TED' },
    { searchQuery: ['TEDOUT_SCHEDULE', 'TED_SCHEDULE'], key: 'TED_SCHEDULE', label: 'TED agendada' },
];

export const TYPES_TRANSACTION_TYPES = [
    { key: 'null', label: '-', color: 'white' },
    { key: 'TED', label: 'TED', color: 'green' },
    { key: 'TED_SCHEDULE', label: 'TED agendada', color: 'green' },
    { key: 'TEDOUT', label: 'TED', color: 'green' },
    { key: 'TEDOUT_SCHEDULE', label: 'TED agendado', color: 'green' },
    { key: 'PIX', label: 'Pix', color: 'purple' },
    { key: 'PIX_SCHEDULE', label: 'Pix agendado', color: 'purple' },
    { key: 'PAYMENT', label: 'Boleto', color: 'grey' },
    { key: 'PAYMENT_SCHEDULE', label: 'Boleto agendado', color: 'grey' },
    { key: 'BATCH', label: 'Remessa Bancária', color: '#FAAD14' },
];

export const GENDER_OPTIONS = [
    { key: 'M', label: 'Masculino' },
    { key: 'F', label: 'Feminino' },
    { key: 'O', label: 'Outro' },
    { key: 'N', label: 'Prefiro não informar' },
];

export const MARITAL_OPTIONS = [
    { key: 1, label: 'Solteiro(a)' },
    { key: 2, label: 'Casado(a)' },
    { key: 3, label: 'Legamente separado(a)' },
    { key: 4, label: 'Viúvo(a)' },
    { key: 5, label: 'Divorciado(a)' },
    { key: 6, label: 'Morando junto' },
    { key: 7, label: 'Separado(a)' },
];

export const ESTADO_OPTIONS = [
    { key: 'AC', label: 'Acre' },
    { key: 'AL', label: 'Alagoas' },
    { key: 'AP', label: 'Amapá' },
    { key: 'AM', label: 'Amazonas' },
    { key: 'BA', label: 'Bahia' },
    { key: 'CE', label: 'Ceará' },
    { key: 'DF', label: 'Distrito Federal' },
    { key: 'ES', label: 'Espírito Santo' },
    { key: 'GO', label: 'Goiás' },
    { key: 'MA', label: 'Maranhão' },
    { key: 'MT', label: 'Mato Grosso' },
    { key: 'MS', label: 'Mato Grosso do Sul' },
    { key: 'MG', label: 'Minas Gerais' },
    { key: 'PA', label: 'Pará' },
    { key: 'PB', label: 'Paraíba' },
    { key: 'PR', label: 'Paraná' },
    { key: 'PE', label: 'Pernambuco' },
    { key: 'PI', label: 'Piauí' },
    { key: 'RJ', label: 'Rio de Janeiro' },
    { key: 'RN', label: 'Rio Grande do Norte' },
    { key: 'RS', label: 'Rio Grande do Sul' },
    { key: 'RO', label: 'Rondônia' },
    { key: 'RR', label: 'Roraima' },
    { key: 'SC', label: 'Santa Catarina' },
    { key: 'SP', label: 'São Paulo' },
    { key: 'SE', label: 'Sergipe' },
    { key: 'TO', label: 'Tocantins' },
];

export const PROFESSION_OPTIONS = [
    { key: 1, label: 'Administrador(a)' },
    { key: 2, label: 'Advogado(a)' },
    { key: 3, label: 'Aviação, funcionário(a) em aeroporto, Etc.' },
    { key: 4, label: 'Agente de viagens, guia, Etc.' },
    { key: 5, label: 'Fazendeiro(a)' },
    { key: 6, label: 'Agrônomo(a)' },
    { key: 7, label: 'Aposentado(a) geral' },
    { key: 8, label: 'Arquiteto(a)' },
    { key: 9, label: 'Assitente social' },
    { key: 10, label: 'Posição de gestão e alto aconselhamento' },
    { key: 11, label: 'Autônomo(a)' },
    { key: 12, label: 'Criação de pequenos animais, granjas, avícolas, etc.' },
    { key: 13, label: 'Funcionário(a) de banco público ou privado' },
    { key: 14, label: 'Empresário(a)' },
    { key: 15, label: 'Bibliotecário(a), arquivista, museologista, arqueologista' },
    { key: 16, label: 'Biologista, biomedico(a)' },
    {
        key: 17,
        label: 'Cabelereiro(a), barbeiro(a), manicure, pedicure, maquiador(a), massagista',
    },
    { key: 18, label: 'Carpinteiro(a), marceneiro(a)' },
    { key: 19, label: 'Funcionário(a) de comércios em geral' },
    { key: 20, label: 'Proprietário(a) de estabelecimento comercial' },
    {
        key: 21,
        label: 'Proprietário(a) de micro ou pequena empresa / contratante / construtora',
    },
    { key: 22, label: 'Contador(a)' },
    { key: 23, label: 'Imobiliária, seguro, corretor de títulos e ações' },
    { key: 24, label: 'Odontologista' },
    { key: 25, label: 'Desenhista técnico, designer, etc' },
    { key: 26, label: 'Economista' },
    {
        key: 27,
        label: 'Diretor(a), conselheiro(a) pedagógico(a), secretário(a) escolar, etc.',
    },
    { key: 28, label: 'Manutenção elétrica de veículos, maquinas e dispositivos' },
    { key: 30, label: 'Enfermeiro(a), nutricionista' },
    { key: 31, label: 'Engenheiro(a)' },
    { key: 32, label: 'Profissional de letras e artes' },
    { key: 33, label: 'Escultor(a), pintor(a), artista visual ou similares' },
    { key: 34, label: 'Designer comercial' },
    { key: 35, label: 'Estagiário(a), bolsista, estudante, etc' },
    { key: 36, label: 'Farmaceutico(a)' },
    { key: 37, label: 'Fabricante de ferramentas' },
    { key: 38, label: 'Físico' },
    { key: 39, label: 'Fisioterapeuta, terapeuta nutricional' },
    { key: 40, label: 'Servidor público estadual' },
    { key: 41, label: 'Servidor público federal' },
    { key: 42, label: 'Servidor público municipal' },
    { key: 43, label: 'Geógrafo(a)' },
    {
        key: 44,
        label:
            'Serralheiro(a), prensa gráfica, linotipista, blocagem, operador(a) externo, operador(a) rotativo ',
    },
    { key: 47, label: 'Proprietário(a) de estabelecimento industrial' },
    { key: 49, label: 'Ourive, joalheiro(a)' },
    { key: 50, label: 'Jornaleiro(a), florista' },
    { key: 51, label: 'Jornalista' },
    {
        key: 52,
        label:
            'Assistente de laboratório, sapateiro(a), chaveiro, relojoeiro(a), jardineiro(a)',
    },
    { key: 53, label: 'Mecânico automotivo' },
    { key: 54, label: 'Médico(a)' },
    { key: 55, label: 'Metalurgico(a)' },
    { key: 56, label: 'Funcionário(a) de companhia pública' },
    { key: 57, label: 'Motorista independente, taxista' },
    { key: 58, label: 'Músico(a)' },
    {
        key: 60,
        label:
            'Pedreiro(a), encanador(a), ladrilhador(a), agente de impermeabilização, '
            + 'agente de colocação (carpetes, verniz de assoalho de madeira, etc.)',
    },
    { key: 61, label: 'Pensionista' },
    { key: 62, label: 'Pescador(a)' },
    { key: 63, label: 'Pintor(a) de parede, estudador(a)' },
    { key: 64, label: 'Ministro, governador, prefeito, secretário de estado/município' },
    { key: 65, label: 'Estivador(a), expedidor(a), empacotador(a)' },
    { key: 66, label: 'Psicólogo(a)' },
    { key: 67, label: 'Professor(a) de primeiro e segundo grau' },
    { key: 68, label: 'Promotor de vendas e outros' },
    { key: 69, label: 'Anunciante (contato, diretor(a) de arte, escritor(a), etc.)' },
    { key: 70, label: 'Químico(a)' },
    { key: 71, label: 'Orador(a), locutor(a) de rádio, comentarista de rádio e TV' },
    { key: 74, label: 'Representante de vendas, vendedor ambulante' },
    { key: 75, label: 'Não classificado' },
    { key: 77, label: 'Pavimentista, manutenção de sites, manobrista, vidraceiro(a)' },
    { key: 78, label: 'Modelo' },
    { key: 79, label: 'Agente de trânsito e outros' },
    { key: 80, label: 'Vigia, porteiro(a), guarda, guarda de segurança, bombeiro(a)' },
    { key: 84, label: 'Veterinário(a), zooténico(a)' },
    { key: 85, label: 'Geologista' },
];

export const COMPANY_FORMAT = [
    { key: 'EI', label: 'EI' },
    { key: 'MEI', label: 'MEI' },
    { key: 'EIRELI', label: 'EIRELI' },
    { key: 'LTDA', label: 'LTDA' },
    { key: 'SA', label: 'SA' },
    { key: 'ME', label: 'ME' },
    { key: 'EPP', label: 'EPP' },
    { key: 'EMGP', label: 'EMGP' },
    { key: 'COOP', label: 'COOP' },
    { key: 'DEMAIS', label: 'DEMAIS' },
];

export const STATE_OPTIONS = [
    {
        label: 'Acre',
        key: 'AC',
    },
    {
        label: 'Alagoas',
        key: 'AL',
    },
    {
        label: 'Amapá',
        key: 'AP',
    },
    {
        label: 'Amazonas',
        key: 'AM',
    },
    {
        label: 'Bahia',
        key: 'BA',
    },
    {
        label: 'Ceará',
        key: 'CE',
    },
    {
        label: 'Distrito Federal',
        key: 'DF',
    },
    {
        label: 'Espírito Santo',
        key: 'ES',
    },
    {
        label: 'Goiás',
        key: 'GO',
    },
    {
        label: 'Maranhão',
        key: 'MA',
    },
    {
        label: 'Mato Grosso',
        key: 'MT',
    },
    {
        label: 'Mato Grosso do Sul',
        key: 'MS',
    },
    {
        label: 'Minas Gerais',
        key: 'MG',
    },
    {
        label: 'Pará',
        key: 'PA',
    },
    {
        label: 'Paraíba',
        key: 'PB',
    },
    {
        label: 'Paraná',
        key: 'PR',
    },
    {
        label: 'Pernambuco',
        key: 'PE',
    },
    {
        label: 'Piauí',
        key: 'PI',
    },
    {
        label: 'Rio de Janeiro',
        key: 'RJ',
    },
    {
        label: 'Rio Grande do Norte',
        key: 'RN',
    },
    {
        label: 'Rio Grande do Sul',
        key: 'RS',
    },
    {
        label: 'Rondônia',
        key: 'RO',
    },
    {
        label: 'Roraima',
        key: 'RR',
    },
    {
        label: 'Santa Catarina',
        key: 'SC',
    },
    {
        label: 'São Paulo',
        key: 'SP',
    },
    {
        label: 'Sergipe',
        key: 'SE',
    },
    {
        label: 'Tocantins',
        key: 'TO',
    },
];

export const ACCOUNT_PROFILES = {
    ATTORNEY: {
        label: 'Representante Legal',
        color: 'blue',
        key: 'ATTORNEY',
    },
    OWNER: {
        label: 'Sócio',
        color: 'cyan',
        key: 'OWNER',
    },
};

export const ACCOUNT_PROFILE_OPTIONS = [
    {
        label: ACCOUNT_PROFILES.ATTORNEY.label,
        key: ACCOUNT_PROFILES.ATTORNEY.key,
    },
    {
        label: ACCOUNT_PROFILES.OWNER.label,
        key: ACCOUNT_PROFILES.OWNER.key,
    },
];

export const ORDERS = {
    ascend: {
        field: 'ASC',
    },
    descend: {
        field: 'DESC',
    },
};

export const TYPE_PHONE_OPTIONS = [
    { key: 18, label: 'Celular' },
    { key: 20, label: 'Fixo' },
];

export const OPTIONS_STATUS = [
    { key: 'REJECTED', label: 'Rejeitado' },
    { key: 'PROCESSING', label: 'Processando' },
    { key: 'WAITING_APPROVE', label: 'Aguardando Aprovação' },
    { key: 'PROCESSING_ERROR', label: 'Erro' },
    { key: 'SCHEDULED', label: 'Agendado' },
    { key: 'APPROVED', label: 'Aprovado' },
];

export const STATUS_TYPES_RECHARGES = [
    {
        key: 'PAID',
        label: 'PAGA',
        color: 'orange',
    },
    {
        key: 'REFOUND_COMPLETE',
        label: 'ESTORNADA',
        color: 'purple',
    },
    {
        key: 'REFOUND',
        label: 'ESTORNO EM ANDAMENTO',
        color: 'BLUE',
    },
    {
        key: 'START',
        label: 'INICIADA',
        color: 'pink',
    },
    {
        key: 'FAILED_TO_PAY',
        label: 'FALHA NO PAGAMENTO',
        color: 'red',
    },
    {
        key: 'COMPLETE',
        label: 'COMPLETADA',
        color: 'green',
    },
];

export const TYPE_OPERATION_PASSWORD_CHANGE = [
    { key: 'RESET_PASSWORD', label: 'Reset' },
    { key: 'UPDATE_PASSWORD', label: 'Alteração' },
];

export const RESULT_OPERATION_PASSWORD_CHANGE = [
    { key: 'true', label: 'Concluído' },
    { key: 'false', label: 'Não concluído' },
];
