export const replaceHTML = (stringHTML: string) => {
  return stringHTML
    .replace(/<(.|\n)*?>/g, '')
    .replace('&nbsp;', ' ')
    .trim();
};

export const divToLineBreaks = (stringHTML: string) => {
  const replaced = stringHTML.replace(/<\/div>/g, '\n').replace('&nbsp;', ' ');
  return replaceHTML(replaced);
};

export const removeSpaces = (stringHTML: string) => {
  return stringHTML.replace(/&nbsp;/g, '').trim();
};
