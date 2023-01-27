import { useQuery } from 'react-query';
import { metaAPI } from '../player';

export const metaQueryKey = {
  matchTypeMeta: ['matchTypeMeta'],
  matchDivisionMeta: ['matchDivisionMeta'],
  soccerPlayersMeta: ['soccerPlayerMeta'],
  seasonIdMeta: ['seasonIdMeta'],
};

export const metaQueryFunction = {
  matchTypeMeta: metaAPI.getMatchTypeMeta(),
  matchDivisionMeta: metaAPI.getMatchDivisionMeta(),
  soccerPlayersMeta: metaAPI.getSoccerPlayerMeta(),
};

export const useGetMatchTypeMeta = () => {
  return useQuery(
    metaQueryKey.matchTypeMeta,
    () => metaQueryFunction.matchTypeMeta,
  );
};

export const useGetMatchDivisionMeta = () => {
  return useQuery(
    metaQueryKey.matchDivisionMeta,
    () => metaQueryFunction.matchDivisionMeta,
  );
};

export const useGetSoccerPlayersMeta = () => {
  return useQuery(
    metaQueryKey.soccerPlayersMeta,
    () => metaQueryFunction.soccerPlayersMeta,
  );
};

export const useGetSeasonIdMeta = () => {
  return useQuery(metaQueryKey.seasonIdMeta, () => metaAPI.getSeasonIdMeta());
};
