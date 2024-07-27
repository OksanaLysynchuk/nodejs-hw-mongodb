const parseNumber = (number) => {
  if (typeof number !== 'string') {
    return undefined;
  }

  const parsedNumber = parseInt(number);

  if (Number.isNaN(parsedNumber)) {
    return undefined;
  }

  return parsedNumber;
};

export const parseFilterParams = (query) => {
  const { type, isFavorite } = query;

  const parsedType = parseNumber(type);
  const parsedIsFavorite = parseNumber(isFavorite);

  return {
    type: parsedType,
    isFavorite: parsedIsFavorite,
  };
};
