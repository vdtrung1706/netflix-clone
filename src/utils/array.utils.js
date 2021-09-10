export function randomIndex(length) {
  return Math.floor(Math.random() * length);
}

export function includeObjectById(arr, id) {
  return arr.filter((item) => item.id == id).length > 0;
}
