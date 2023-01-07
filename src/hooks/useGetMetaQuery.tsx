import { useQuery } from 'react-query';
import { metaAPI } from 'src/pages/api/player';

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
  return useQuery(metaQueryKey.matchTypeMeta, () => metaAPI.getMatchTypeMeta());
};

export const useGetMatchDivisionMeta = () => {
  return useQuery(metaQueryKey.matchDivisionMeta, () =>
    metaAPI.getMatchDivisionMeta(),
  );
};

export const useGetSoccerPlayersMeta = () => {
  return useQuery(metaQueryKey.soccerPlayersMeta, () =>
    metaAPI.getSoccerPlayerMeta(),
  );
};

export const useGetSeasonIdMeta = () => {
  return useQuery(metaQueryKey.seasonIdMeta, () => metaAPI.getSeasonIdMeta());
};
