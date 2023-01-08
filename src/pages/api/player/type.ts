export type AccessId = string;
export type MatchId = string;
export type NickName = string;
export interface IMaxDivision {
  matchType: number;
  division: number;
  achievementDate: string;
}
export interface IMetaDivision {
  divisionId: number;
  divisionName: string;
}
export interface IMetaMatchType {
  matchtype: number;
  desc: string;
}
export interface IMetaSpId {
  id: number;
  name: string;
}
export interface IMetaSeasonId {
  seasonId: number;
  className: string;
  seasonImg: string;
}
