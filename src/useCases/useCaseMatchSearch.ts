import { QueryClient, useInfiniteQuery, useQueryClient } from 'react-query';

import { matchAPI } from 'src/pages/api/match';
import type { AccessId, IMetaSpId } from 'src/pages/api/type';
import { metaQueryKey } from 'src/useCases/useCaseGetMetaData';
import { getSoccerPlayerNameBySpId } from '../util/getSoccerPlayerNameBySpId';

export const useCaseMatchSearch = () => {
  const useRefetchMatchList = (accessId: string) => {
    const queryClient = useQueryClient();
    const refetchQuery = () =>
      queryClient.invalidateQueries(['matchList', accessId]);
    const queryState = queryClient.getQueryState(['matchList', accessId]);

    return { refetchQuery, queryState };
  };

  const useSoccerPlayerName = (spId: number) => {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData(
      metaQueryKey.soccerPlayersMeta,
    ) as IMetaSpId[];

    return getSoccerPlayerNameBySpId(spId, data);
  };

  const useMatchInfiniteQuery = (accessId: AccessId | undefined) => {
    if (!accessId) return;
    const fetchMatches = async ({ pageParam = 0 }) => {
      const matchListData = await matchAPI.getMatchList(accessId, pageParam);
      const responseWithMatchDetails = matchListData.map((matchId) =>
        matchAPI.getMatchDetail(matchId),
      );

      const currentPageData = await Promise.all(responseWithMatchDetails);
      return {
        currentPageData,
        currentPageParam: pageParam,
        nextPageParam: pageParam + 20,
      };
    };

    const queryKey = ['matchList', accessId];

    // 다음 페이지 호출을 위한 pageParam을 get하기 위한 함수

    const matchListInfiniteQuery = useInfiniteQuery({
      queryKey,
      queryFn: fetchMatches,
      getNextPageParam: (lastPage, pages) => lastPage.nextPageParam,
    });

    return matchListInfiniteQuery;
  };

  const usePrefetchMatchInfiniteQuery = async (
    accessId: AccessId | undefined,
    queryClient: QueryClient,
  ) => {
    if (!accessId) return;
    const fetchMatches = async ({ pageParam = 0 }) => {
      const matchListData = await matchAPI.getMatchList(accessId, pageParam);
      const responseWithMatchDetails = matchListData.map((matchId) =>
        matchAPI.getMatchDetail(matchId),
      );
      const currentPageData = await Promise.all(responseWithMatchDetails);

      return {
        currentPageData,
        currentPageParam: pageParam,
        nextPageParam: pageParam + 20,
      };
    };

    // 다음 페이지 호출을 위한 pageParam을 get하기 위한 함수
    const queryKey = ['matchList', accessId];
    await queryClient.prefetchInfiniteQuery({
      queryKey,
      queryFn: fetchMatches,
      getNextPageParam: (lastPage, pages) => lastPage.nextPageParam,
    });
  };

  return {
    useMatchInfiniteQuery,
    usePrefetchMatchInfiniteQuery,
    useSoccerPlayerName,
    useRefetchMatchList,
  };
};
