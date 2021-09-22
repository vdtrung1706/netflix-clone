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

export function monthAgoDate() {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.toJSON().slice(0, 10);
}

export function getBoundingClientRect(element) {
  if (!element) return {};
  const { top, right, bottom, left, width, height, x, y } =
    element.getBoundingClientRect();
  return { top, right, bottom, left, width, height, x, y };
}

export function convertHMS(value) {
  const sec = parseInt(value, 10);
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - hours * 3600) / 60);
  let seconds = sec - hours * 3600 - minutes * 60;

  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  if (hours == 0) {
    return minutes + ':' + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
}
