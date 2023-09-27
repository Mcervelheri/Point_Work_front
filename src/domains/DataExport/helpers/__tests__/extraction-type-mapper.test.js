import { getTitleFromExtractionType } from '../extraction-type-mapper';

describe.each`
    type | title
    ${'PIX'} | ${'Conciliação Pix'}
    ${'PLD'} | ${'PLD'}
`('para o tipo de extração $type', ({ type, title }) => {
    it(`retorna o título ${title}`, () => {
        expect(getTitleFromExtractionType(type)).toBe(title);
    });
});
