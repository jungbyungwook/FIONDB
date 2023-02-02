import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styled from 'styled-components';
import { ParsedUrlQuery } from 'querystring';
import { dehydrate, QueryClient } from 'react-query';

import { MatchResultBox } from 'src/components/player/MatchResultBox';
import { UserProfileContainer } from 'src/components/player/UserProfile/UserProfileContainer';
import { Layout } from 'src/components/common/Layout';
import {
  IUserProfile,
  useCaseUserProfile,
} from 'src/useCases/useCaseUserProfile';
import {
  metaQueryFunction,
  metaQueryKey,
  useCaseGetMetaData,
} from 'src/useCases/useCaseGetMetaData';
import { useCaseMatchSearch } from 'src/useCases/useCaseMatchSearch';
import { useIntersectionObserver } from 'src/hooks/useIntersectionObserver';

type PagePropsType = InferGetServerSidePropsType<typeof getServerSideProps>;
const Page = ({ nickName }: PagePropsType) => {
  const { useGetUserProfileQuery } = useCaseUserProfile();
  const userProfileQuery = useGetUserProfileQuery(nickName);
  // 여기서 useQuery를 이용해서 fetch 함수를 호출하고 내부 Component에서는 queryClient에 접근해서 getData만을 수행한다.
  const { useGetTopTierQuery } = useCaseUserProfile();
  const { useMatchInfiniteQuery } = useCaseMatchSearch();
  const { useGetSoccerPlayersMeta } = useCaseGetMetaData();

  const topTierQuery = useGetTopTierQuery(
    userProfileQuery.data?.accessId || '',
  );
  const soccerPlayerMetaQuery = useGetSoccerPlayersMeta();
  const matchListInfiniteQuery = useMatchInfiniteQuery(
    userProfileQuery.data?.accessId,
  );
  const triggerRef = useIntersectionObserver(() =>
    matchListInfiniteQuery?.fetchNextPage(),
  );

  if (userProfileQuery.status === 'loading') return <div>loading...</div>;
  if (
    userProfileQuery.status === 'success' &&
    soccerPlayerMetaQuery.status === 'success'
  ) {
    return (
      <Layout>
        <S.Scetion>
          <UserProfileContainer
            accessId={userProfileQuery.data?.accessId}
            nickName={nickName}
          />
          <S.Ul>
            {matchListInfiniteQuery?.data?.pages.map((page) =>
              page.currentPageData.map((data) => (
                <MatchResultBox
                  key={data.matchId}
                  matchDetailData={data}
                  nickName={nickName}
                />
              )),
            )}
          </S.Ul>
          <S.BottomWrap>
            <div ref={triggerRef}>
              {matchListInfiniteQuery?.isFetching ? 'loading' : ''}
            </div>
          </S.BottomWrap>
        </S.Scetion>
      </Layout>
    );
  }

  return <Layout />;
};

interface IParams extends ParsedUrlQuery {
  nickName: string;
}

export const getServerSideProps: GetServerSideProps<IParams> = async (
  context,
) => {
  const { nickName } = context.query as IParams;
  const queryClient = new QueryClient();
  const { useGetUserProfilePrefetchQuery } = useCaseUserProfile();
  const prefetchUserProfileQuery = useGetUserProfilePrefetchQuery(
    nickName,
    queryClient,
  );
  const { usePrefetchMatchInfiniteQuery } = useCaseMatchSearch();

  const startUserProfileTime = new Date().getTime();
  await prefetchUserProfileQuery();
  const endUserProfileTime = new Date().getTime();
  const userProfileData = queryClient.getQueryData([
    'userProfile',
    nickName,
  ]) as IUserProfile;

  if (!userProfileData) {
    return {
      redirect: {
        permanent: false,
        destination: '/player',
      },
    };
  }

  const preFetchUserProfileTime = endUserProfileTime - startUserProfileTime;
  console.log(
    `Result Time Fetch User Profile :  ${preFetchUserProfileTime} ms`,
  );

  const startTime1 = new Date().getTime();
  await usePrefetchMatchInfiniteQuery(userProfileData.accessId, queryClient);
  const endTime1 = new Date().getTime();

  const prefetchMatchDataTime = endTime1 - startTime1;
  console.log(`Result Time Prefetch MatchData :  ${prefetchMatchDataTime} ms`);

  const startTime2 = new Date().getTime();
  await queryClient.prefetchQuery(
    metaQueryKey.soccerPlayersMeta,
    () => metaQueryFunction.soccerPlayersMeta,
  );
  const endTime2 = new Date().getTime();

  const prefetchSoccerPlayerMetaTime = endTime2 - startTime2;
  console.log(
    `Result Time Prefetch SoccerPlayerMeta :  ${prefetchSoccerPlayerMetaTime} ms`,
  );

  console.log(
    `totelTime: ${
      preFetchUserProfileTime +
      prefetchMatchDataTime +
      prefetchSoccerPlayerMetaTime
    } ms `,
  );

  return {
    props: {
      nickName: nickName,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Page;

export const S = {
  Scetion: styled.section`
    width: 108rem;
    margin: 0 auto;

    @media ${({ theme }) => theme.media.small} {
      width: 36rem;
    }
  `,
  Ul: styled.ul`
    display: grid;
    padding: 0;
    grid-row-gap: 0.8rem;
    list-style: none;
  `,
  BottomWrap: styled.div`
    width: 100%;
    text-align: center;
    margin: 5rem 0;
  `,
};
