import { useMemo } from 'react';
import styled from 'styled-components';

import { GradeBadge } from 'src/components/common/Badge/GradeBadge';
import { MvpBadge } from 'src/components/common/Badge/MvpBadge';
import { SoccerPlayerImage } from 'src/components/player/SoccerPlayer/SoccerPlayerImage';
import { SoccerPlayerName } from 'src/components/player/SoccerPlayer/SoccerPlayerName';
import { SeasonBadge } from 'src/components/common/Badge/SeasonBadge';
import {
  PositionCategoryKeyType,
  POSITION_CATEGORY,
} from 'src/constants/position';
import { PlayerDTO } from 'src/types/DetailObject';
import { useCaseGetMetaData } from 'src/useCases/useCaseGetMetaData';
import { IRenderBestPlayerDto } from 'src/util/changeServerDataIntoRenderData';

export interface SoccerPlayerProps {
  isMine: boolean;
  inFormation: boolean;
  playerDto: IRenderBestPlayerDto | PlayerDTO;
  topOption?: boolean;
  contentOption?: boolean;
}

const getSrc = (spId: number) => {
  return `https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${spId}.png`;
};

export const SoccerPlayer = ({
  isMine,
  inFormation,
  playerDto,
  topOption = true,
  contentOption = true,
}: SoccerPlayerProps) => {
  const { useGetSeasonIdMeta } = useCaseGetMetaData();
  const { data, isLoading } = useGetSeasonIdMeta();
  const targetSeasonId = Number(playerDto.spId.toString().slice(0, 3));
  const seasonDto = data?.find(({ seasonId }) => seasonId === targetSeasonId);

  const findPosition = useMemo(
    () =>
      Object.entries(POSITION_CATEGORY).find(([key, positionArray], index) => {
        const result = positionArray.find(
          (position) => position === playerDto.spPosition,
        );
        return result;
      }),
    [playerDto.spPosition],
  );

  const positionCategory = findPosition?.[0] as
    | PositionCategoryKeyType
    | undefined;

  return (
    <S.Container>
      <SoccerPlayerImage
        inFormation={inFormation}
        src={getSrc(playerDto.spId)}
        top={topOption && <MvpBadge isMine={isMine} />}
        bottomLeft={
          <SeasonBadge
            inFormation={inFormation}
            seasonImageSrc={seasonDto?.seasonImg}
          />
        }
        bottomRight={
          <GradeBadge spGrade={playerDto?.spGrade} inFormation={inFormation} />
        }
        isMine={isMine}
      />
      {contentOption && (
        <S.Content inFormation={inFormation}>
          <S.Position position={positionCategory} inFormation={inFormation}>
            {playerDto.spPosition}
          </S.Position>
          <SoccerPlayerName
            spId={playerDto.spId}
            inFormation={inFormation}
            position={positionCategory}
          />
        </S.Content>
      )}
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    gap: 1.8rem;
    text-align: center;

    @media ${({ theme }) => theme.media.small} {
      gap: 0.8rem;
      height: 4.5rem;
    }
  `,
  Content: styled.div<{ inFormation?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin: 0 auto;
    & > * {
      font-size: ${({ theme, inFormation }) =>
        inFormation ? '1rem' : theme.fontSizes.content[12]};
    }

    font-weight: 400;
  `,
  Position: styled.div<{
    position?: PositionCategoryKeyType;
    inFormation?: boolean;
  }>`
    font-size: ${({ theme, inFormation }) =>
      inFormation ? '1rem' : theme.fontSizes.content[14]};
    color: ${({ theme, position }) =>
      position === 'fw'
        ? theme.colors.position.fw
        : position === 'mf'
        ? theme.colors.position.mf
        : position === 'df'
        ? theme.colors.position.df
        : null};

    @media ${({ theme }) => theme.media.small} {
      display: none;
    }
  `,
  Status: styled.div``,
  AbsoluteDiv: styled.div`
    position: absolute;
    left: -28%;
  `,
};

// export const SoccerPlayerInFormation = () => {};
