import { Ability } from '@casl/ability';
import { Can as AbilityCan } from '@casl/react';
import { connect } from 'react-redux';

import store from '../redux/store';

const mapStateToProps = ({ ability }) => ({ ability });

export const Can = connect(mapStateToProps)(AbilityCan);

const detectSubjectType = subject => {
    if (subject?.modelName) {
        return subject.modelName;
    }
    if (subject?.constructor) {
        return subject.constructor.modelName || subject.constructor.name;
    }
    return subject;
};

export function createAbility(rules = []) {
    return new Ability(rules, {
        detectSubjectType,
    });
}

/**
 * Renderiza o componente em "children" caso o usuário tenha permissão
 * senão renderiza o componente em "defaultChildren" que tem valor padrão "null" se não informado.
 * @param {string|string[]} actions Ação para validação. Se informado um array, a condição é aplicada como "ou".
 * @param {string} subject Modelo para o qual a ação é aplicada
 * @param {object} children JSX para renderizar em caso de permissão existente
 * @param {object} defaultChildren JSX para renderizar em caso de permissão não existente
 */
export function renderIfICan(actions, subject, children, defaultChildren = null) {
    const { ability } = store.getState();
    const shouldShow = Array.isArray(actions)
        ? actions.some(action => ability.can(action, subject))
        : ability.can(actions, subject);

    return shouldShow ? children : defaultChildren;
}
