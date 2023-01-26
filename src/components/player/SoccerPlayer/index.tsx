import { useMemo } from 'react';

import { SoccerPlayerImage } from 'src/components/common/SoccerPlayerImage';
import { IRenderBestPlayerDto } from 'src/useCases/changeServerDataIntoRenderData';
import { SoccerPlayerName } from 'src/components/common/SoccerPlayerName';
import { GradeBadge } from 'src/components/common/Badge/GradeBadge';
import { MvpBadge } from 'src/components/common/Badge/MvpBadge';
import { useGetSeasonIdMeta } from 'src/hooks/useGetMetaQuery';
import { SeasonBadge } from 'src/components/common/Badge/SeasonBadge';
import {
  PositionCategoryKeyType,
  POSITION_CATEGORY,
} from 'src/constants/position';
import { PlayerDTO } from 'src/types/DetailObject';
import * as S from './style';

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
