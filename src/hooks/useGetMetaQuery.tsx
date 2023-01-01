import { useQuery } from 'react-query';
import { metaAPI } from 'src/pages/api/player';

export const metaQueryKey = {
  matchTypeMeta: ['matchTypeMeta'],
  matchDivisionMeta: ['matchDivisionMeta'],
  soccerPlayersMeta: ['soccerPlayerMeta'],
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
