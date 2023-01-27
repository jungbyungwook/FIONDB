import { useQuery } from 'react-query';
import { metaAPI } from 'src/pages/api/meta';

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

export const useCaseGetMetaData = () => {
  const useGetMatchTypeMeta = () => {
    return useQuery(
      metaQueryKey.matchTypeMeta,
      () => metaQueryFunction.matchTypeMeta,
    );
  };

  const useGetMatchDivisionMeta = () => {
    return useQuery(
      metaQueryKey.matchDivisionMeta,
      () => metaQueryFunction.matchDivisionMeta,
    );
  };

  const useGetSoccerPlayersMeta = () => {
    return useQuery(
      metaQueryKey.soccerPlayersMeta,
      () => metaQueryFunction.soccerPlayersMeta,
    );
  };

  const useGetSeasonIdMeta = () => {
    return useQuery(metaQueryKey.seasonIdMeta, () => metaAPI.getSeasonIdMeta());
  };

  return {
    useGetMatchTypeMeta,
    useGetMatchDivisionMeta,
    useGetSoccerPlayersMeta,
    useGetSeasonIdMeta,
  };
};
