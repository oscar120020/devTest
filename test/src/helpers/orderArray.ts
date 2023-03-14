
export const orderArrayBy = (arr: any[], by: string) => {
    if (by.length === 0) return arr;

    let newArr = [...arr];
    if (by === 'timestamp') {
        newArr = newArr.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        return newArr;
    }

    if (typeof arr[0][by] === "number"){
        newArr = newArr.sort((a, b) => b[by] - a[by])
        return newArr;
    } else {
        newArr = newArr.sort((a, b) => a[by].localeCompare(b[by]))
        return newArr;
    }

}