export const capitalizeText = (text: string) => {
  return text
    .split(' ')
    .map((word) => {
      const lowercaseWord = word.toLowerCase();
      return lowercaseWord[0].toUpperCase() + lowercaseWord.slice(1);
    })
    .join(' ');
};
