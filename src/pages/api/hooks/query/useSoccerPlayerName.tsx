import { useQueryClient } from 'react-query';
import { metaQueryKey } from 'src/pages/api/hooks/useGetMetaQuery';
import { IMetaSpId } from 'src/pages/api/player/type';
import { getSoccerPlayerNameBySpId } from 'src/useCases/getSoccerPlayerNameBySpId';

export const useSoccerPlayerName = (spId: number) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(
    metaQueryKey.soccerPlayersMeta,
  ) as IMetaSpId[];

  return getSoccerPlayerNameBySpId(spId, data);
};
