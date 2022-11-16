import { QueryClient, useInfiniteQuery } from 'react-query';
import { AccessId, matchAPI } from '../../player';

export const useCustomInfiniteQuery = (accessId: AccessId | undefined) => {
  if (!accessId) return;
  const fetchMatches = async ({ pageParam = 0 }) => {
    const matchListData = await matchAPI.getMatchList(accessId, pageParam);
    const responseWithMatchDetails = matchListData.map((matchId) =>
      matchAPI.getMatchDetail(matchId),
    );

    const currentPageData = await Promise.all(responseWithMatchDetails);
    console.log(currentPageData);
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

export const useCustomPrefetchInfiniteQuery = async (
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
