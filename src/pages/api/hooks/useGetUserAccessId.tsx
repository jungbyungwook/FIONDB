// import { QueryClient, useQuery } from 'react-query';
// import { getUserAccessId } from 'api/user/getUserAccessId';
// import { getUserAccessId } from 'src/pages/api/user/getUserAccessId';

// useQuery가 아니라 preFetchQueryf를 써야한다는거야??
// export const useGetUserAccessId = async (nickName: string, isSSR?: boolean) => {
//   const queryClient = new QueryClient();
//   return await queryClient.prefetchQuery([
//     'useAccessId',
//     () => getUserAccessId(nickName),
//   ]);

//   const getUserAccessIdQuery = useQuery(
//     'userAccessId',
//     () => getUserAccessId(nickName),
//     {
//       enabled: !!nickName,
//     },
//   );
//   return getUserAccessIdQuery;
// };
