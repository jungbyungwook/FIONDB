interface MatchDetailDTO {
  seasonId: number; //	시즌 ID
  matchResult: string; //	매치 결과 (“승”, “무”, “패”)
  matchEndType: number; //	매치종료 타입 (0: 정상종료, 1: 몰수승, 2:몰수패)
  systemPause: number; //	게임 일시정지 수
  foul: number; //	파울 수
  injury: number; //	부상 수
  redCards: number; //	받은 레드카드 수
  yellowCards: number; //	받은 옐로카드 수
  dribble: number; //	드리블 거리(야드)
  cornerKick: number; //	코너킥 수
  possession: number; //	점유율
  OffsideCount: number; //	오프사이드 수
  averageRating: any; // Double; //	경기 평점
  controller: string; //	사용한 컨트롤러 타입 (keyboard / pad / etc 중 1)
}

interface ShootDTO {
  shootTotal: number; //	총 슛 수
  effectiveShootTotal: number; //	총 유효슛 수
  shootOutScore: number; //	승부차기 슛 수
  goalTotal: number; //	총 골 수 (실제 골 수)
  goalInPenaltynumber: number; //goalOutPenalty+goalPenaltyKick
  goalTotalDisplay: number; //	게임 종료 후 유저에게 노출되는 골 수
  ownGoal: number; //	자책 골 수
  shootHeading: number; //	헤딩 슛 수
  goalHeading: number; //	헤딩 골 수
  shootFreekick: number; //	프리킥 슛 수
  goalFreekick: number; //	프리킥 골 수
  shootInPenalty: number; //	인패널티 슛 수
  goalInPenalty: number; //	인패널티 골 수
  shootOutPenalty: number; //	아웃패널티 슛 수
  goalOutPenalty: number; //	아웃패널티 골 수
  shootPenaltyKick: number; //	패널티킥 슛 수
  goalPenaltyKick: number; //	패널티킥 골 수
}

interface ShootDetailDTO {
  goalTime: number; // 슛 시간
  x: any; //Double //	슛 x좌표 (전체 경기장 기준)
  y: any; //Double //	슛 y좌표 (전체 경기장 기준)
  type: number; //	슛 종류 (1 : normal , 2 : finesse , 3 : header)
  result: number; //	슛 결과 (1 : ontarget , 2 : offtarget , 3 : goal)
  spId: number; //	슈팅 선수 고유 식별자 (/metadata/spid API 참고)
  spGrade: number; //	슈팅 선수 강화 등급
  spLevel: number; //	슈팅 선수 레벨
  spIdType: boolean; //	슈팅 선수 임대 여부 (임대선수 : true, 비임대선수 : false)
  assist: boolean; //어시스트 받은 골 여부. (받음 : true, 안받음 : false)
  assistSpId: number; //	어시스트 선수 고유 식별자 (/metadata/spid API 참고)
  assistX: any; //Double; //	어시스트 x좌표
  assistY: any; //Double; //	어시스트 y좌표
  hitPost: boolean; //	골포스트 맞춤 여부. (맞춤 : true, 못 맞춤 : false)
  inPenalty: boolean; //	페널티박스 안에서 넣은 슛 여부 (안 : true, 밖 : false)
}

interface PassDTO {
  passTry: number; //	패스 시도 수
  passSuccess: number; //	패스 성공 수
  shortPassTry: number; //	숏 패스 시도 수
  shortPassSuccess: number; //	숏 패스 성공 수
  longPassTry: number; //	롱 패스 시도 수
  longPassSuccess: number; //	롱 패스 성공 수
  bouncingLobPassTry: number; //	바운싱 롭 패스 시도 수
  bouncingLobPassSuccess: number; //	바운싱 롭 패스 성공 수
  drivenGroundPassTry: number; //	드리븐 땅볼 패스 시도 수
  drivenGroundPassSuccess: number; //	드리븐 땅볼 패스 성공 수
  throughPassTry: number; //	스루 패스 시도 수
  throughPassSuccess: number; //	스루 패스 성공 수
  lobbedThroughPassTry: number; //	로빙 스루 패스 시도 수
  lobbedThroughPassSuccess: number; //	로빙 스루 패스 성공 수
}

interface DefenceDTO {
  blockTry: number; //	블락 시도 수
  blockSuccess: number; //	블락 성공 수
  tackleTry: number; //	태클 시도 수
  tackleSuccess: number; //	태클 성공 수
}
interface MatchInfoDTO {
  accessId: string; // 유저 고유 식별자
  nickname: string; // 닉네임
  matchDetail: MatchDetailDTO; // 매치 결과 상세 정보
  shoot: ShootDTO; // 슈팅정보
  pass: PassDTO; // 패스정보
  defence: DefenceDTO; // 수비정보
  player: any[]; // 경기 사용 선수 정보
}

interface PlayerDTO {
  spId: number; //	선수 고유 식별자 (/metadata/spid API 참고)
  spPosition: number; //	선수 포지션 (/metadata/spposition API 참고)
  spGrade: number; //	선수 강화 등급
  status: StatusDTO; //선수 경기 스탯
}

interface StatusDTO {
  shoot: number; //슛 수
  effectiveShoot: number; //	유효 슛 수
  assist: number; //	어시스트 수
  goal: number; //	득점 수
  dribble: number; //	드리블 거리(야드)
  intercept: number; //	인터셉트 수
  defending: number; //	디펜딩 수
  passTry: number; //	패스 시도 수
  passSuccess: number; //	패스 성공 수
  dribbleTry: number; //	드리블 시도 수
  dribbleSuccess: number; //	드리블 성공 수
  ballPossesionTry: number; //	볼 소유 시도 수
  ballPossesionSuccess: number; //	볼 소유 성공 수
  aerialTry: number; //	공중볼 경합 시도 수
  aerialSuccess: number; //	공중볼 경합 성공 수
  blockTry: number; //	블락 시도 수
  block: number; //	블락 성공 수
  tackleTry: number; //	태클 시도 수
  tackle: number; //	태클 성공 수
  yellowCards: number; //	옐로카드 수
  redCards: number; //	레드카드 수
  spRating: any; //Float //	선수 평점
}
export type {
  MatchInfoDTO,
  MatchDetailDTO,
  ShootDTO,
  ShootDetailDTO,
  PassDTO,
  DefenceDTO,
  PlayerDTO,
  StatusDTO,
};
