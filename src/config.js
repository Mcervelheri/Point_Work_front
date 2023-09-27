/**
 * O objetivo deste arquivo é centralizar toda a configuração inicial que o
 * projeto precisa para iniciar.
 *
 * Mantendo as configs aqui, ganhamos em evitar referências circulares e facilita na manutenção,
 * pois antes toda a configuração ficava espalhada entre os arquivos de helpers.
 *
 * #### ATENÇÃO ####
 * Deve-ser ter cuidado ao incluir novos "imports" nesse arquivo, pois todo código
 * importado aqui será cerregado no Bundle principal.
 * #################
 */

import 'moment/locale/pt-br'; // eslint-disable-line import/no-extraneous-dependencies
import Col from 'antd/lib/col';
import arrayMutators from 'final-form-arrays';
import { Form } from 'react-final-form';

import './theme/default.scss';
import './helpers/polyfills-helper';
import { destroyAllDialogs } from './helpers/dialog-helper';
import { history } from './helpers/history-helper';

let currentLocation = history.location;

/**
 * Define o padrão de 24 colunas para manter o mesmo comportamento
 * da versão 3 do Ant Design.
 */
Col.defaultProps = {
    ...Col.defaultProps,
    span: 24,
};

/**
 * Cria listener para capturar eventos de navegação do
 * React Router
 */
history.listen(location => {
    // destroi todas as dialogs quando há navegação de tela
    if (currentLocation.pathname !== location.pathname) {
        destroyAllDialogs();
        currentLocation = location;
    }
});

/**
 * Final Form
 */
Form.defaultProps = {
    ...Form.defaultProps,
    mutators: {
        ...arrayMutators,
    },
};
