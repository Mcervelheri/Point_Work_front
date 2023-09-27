import React from 'react';

import { render, screen } from '@testing-library/react';

import Header from '.';

describe('Teste unitário - Header', () => {
    describe('quando renderizado o componente apenas com o título', () => {
        it('apresenta o título', () => {
            const menuTitle = 'Menu Friendly';
            render(<Header title={menuTitle} />);

            expect(screen.getByText(menuTitle)).toBeInTheDocument();
        });
    });

    describe('quando renderizado com um elemento no lado direito', () => {
        it('apresenta o elemento passado na props rightComponent', () => {
            const rightComponentText = 'On your right';
            render(<Header rightComponent={<span>{rightComponentText}</span>} />);
            expect(screen.getByText(rightComponentText)).toBeInTheDocument();
        });
    });

    describe('quando renderizado com um elemento no lado esquerdo', () => {
        it('apresenta o elemento passado na props leftComponent', () => {
            const leftComponentText = 'On your left';
            render(<Header leftComponent={<span>{leftComponentText}</span>} />);
            expect(screen.getByText(leftComponentText)).toBeInTheDocument();
        });
    });
});
