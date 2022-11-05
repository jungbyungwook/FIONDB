import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { getUserAccessId } from '../api/user/getUserAccessId';
import { getUserMatch } from '../api/user/getUserMatch';
import { getMatchInfo } from '../api/user/getMatchInfo';
import TestMatchResultBox from 'src/components/player/TestMatchResultBox';

//https://github.com/vercel/next.js/pull/40635
// 두개가 모두 Infer로 동일하게 병합되었는데 아직 적용이 안된것 같다.
type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;
type ServerSideProps = GetServerSideProps<IProps>;

const Page = (props: PageProps) => {
  /*
  initialData 방식
  const { data: userData } = useQuery(
    ['useAccessId'],
    // () => getUserAccessId(props.nickName),
    { initialData: props.userData },
  );
  */

  // dehydrate 방식
  // const { data: userData } = useQuery(['useAccessId'], () =>
  //   getUserAccessId(props.nickName),
  // );
  // const { data: matchIds } = useQuery(['userMatch'], () =>
  //   getUserMatch(props.accessId),
  // );

  // const { data: userMatchDetailDatas } = useQuery(['matchInfo'], () =>
  //   getMatchInfo(matchId),
  // );
  return (
    <div style={{ height: '500px', padding: '100px', color: 'white' }}>
      {/* <div>{props.nickName}</div>
      <br />
      <div>{userData?.nickname}</div>
      <div>
        <ul>
          {matchIds?.map((matchId) => (
            <TestMatchResultBox
              key={matchId}
              matchId={matchId}
              nickName={userData?.nickname}
            />
          ))}
        </ul>
      </div> */}
    </div>
  );
};

interface INickNameQuery extends ParsedUrlQuery {
  nickName: string;
}

// page바깥에서 사용하려면 context나 props를 통해 전달해주어야한다.

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

interface IProps {
  nickName: string;
  // accessId: string;
  // userData: UserProfile;
}

/*
// hydrate 방식
export const getServerSideProps: ServerSideProps = async (context) => {
  const { nickName } = context.query as INickNameQuery;
  // const { accessId } = await getUserAccessId(nickName);
  // const matchList = await getUserMatch(accessId);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['useAccessId'], () =>
    getUserAccessId(nickName)
  );

  ['asdfasdf', 'adfasdfdasf']

  await queryClient.prefetchQuery(['useAccessId'], () =>
  getUserAccessId(matchId)
);


  queryClient.prefetchInfiniteQuery(())

  // 1. nickName => accessId // react query
  // 2. accessId => postIdList // reac query
  // 3. postIdList => postId => postDetailData

  // await queryClient.prefetchQuery(['userMatch'], () => getUserMatch(accessId));
  //   await queryClient.prefetchQuery(['matchInfo', mat], () =>
  //   getMatchInfo(matchId),
  // ),

  // const PromiseMatchList = matchList.map(
  //   async (matchId) =>
  //     await queryClient.prefetchQuery(['matchInfo', matchId], () =>
  //       getMatchInfo(matchId),
  //     ),
  // );

  // console.log(PromiseMatchList);
  // await Promise.all(PromiseMatchList);
  // console.log(PromiseMatchList);
  // await queryClient.prefetchQuery(['matchInfo'], () =>
  //   getMatchInfo(matchList[0]),
  // );

  // prefetchIn

  return {
    props: {
      nickName,
      // accessId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

*/
export default Page;
