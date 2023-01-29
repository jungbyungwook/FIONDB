import styled, { css } from 'styled-components';

import ReStartSVG from 'src/assets/svg/restart_alt.svg';
import { rotate359 } from 'src/style/keyframes';
import { useCaseMatchSearch } from 'src/useCases/useCaseMatchSearch';
import { Button } from './Button';

const TEXT = '전적갱신';

interface IProps {
  accessId: string;
}

export const RefetchButton = ({ accessId }: IProps) => {
  const { useRefetchMatchList } = useCaseMatchSearch();
  const { refetchQuery, queryState } = useRefetchMatchList(accessId);

  return (
    <Button
      center={TEXT}
      right={
        <S.rotateImageWrap isFetching={queryState?.isFetching}>
          <ReStartSVG />
        </S.rotateImageWrap>
      }
      onClick={refetchQuery}
    />
  );
};

const S = {
  rotateImageWrap: styled.div<{ isFetching: boolean | undefined }>`
    ${({ isFetching }) =>
      isFetching &&
      css`
        animation: ${rotate359} 1s infinite linear;
      `}
  `,
};
