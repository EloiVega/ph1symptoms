const removeWhiteSpaces = (str) => str.replace(/\s/g, "");
const capitalize = (str) => str.replace(/(^\w|\s\w)/g, m => m.toUpperCase());