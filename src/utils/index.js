import cx from 'classnames';

export function truncate(text, limit) {
  if (text && text.length >= limit) {
    let newText = text.substr(0, limit - 1);
    for (let i = limit - 1; i < text.length; i++) {
      if (text[i] === ' ') {
        return newText + '...';
      }
      newText += text[i];
    }
    return newText + '...';
  }

  return text;
}

export function randomIndex(length) {
  return Math.floor(Math.random() * length);
}

export function paginationIndicator(pageLength, sliderIndex) {
  var listItems = [];

  for (let i = 0; i < pageLength; i++) {
    const listItem = (
      <li
        key={i}
        className={cx(
          `inline-block w-3 h-2px ml-1px ${
            sliderIndex === i ? 'bg-white' : 'bg-gray-800'
          }`
        )}
      ></li>
    );
    listItems.push(listItem);
  }

  return listItems;
}
