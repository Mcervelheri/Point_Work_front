import {
    getTitleFromMapperStatus,
    getColorFromMapperStatus,
} from '../export-status-mapper';

describe('export-status-mapper | Teste Unitário', () => {
    describe.each`
        status          | title             | color
        ${'PENDING'}    | ${'PENDENTE'}     | ${'orange'}
        ${'NO_CONTENT'} | ${'SEM CONTEÚDO'} | ${'geekblue'}
        ${'FINISHED'}   | ${'FINALIZADO'}   | ${'green'}
        ${'ERROR'}      | ${'FALHOU'}       | ${'red'}
    `('quando o status é $status', ({ status, title, color }) => {
        it(`retorna o título ${title}`, () => {
            expect(getTitleFromMapperStatus(status)).toBe(title);
        });

        it(`retorna a cor ${color}`, () => {
            expect(getColorFromMapperStatus(status)).toBe(color);
        });
    });
});
