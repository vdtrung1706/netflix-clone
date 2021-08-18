export const truncate = (text, limit) => {
  if (text && text.length >= limit) {
    let newText = `${text.substr(0, limit - 1)}`;
    for (let i = limit - 1; i < text.length; i++) {
      if (text[i] === ' ') {
        return newText + '...';
      }
      newText += text[i];
    }
    return newText + '...';
  }

  return text;
};
