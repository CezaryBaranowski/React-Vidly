export function paginate(items, pageNumber, pageSize) {
  const startIndex = pageSize * (pageNumber - 1);
  const newArray = items.slice(startIndex, startIndex + pageSize);
  return newArray;
}
