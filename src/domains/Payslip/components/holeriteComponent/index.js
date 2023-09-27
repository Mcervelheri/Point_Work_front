import React from 'react';

import styles from './styles.module.scss';

const HoleriteComponent = ({
    nome, cargo, salario, descontos, beneficios,
}) => {
    return (
        <div className={styles.holeriteContainer}>
            <div>
                <h2 className={styles.holeriteTitle}>Nome: {nome}</h2>
                <p className={styles.holeriteInfo}>Cargo: {cargo}</p>
                <p className={styles.holeriteInfo}>Salário: R$ {salario}</p>

            </div>
            <div className={styles.holeriteDescontos}>
                <h3>Descontos</h3>
                <ul>
                    {descontos.map((desconto, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <li key={index}>{desconto}</li>
                    ))}
                </ul>
            </div>

            <div className={styles.holeriteBeneficios}>
                <h3>Benefícios</h3>
                <ul>
                    {beneficios.map((beneficio, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <li key={index}>{beneficio}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HoleriteComponent;
