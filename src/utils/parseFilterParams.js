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
  const { type, isFavourite } = query;

  const parsedType = parseNumber(type);
  const parsedIsFavourite = parseNumber(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
