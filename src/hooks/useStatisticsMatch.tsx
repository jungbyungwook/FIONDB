import { useEffect, useState } from 'react';

import { pickBestPlayer } from 'src/useCases/matchRecordCase';
import { useCaseMatchSearch } from 'src/useCases/useCaseMatchSearch';
import { useCaseUserProfile } from 'src/useCases/useCaseUserProfile';

export const useStatisticsMatch = (nickName: string) => {
  const [searcherMostPlayerSpId, setSearcherMostPlayerSpId] = useState(0);

  const userProfileCase = useCaseUserProfile();
  const userProfileQuery = userProfileCase.useGetUserProfileQuery(nickName);

  const matchSearchCase = useCaseMatchSearch();
  const matchListQuery = matchSearchCase.useMatchInfiniteQuery(
    userProfileQuery.data?.accessId,
  );

  const matchPages = matchListQuery?.data?.pages;

  const getOdds = () => {
    const matchResults = matchPages?.flatMap((page) =>
      page.currentPageData.map(
        (matchDetail) =>
          matchDetail.matchInfo.sort((a, b) =>
            b.nickname === nickName ? 0 : -1,
          )[0].matchDetail.matchResult,
      ),
    );

    const winCount =
      matchResults?.filter((result) => result === '승').length || 0;
    const tieCount =
      matchResults?.filter((result) => result === '무').length || 0;
    const loseCount =
      matchResults?.filter((result) => result === '패').length || 0;

    return [winCount, tieCount, loseCount];
  };

  const getSearcherMostPlayerSpId = () => {
    if (!matchPages) return;

    const searcherBestPlayers = matchPages.flatMap(({ currentPageData }) => {
      const searcherMatchInfos = currentPageData.map(
        (match, index) => match.matchInfo[0],
      );

      return searcherMatchInfos.map((searcherMatchInfo) =>
        pickBestPlayer(searcherMatchInfo),
      );
    });

    const countBestPlayer = () => {
      return searcherBestPlayers.reduce((acc, cur) => {
        const currentCount = acc[cur.spId] || 0;

        return { ...acc, [cur.spId]: currentCount + 1 };
      }, {} as { [key: number]: number });
    };

    const mostPlayerSpId = Object.entries(countBestPlayer()).sort(
      (a, b) => b[1] - a[1],
    )[0][0];

    setSearcherMostPlayerSpId(Number(mostPlayerSpId));
  };

  useEffect(() => {
    if (matchListQuery?.data?.pages.length === 1) {
      getSearcherMostPlayerSpId();
    }
  }, [matchListQuery?.data?.pages]);

  return {
    searcherMostPlayerSpId,
    getSearcherMostPlayerSpId,
    getOdds,
  };
};
