import React from 'react';

import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';

import NotFoundImage from '../assets/NotFoundImage';
import colors from '../values/colors';

import styles from './styles.module.scss';

const NotFoundPage = ({ returnPath }) => {
    return (
        <div>
            <Row gutter={24} className={styles.container}>
                <Col md={12}>
                    <div className={styles.containerLeft}>
                        <div className={styles.descricaoErro}>
                            <div><strong>Erro 404</strong></div>
                            <div>
                                A página que você solicitou não foi encontrada.
                            </div>
                        </div>

                        <p>
                            Voltar para a <Link to={returnPath}>Página Inicial</Link>
                        </p>
                    </div>
                </Col>

                <Col md={12}>
                    <div className={styles.containerRight}>
                        <div className={styles.notFoundImage}>
                            <NotFoundImage
                                color={colors.primary}
                                size="100%"
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

NotFoundPage.defaultProps = {
    returnPath: '/',
};

export default NotFoundPage;
