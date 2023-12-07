export const getShuffledWord = (word: string) => {
  // Convert the string to an array of characters
  const charArray = word.split('');

  // Shuffle the array
  for (let i = charArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
  }

  // Convert the array back to a string
  const shuffledWord = charArray.join('');

  return shuffledWord;
};

export const replaceAlphabetsWithSpace = (inputString: string) => {
  // Use regular expression to replace alphabetic characters with empty space
  const resultString = inputString.replace(/[a-zA-Z]/g, ' ');

  return resultString;
};
