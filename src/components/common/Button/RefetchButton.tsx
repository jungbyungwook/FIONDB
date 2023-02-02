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
    <S.RefetchButtonContainer>
      <Button
        center={TEXT}
        right={
          <S.RotateImageWrap isFetching={queryState?.isFetching}>
            <ReStartSVG />
          </S.RotateImageWrap>
        }
        onClick={refetchQuery}
      />
    </S.RefetchButtonContainer>
  );
};

const S = {
  RefetchButtonContainer: styled.div`
    @media ${({ theme }) => theme.media.small} {
      width: 32rem;
      height: 4rem;
      font-size: ${({ theme }) => theme.fontSizes.content[12]};
    }
  `,
  RotateImageWrap: styled.div<{ isFetching: boolean | undefined }>`
    ${({ isFetching }) =>
      isFetching &&
      css`
        animation: ${rotate359} 1s infinite linear;
      `}
  `,
};
