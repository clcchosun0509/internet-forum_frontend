export const BoardId = {
  Free: "free",
  Hahaha: "hahaha",
  Game: "game",
  Hobby: "hobby",
} as const;
export type BoardId = typeof BoardId[keyof typeof BoardId];

export const boards: Set<BoardId> = new Set([BoardId.Free, BoardId.Hahaha, BoardId.Game, BoardId.Hobby]);

export const boardTitle = {
  [BoardId.Free]: "자유롭게",
  [BoardId.Hahaha]: "하하하",
  [BoardId.Game]: "게임",
  [BoardId.Hobby]: "취미",
};

export const boardDescription = {
  [BoardId.Free]: "자유로운 주제로 대화해요!",
  [BoardId.Hahaha]: "순수한 웃음을 만들어봐요!",
  [BoardId.Game]: "PC게임, 콘솔 게임, 모바일 게임 무엇이든 좋아요!",
  [BoardId.Hobby]: "본인의 취미를 같이 공유해봐요!",
};
