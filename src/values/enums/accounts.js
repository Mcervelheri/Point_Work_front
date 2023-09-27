export const UPLOAD_ACCEPT_FILES = [
    'image/*',
    'audio/*',
    'video/*',
    'application/zip',
    '.pdf',
];

export const UPLOAD_MAX_FILE_SIZE = 6 * 1024 * 1024; // 6MB.

export const PARTNERS_TYPE_OPTIONS = [
    {
        type: 'P',
        profile: 'ATTORNEY',
        index: 1,
        color: 'blue',
        label: 'Representante Legal',
    },
    {
        type: 'P',
        profile: 'OWNER',
        index: 2,
        color: 'blue',
        label: 'Sócio - Pessoa Física',
    },
    {
        type: 'C',
        profile: 'OWNER',
        index: 3,
        color: 'cyan',
        label: 'Sócio - Pessoa Jurídica',
    },
];

export const UPLOAD_FILES_COMPANY = [
    {
        name: 'ccmei',
        label: 'Certificado do Microempreendedor Individual (CCMEI)',
        formDataKey: 'CCMEI',
    },
    {
        name: 'procuracao',
        label: 'Procuração',
        formDataKey: 'PUBLIC_LETTER_OF_ATTORNEY',
    },
    {
        name: 'contratoSocial',
        label: 'Contrato Social',
        formDataKey: 'ARTICLES_OF_ASSOCIATION',
    },
    {
        name: 'companyBylaws',
        label: 'Estatutos da Empresa',
        formDataKey: 'COMPANY_BYLAWS',
    },
    {
        name: 'privateLetterAttorney',
        label: 'Procuração',
        formDataKey: 'PRIVATE_LETTER_OF_ATTORNEY',
    },
    {
        name: 'legalStatement',
        label: 'Declaração Jurídica',
        formDataKey: 'LEGAL_STATEMENT',
    },
    {
        name: 'eireliIncorporationStatement',
        label: 'Declaração de Incorporação de Eireli',
        formDataKey: 'EIRELI_INCORPORATION_STATEMENT',
    },
    {
        name: 'eiRequirements',
        label: 'Requisição de Registro EI',

        formDataKey: 'EI_REGISTRATION_REQUIREMENT',
    },
    {
        name: 'extraDocs',
        label: 'Documentos Extraordinários',
        formDataKey: 'EXTRAORDINARY_DOCUMENTS',
    },
];

export const UPLOAD_FILES_PARTNER = [
    {
        name: 'driverLicenseFront',
        label: 'CNH (Frente)',
        formDataKey: 'DRIVER_LICENSE_FRONT',
    },
    {
        name: 'driverLicenseVerse',
        label: 'CNH (Verso)',
        formDataKey: 'DRIVER_LICENSE_VERSE',
    },
    {
        name: 'idVerse',
        label: 'Identidade (Verso)',
        formDataKey: 'IDENTITY_CARD_VERSE',
    },
    {
        name: 'idFront',
        label: 'Identidade (Frente)',
        formDataKey: 'IDENTITY_CARD_FRONT',
    },
    // {
    //     name: 'workCard',
    //     label: 'Carteira de Trabalho',
    //     formDataKey: 'WORK_CARD',
    // },
    // {
    //     name: 'porfessionalIdCard',
    //     label: 'Carteira de Identificação Profissional',
    //     formDataKey: 'PROFESSIONAL_IDENTIFICATION_CARD',
    // },
    // {
    //     name: 'militaryIdCard',
    //     label: 'Carteira de Identificação Militar',
    //     formDataKey: 'MILITARY_IDENTIFICATION_CARD',
    // },
    // {
    //     name: 'revenuesReceipt',
    //     label: 'Holerite',
    //     formDataKey: 'REVENUES_RECEIPT',
    // },
    // {
    //     name: 'signatureCard',
    //     label: 'Cartão de Assinatura',
    //     formDataKey: 'SIGNATURE_CARD',
    // },
    {
        name: 'selfie',
        label: 'Selfie',
        formDataKey: 'SELFIE',
    },
];
