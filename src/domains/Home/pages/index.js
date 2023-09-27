import React from 'react';

import ContentPage from '../components/ContentPage';
import Icon, { AntDesign } from '../components/Icon';
import {
    PATH_ACCOUNT_LIST, PATH_NOTICE, PATH_PAYSLIP, PATH_RECHARGES, PATH_REGISTER_TIME,
} from '../routes/paths';

import ShortcutButton from '../components/ShortcutButton';
import styles from './styles.module.scss';

const HomePage = () => {
    return (
        <ContentPage>
            <div className={styles.container}>
                <img
                    src={require('../assets/Point work.png').default}
                    alt="Logotipo Point work"
                    className={styles.imageLogo}
                />
                <p className={styles.textWelcome}>Bem-vindos ao Painel Administrativo PointWork!</p>
                <p className={styles.textHelp}>O que você gostaria de fazer?</p>
                <div className={styles.shortcutsContainer}>
                    <ShortcutButton
                        icon={(
                            <Icon
                                family={AntDesign}
                                name="OutlineTeam"
                                size={20}
                                className={styles.icon}
                            />
                        )}
                        path={PATH_ACCOUNT_LIST}
                        title="Funcionários"
                    />
                    <ShortcutButton
                        icon={(
                            <Icon
                                family={AntDesign}
                                name="OutlineException"
                                size={20}
                                className={styles.icon}
                            />
                        )}
                        path={PATH_PAYSLIP}
                        title="Holerite"
                    />
                    <ShortcutButton
                        icon={(
                            <Icon
                                family={AntDesign}
                                name="OutlineClockCircle"
                                size={20}
                                className={styles.icon}
                            />
                        )}
                        path={PATH_REGISTER_TIME}
                        title="Registro de ponto"
                    />
                    <ShortcutButton
                        icon={(
                            <Icon
                                family={AntDesign}
                                name="OutlineAlert"
                                size={20}
                                className={styles.icon}
                            />
                        )}
                        path={PATH_NOTICE}
                        title="Aviso"
                    />
                </div>
            </div>
        </ContentPage>
    );
};

export default HomePage;
