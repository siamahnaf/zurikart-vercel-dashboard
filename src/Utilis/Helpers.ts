import uniqid from 'uniqid';

//Create UniqueId
export const UniqId = () => {
    const date = new Date();
    const components = [
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ];
    const id = components.join("");
    return uniqid() + id + uniqid();
}