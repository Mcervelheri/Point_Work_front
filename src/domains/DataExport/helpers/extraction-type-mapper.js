const EXTRACTION_TYPE_MAP = {
    PIX: 'Conciliação Pix',
    PLD: 'PLD',
};

export const getTitleFromExtractionType = extractionType => {
    return EXTRACTION_TYPE_MAP[extractionType];
};
