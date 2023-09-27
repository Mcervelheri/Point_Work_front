/* eslint-disable no-plusplus */

import urlJoin from 'url-join';

const { REACT_APP_URL_STORAGE, REACT_APP_URL_IMAGE } = process.env;

const SVG_MIME_TYPE = 'image/svg';

export const IMAGE_MIME_TYPE_REGEX = /image\/.+/; // imagem

export const DOCUMENTS_MIME_TYPE_REGEX = [
    /text\/.+/, // texto
    /application\/pdf/, // pdf
    /application\/xml/, // xml
    /application\/vnd\.ms-powerpoint/, // ppt
    /application\/vnd\.openxmlformats-officedocument\.presentationml\.presentation/, // pptx
    /application\/vnd\.ms-excel/, // xls
    /application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet/, // xlsx
    /application\/msword/, // doc
    /application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document/, // docx
    /application\/vnd\.oasis\.opendocument\..+/, // openoffice novo
    /application\/vnd\.sun\.xml\..+/, // openoffice antigo
];

export const PREVIEW_IMAGE_MIME_TYPE = [
    {
        thumb: require('../assets/video-file-3-512.png').default,
        regex: /video\/.+/, // vídeo
    },
    {
        thumb: require('../assets/audio-file-3-512.png').default,
        regex: /audio\/.+/, // aúdio
    },
    {
        thumb: require('../assets/code-512.png').default,
        regex: /(application|text)\/xml/, // xml
    },
    {
        thumb: require('../assets/document-512.png').default,
        regex: /text\/.+/, // texto
    },
    {
        thumb: require('../assets/pdf-512.png').default,
        regex: /application\/pdf/, // pdf
    },
    {
        thumb: require('../assets/powerpoint-3-512.png').default,
        regex: /application\/vnd\.ms-powerpoint/, // ppt
    },
    {
        thumb: require('../assets/powerpoint-3-512.png').default,
        regex: /application\/vnd\.openxmlformats-officedocument\.presentationml\.presentation/, // pptx
    },
    {
        thumb: require('../assets/exel-512.png').default,
        regex: /application\/vnd\.ms-excel/, // xls
    },
    {
        thumb: require('../assets/exel-512.png').default,
        regex: /application\/vnd\.openxmlformats-officedocument\.spreadsheetml\.sheet/, // xlsx
    },
    {
        thumb: require('../assets/word-3-512.png').default,
        regex: /application\/msword/, // doc
    },
    {
        thumb: require('../assets/word-3-512.png').default,
        regex: /application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document/, // docx
    },
    {
        thumb: require('../assets/powerpoint-3-512.png').default,
        regex: /application\/vnd\.oasis\.opendocument\.presentation/, // odp
    },
    {
        thumb: require('../assets/exel-512.png').default,
        regex: /application\/vnd\.oasis\.opendocument\.spreadsheet/, // ods.
    },
    {
        thumb: require('../assets/word-3-512.png').default,
        regex: /application\/vnd\.oasis\.opendocument\.text/, // odt.
    },
    {
        thumb: require('../assets/word-3-512.png').default,
        regex: /application\/vnd\.sun\.xml\.writer/, // sxw.
    },
    {
        thumb: require('../assets/exel-512.png').default,
        regex: /application\/vnd\.sun\.xml\.calc/, // sxc.
    },
    {
        thumb: require('../assets/powerpoint-3-512.png').default,
        regex: /application\/vnd\.sun\.xml\.draw/, // sxd.
    },
];

export const isFileImage = mimetype => {
    return IMAGE_MIME_TYPE_REGEX.test(mimetype);
};

export const isFileDocument = mimetype => {
    return DOCUMENTS_MIME_TYPE_REGEX.find(regex => regex.test(mimetype));
};

export function base64ToByteArr(base64String) {
    try {
        const sliceSize = 1024;
        const byteCharacters = window.atob(base64String);
        const bytesLength = byteCharacters.length;
        const slicesCount = Math.ceil(bytesLength / sliceSize);
        const byteArrays = new Array(slicesCount);

        for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            const begin = sliceIndex * sliceSize;
            const end = Math.min(begin + sliceSize, bytesLength);

            const bytes = new Array(end - begin);
            for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return byteArrays;
    } catch (e) {
        return undefined;
    }
}

export const getPreviewByType = mimetype => {
    const type = PREVIEW_IMAGE_MIME_TYPE.find(t => t.regex.test(mimetype));

    if (type) {
        return type.thumb;
    }
    return require('../assets/file-4-512.png').default;
};

export const fileUrl = file => {
    return file?.urlPreview || file?.url || URL.createObjectURL(file, { oneTimeOnly: true });
};

export const fileImagePreview = file => {
    if (!file) return null;

    if (isFileImage(file?.type)) {
        return fileUrl(file);
    }

    return getPreviewByType(file?.type);
};

export const resolveStorageUrl = relativeUrl => {
    return urlJoin(REACT_APP_URL_STORAGE, relativeUrl);
};

export const resolveImageUrl = (relativeUrl, width) => {

    if (width) {
        return urlJoin(REACT_APP_URL_IMAGE, String(width), relativeUrl);
    }
    return urlJoin(REACT_APP_URL_IMAGE, relativeUrl);
};

export const resolvePreview = (relativeUrl, mimetype, width) => {
    if (IMAGE_MIME_TYPE_REGEX.test(mimetype)) {
        return resolveImageUrl(relativeUrl, !mimetype.startsWith(SVG_MIME_TYPE) ? width : null);
    }
    return getPreviewByType(mimetype);
};

// BOM é necessário para que o excel entenda que o arquivo
// está no formato UTF-8
// https://stackoverflow.com/a/42466254/2826279
const universalBOM = '\uFEFF';

export const downloadFile = ({ filename, content, contentType }) => {
    const blob = new Blob([content], { type: contentType });

    if (window.navigator.msSaveOrOpenBlob) {
        // For IE
        window.navigator.msSaveBlob(blob, filename);
    } else {
        // For onthers browsers
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
};

export const downloadCsv = ({
    filename, content,
}) => {
    return downloadFile({
        filename,
        content: universalBOM + content,
        contentType: 'text/csv',
    });
};

export const downloadPdf = ({
    filename, content,
}) => {
    return downloadFile({
        filename,
        content,
        contentType: 'application/pdf',
    });
};
