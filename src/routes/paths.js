import urlJoin from 'url-join';

// Home
export const PATH_HOME = '/';

// Funcionarios
export const ACCOUNT_BASE_URL = '/funcionarios';

export const ACCOUNT_CREATE = '/funcionarios/criar';

export const PATH_ACCOUNT_EDIT_PHYSICAL = urlJoin(ACCOUNT_BASE_URL, '/editar/pessoa-fisica');

export const PATH_ACCOUNT_LIST = ACCOUNT_BASE_URL;

export const PATH_ACCOUNT_TRANSFERS = '/contas/visualizar/:idClientCompany/transacao/:idTransfer';

export const PATH_ACCOUNT_TRANSFERS_REMITTANCE = '/contas/visualizar/:idClientCompany/transacao/:idTransfer/remessas/';

// Recargas
export const PATH_RECHARGES = '/recargas';

// Exportação de dados
export const PATH_EXPORT_DATA_STATUS = '/exportacao-dados';

// Histórico de alteração de senha
export const PATH_PASSWORD_CHANGE_HISTORY = '/historico-alteracao-de-senha';

// Clientes vip
export const PATH_CLIENTS_VIP_LIST = '/clientes-vip';

// Registro de pontos
export const PATH_REGISTER_TIME = '/registro-ponto';

// Holerite
export const PATH_PAYSLIP = '/holerite';

// Avisos
export const PATH_NOTICE = '/avisos';

export const PATH_NOTICE_CREATE = '/avisos/criar';
