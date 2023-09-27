/* eslint-disable no-extend-native */

window.IS_IE = /(Trident\/|MSIE)/.test(navigator.userAgent);

String.prototype.accentsFolding = String.prototype.accentsFolding || function accentsFolding() {
    let s = this;
    s = s.replace(/[àáâãäå]/gim, 'a');
    s = s.replace(/[èéêë]/gim, 'e');
    s = s.replace(/[ìíîï]/gim, 'i');
    s = s.replace(/[òóôõö]/gim, 'o');
    s = s.replace(/[ùúûü]/gim, 'u');
    s = s.replace(/æ/gim, 'ae');
    s = s.replace(/ç/gim, 'c');
    s = s.replace(/ñ/gim, 'n');
    s = s.replace(/œ/gim, 'oe');
    s = s.replace(/[ýÿ]/gim, 'y');
    return s;
};
