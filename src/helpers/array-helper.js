export function removeItem(array, item) {
    const newArray = [...array];
    for (let i = 0; i < newArray.length; i += 1) {
        if (newArray[i] === item) {
            newArray.splice(newArray.indexOf(item), 1);
            i -= 1;
        }
    }

    return newArray;
}

export const removeAllNullablesItens = array => {
    return removeItem(array, null);
};
