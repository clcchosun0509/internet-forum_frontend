export const SearchType = {
  TitleWithContent: "titleWithContent",
  Title: "title",
  User: "user",
} as const;
export type SearchType = typeof SearchType[keyof typeof SearchType];

export const searchTypes: Set<SearchType> = new Set([SearchType.TitleWithContent, SearchType.Title, SearchType.User]);

export const searchTypeDescription = {
  [SearchType.TitleWithContent]: "제목 + 내용",
  [SearchType.Title]: "제목",
  [SearchType.User]: "닉네임",
};
