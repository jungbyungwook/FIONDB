// import { useQueryClient } from 'react-query';
import { useRefetchMatchList } from 'src/pages/api/hooks/query/useRefetchQuery';
import styled from 'styled-components';

export const MatchRefetchButton = ({
  accessId,
  text,
}: {
  accessId: string;
  text: string;
}) => {
  // const queryClient = useQueryClient();
  // const onClick = () => queryClient.invalidateQueries(['matchList', accessId]);
  // const isLoading = queryClient.getQueryState([
  //   'matchList',
  //   accessId,
  // ])?.isFetching;

  const { refetchQuery, queryState } = useRefetchMatchList(accessId);
  return (
    <S.Button onClick={refetchQuery}>
      {queryState?.isFetching ? 'loading' : text}
    </S.Button>
  );
};

const S = {
  Button: styled.button`
    width: 8rem;
    height: 3rem;
    border-radius: 0.5rem;
    color: white;
    background-color: orange;
    :hover {
      cursor: pointer;
      opacity: 0.8;
    }
  `,
};
