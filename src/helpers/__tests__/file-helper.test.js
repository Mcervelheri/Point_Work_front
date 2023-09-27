import {
    resolveStorageUrl, base64ToByteArr, resolveImageUrl,
    fileImagePreview, isFileImage, getPreviewByType,
    isFileDocument, resolvePreview,
} from '../helpers/file-helper';

const urlBase = 'image-test';

const VIDEO_STRING = 'video-file-3-512.png';

const FILE_STRING = 'file-4-512.png';

jest.mock('../../assets/video-file-3-512.png', () => {
    return {
        default: VIDEO_STRING,
    };
});

jest.mock('../../assets/file-4-512.png', () => {
    return {
        default: FILE_STRING,
    };
});

describe('Quando chama a função base64ToByteArr', () => {

    it('retorna um array com apenas 1 elemento', () => {
        const base64 = 'QUw1QmFuaw==';
        const result = base64ToByteArr(base64);

        expect(result).toHaveLength(1);
    });

    it('retorna undefined quando não passado um base64', () => {

        const result = base64ToByteArr();

        expect(result).toBeUndefined();
    });

});

describe('Quando chama a função resolveImageUrl', () => {
    it(`retorna uma URL baseada na concatenação do parâmetro de tamanho, 
    da URL base e da env de url de imagens da AL5`, () => {
        const width = 100;
        const resultExpect = 'www.al5-bank/100/image-test';
        const result = resolveImageUrl(urlBase, width);

        expect(result).toBe(resultExpect);
    });

    it('retorna uma URL baseada na concatenação da relativeUrl e da env de url de imagens da AL5', () => {
        const resultExpect = 'www.al5-bank/image-test';
        const result = resolveImageUrl(urlBase);

        expect(result).toBe(resultExpect);
    });
});

describe('Quando chama a função resolveStorageUrl', () => {
    it('retorna a URL baseada na concatenação da relativeUrl e da env de url de imagens da AL5', () => {
        const resultExpect = 'www.al5-storage/image-test';
        const result = resolveStorageUrl(urlBase);

        expect(result).toBe(resultExpect);
    });
});

describe('Quando chama a função isFileImage', () => {
    it('retorna true se o mimeType corresponder a uma imagem', () => {
        const isFile = isFileImage('image/png');

        expect(isFile).toBeTruthy();
    });
    it('retorna false se o mimeType não corresponder a uma imagem', () => {
        const isFile = isFileImage('video/mp4');

        expect(isFile).toBeFalsy();
    });
});

describe('Quando chama a função fileImagePreview', () => {
    it('retorna null se não for passada nenhuma imagem', () => {
        const fileResult = fileImagePreview();

        expect(fileResult).toBeNull();
    });

    it('retorna a url da imagem quando passado uma imagem válida', () => {

        const url = 'www.images.com/';

        const fileResult = fileImagePreview({
            type: 'image/jpg',
            url,
        });
        expect(fileResult).toBe(url);
    });

    it('retorna a string mockada de vídeo quando o type for do tipo vídeo', () => {

        const fileResult = fileImagePreview({
            type: 'video/mp4',
        });
        expect(fileResult).toBe(VIDEO_STRING);
    });
});

describe('Quando chama a função getPreviewByType', () => {
    it('retorna uma string mockada quando passado um type válido', () => {
        const preview = getPreviewByType('video/mp4');

        expect(preview).toBe(VIDEO_STRING);
    });

    it('retorna a string mockada do asset padrão quando não encontra um type válido', () => {
        const preview = getPreviewByType('random string');

        expect(preview).toBe(FILE_STRING);
    });
});

describe('Quando chama a função isFileDocument', () => {
    it('retorna um regex correspondente a um tipo passado', () => {
        expect(isFileDocument('application/pdf')).toStrictEqual(/application\/pdf/);
    });
});

describe('Quando chama a função resolvePreview', () => {
    it('retorna uma string que representa um asset quando o mimetype não corresponder a uma imagem', () => {
        const preview = resolvePreview('random url', 'random string');
        expect(preview).toBe('file-4-512.png');
    });

    describe('e o type da imagem é um svg', () => {
        it('retorna uma url baseada na relativeUrl concatenada a env de url de imagens da AL5', () => {
            const url = 'URL';
            const preview = resolvePreview(url, 'image/svg', 100);
            expect(preview).toBe('www.al5-bank/URL');
        });
    });

    describe('e o type da imagem não é um svg', () => {
        it('retorna uma url baseada na relativeUrl e no width concatenados a env de url de imagens da AL5', () => {
            const url = 'URL';
            const preview = resolvePreview(url, 'image/jpg', 100);
            expect(preview).toBe('www.al5-bank/100/URL');
        });
    });
});
