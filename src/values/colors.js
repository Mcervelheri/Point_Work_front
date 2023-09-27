const colors = {
    primaryCyan400: '#2883A3',
    cyan7: '#08979C',
    polarGreen8: '#237804',
    sunriseYellow6: '#FADB14',
    magenta6: '#EB2F96',
    goldenPurple6: '#722ED1',

    background: '#fff',

    primary: '#08979c',
    primaryDark: '#00474f',
    primaryLight: '#36cfc9',
    textOnPrimary: '#000000',

    accent: '#cf1322',
    accentDark: '#820014',
    accentLight: '#ff4d4f',
    textOnAccent: '#ffffff',

    textPrimaryDark: 'rgba(0, 0, 0, 0.87)', // 87%
    textSecondaryDark: 'rgba(0, 0, 0, 0.54)', // 54%
    textDisabledDark: 'rgba(0, 0, 0, 0.38)', // 38%
    textHintDark: 'rgba(0, 0, 0, 0.38)', // 38%
    dividerDark: 'rgba(0, 0, 0, 0.12)', // 12%

    textPrimaryLight: 'rgb(255, 255, 255)', // 100%
    textSecondaryLight: 'rgba(255, 255, 255, 0.7)', // 70%
    textDisabledLight: 'rgba(255, 255, 255, 0.5)', // 50%
    textHintLight: 'rgba(255, 255, 255, 0.5)', // 50%
    dividerLight: 'rgba(255, 255, 255, 0.24)', // 24%

    tagBackground: '#dddddd',

    transparent: 'rgba(0, 0, 0, 0)',
};

export const getColorContrastYIQ = hexcolor => {
    if (!hexcolor) return '#000000';
    let color;
    switch (hexcolor.length) {
        case 7: // #ff00ff
            color = hexcolor.substr(1);
            break;
        case 4: // #f0f
            color = hexcolor.substr(1, 1).repeat(2)
                + hexcolor.substr(2, 1).repeat(2) + hexcolor.substr(3, 1).repeat(2);
            break;
        default:
            return '#ffffff';
    }
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#000000' : '#ffffff';
};

export default colors;
