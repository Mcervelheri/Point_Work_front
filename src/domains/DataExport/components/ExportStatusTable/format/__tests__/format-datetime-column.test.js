import formatDatetimeColumn from '../format-datetime-column';

describe('formatDatetimeColumn | Teste Unitário', () => {
    describe('quando possui data e hora para formatar', () => {
        it('exibe a data e hora fornecida formatada', () => {
            expect(formatDatetimeColumn('2022-09-16T14:01:52.734Z')).toBe('16/09/2022 14:01:52');
        });
    });

    describe('quando não possui data e hora para formatar', () => {
        it('retorna null', () => {
            expect(formatDatetimeColumn(null)).toBe(null);
            expect(formatDatetimeColumn()).toBe(null);
        });
    });
});
