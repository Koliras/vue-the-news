export const SEARCH_IN_FIELDS = [
  'title',
  'description',
  'content',
];

export const initialNewsUrl = 'https://newsapi.org/v2/everything?pageSize=20';

export const SORT_METHODS = [
  { value: 'publishedAt', label: 'published at' },
  { value: 'relevancy', label: 'relevancy' },
  { value: 'popularity', label: 'popularity' },
]
