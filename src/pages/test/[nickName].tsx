import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import TestMatchResultBox from 'src/components/player/TestMatchResultBox';

import { getUserAccessId } from '../api/user/getUserAccessId';
import {
  // getMatchAccessIds,
  getMatchDetailDatas,
} from '../api/user/getUserMatch';
import { getMatchDetailData } from '../api/user/getMatchDetailData';
import { MatchResultBox } from 'src/components/player/MatchResultBox';
import styled from 'styled-components';

//https://github.com/vercel/next.js/pull/40635
// 두개가 모두 Infer로 동일하게 병합되었는데 아직 적용이 안된것 같다.
type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
type ServerSideProps = GetServerSideProps<IProps>;

const Page = (props: PageProps) => {
  // dehydrate 방식
  const { data: userData } = useQuery(['userAccessId'], () =>
    getUserAccessId(props.nickName),
  );
  const { data: matchDetailDatas } = useQuery(['matchDetailDatas'], () =>
    getMatchDetailDatas(props.accessId),
  );

  return (
    <div style={{ height: '500px', padding: '100px', color: 'white' }}>
      <div>{props.nickName}</div>
      <br />
      <div>{userData?.nickname}</div>
      <div>
        <ul>
          {matchDetailDatas?.map((matchDetailData) => (
            <TestMatchResultBox
              matchDetailData={matchDetailData}
              key={matchDetailData.matchId}
              // matchId={matchId}
              // nickName={userData?.nickname}
            />
          ))}
          {/* {matchDetailDatas?.map((matchDetailData) => (
            <StyledLi key={matchDetailData.matchId}>
              <MatchResultBox matchDetailData={matchDetailData} />
            </StyledLi>
          ))} */}
        </ul>
      </div>
    </div>
  );
};

const StyledLi = styled.li`
  list-style: none;
  width: 100%;
  height: 13rem;
`;

interface INickNameQuery extends ParsedUrlQuery {
  nickName: string;
}

interface IProps {
  nickName: string;
  accessId: string;
  // userData: UserProfile;
}

// hydrate 방식
export const getServerSideProps: ServerSideProps = async (context) => {
  const { nickName } = context.query as INickNameQuery;
  const { accessId } = await getUserAccessId(nickName);
  console.log(accessId);
  // const matchList = await getUserMatch(accessId);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['userAccessId'], () =>
    getUserAccessId(nickName),
  );

  // 이걸 이제 인피니트 쿼리로 바꿔주자.
  await queryClient.prefetchQuery(
    ['matchDetailDatas'],
    async () => await getMatchDetailDatas(accessId),
  );

  return {
    props: {
      nickName,
      accessId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

/*
// initial data 방식
export const getServerSideProps: ServerSideProps = async (context) => {
  const { nickName } = context.query as INickNameQuery;
  const userData = await getUserAccessId(nickName);

  return {
    props: {
      nickName,
      userData,
      // dehydratedState: dehydrate(queryClient),
    },
  };
};
*/

export default Page;
