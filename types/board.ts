export const Board = {
  Free: "free",
  Hahaha: "hahaha",
  Game: "game",
  Hobby: "hobby",
} as const;
export type Board = typeof Board[keyof typeof Board];

export const boards: Set<Board> = new Set([Board.Free, Board.Hahaha, Board.Game, Board.Hobby]);

export const boardTitle = {
  [Board.Free]: "자유롭게",
  [Board.Hahaha]: "하하하",
  [Board.Game]: "게임",
  [Board.Hobby]: "취미",
};

export const boardDescription = {
  [Board.Free]: "자유로운 주제로 대화해요!",
  [Board.Hahaha]: "순수한 웃음을 만들어봐요!",
  [Board.Game]: "PC게임, 콘솔 게임, 모바일 게임 무엇이든 좋아요!",
  [Board.Hobby]: "본인의 취미를 같이 공유해봐요!",
};
