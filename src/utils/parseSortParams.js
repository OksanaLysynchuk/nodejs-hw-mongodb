import { SORT_ORDER } from '../constants/index.js';

const parseSortBy = (sortBy) => {
  const keys = [
    '_id',
    'name',
    'email',
    'phoneNumber',
    'contactType',
    'favorite',
    'isFavorite',
  ];

  if (keys.includes(sortBy)) {
    return sortBy;
  }

  return '_id';
};

const parseSortOrder = (sortOrder) => {
  if ([SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder)) {
    return sortOrder;
  }

  return SORT_ORDER.ASC;
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);
  const parsedSortOrder = parseSortOrder(sortOrder);

  console.log(`Parsed sortBy: ${parsedSortBy}, sortOrder: ${parsedSortOrder}`);

  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
