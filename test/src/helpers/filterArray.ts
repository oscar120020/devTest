
export const filterArrayBy = (arr: any[], filterIn: string, by: string) => {
    if (by.length === 0) return arr;
    if (!arr[0][filterIn]) return arr;
    let newArr = [...arr];
    newArr = newArr.filter(value => (value[filterIn].toString() as string).toLowerCase().startsWith(by.toLowerCase()))
    return newArr;
}