import { useMemo } from 'react';
import styled from 'styled-components';

import { IRenderBestPlayerDto } from 'src/useCases/changeServerDataIntoRenderData';
import { GradeBadge } from 'src/components/common/Badge/GradeBadge';
import { MvpBadge } from 'src/components/common/Badge/MvpBadge';
import { SoccerPlayerImage } from 'src/components/player/SoccerPlayer/SoccerPlayerImage/SoccerPlayerImage';
import { SoccerPlayerName } from 'src/components/player/SoccerPlayer/SoccerPlayerName/SoccerPlayerName';
import { SeasonBadge } from 'src/components/common/Badge/SeasonBadge';
import { useGetSeasonIdMeta } from 'src/hooks/useGetMetaQuery';
import {
  PositionCategoryKeyType,
  POSITION_CATEGORY,
} from 'src/constants/position';
import { PlayerDTO } from 'src/types/DetailObject';

export interface SoccerPlayerProps {
  isMine: boolean;
  playerDto: IRenderBestPlayerDto | PlayerDTO;
}

export const SoccerPlayer = ({ isMine, playerDto }: SoccerPlayerProps) => {
  const getSrc = (spId: number) => {
    return `https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${spId}.png`;
  };
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
        src={getSrc(playerDto.spId)}
        top={<MvpBadge isMine={isMine} />}
        bottomLeft={<SeasonBadge seasonImageSrc={seasonDto?.seasonImg} />}
        bottomRight={<GradeBadge spGrade={playerDto?.spGrade} />}
      />
      <S.Content>
        <S.Position position={positionCategory}>
          {playerDto.spPosition}
        </S.Position>
        <SoccerPlayerName spId={playerDto.spId} />
      </S.Content>
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
  `,
  Content: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin: 0 auto;
    font-size: 1.2rem;
    font-weight: 400;
  `,
  Position: styled.div<{
    position?: PositionCategoryKeyType;
  }>`
    font-size: ${({ theme }) => theme.fontSizes.content[14]};
    color: ${({ theme, position }) =>
      position === 'fw'
        ? theme.colors.position.fw
        : position === 'mf'
        ? theme.colors.position.mf
        : position === 'df'
        ? theme.colors.position.df
        : null};
  `,
  Status: styled.div``,
  AbsoluteDiv: styled.div`
    position: absolute;
    left: -28%;
  `,
};
