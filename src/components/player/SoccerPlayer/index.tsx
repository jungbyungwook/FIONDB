import { ReactNode } from 'react';

import * as S from './style';
import { SoccerPlayerImage } from 'src/components/common/SoccerPlayerImage';
import { IRenderBestPlayerDto } from 'src/useCases/changeServerDataIntoRenderData';
import { SoccerPlayerName } from 'src/components/common/SoccerPlayerName';
import { GradeBadge } from 'src/components/common/Badge/GradeBadge';
import { MvpBadge } from 'src/components/common/Badge/MvpBadge';
import { useGetSeasonIdMeta } from 'src/hooks/useGetMetaQuery';

export interface SoccerPlayerProps {
  playerDto: IRenderBestPlayerDto;
  children: ReactNode;
}

export const SoccerPlayer = ({ playerDto }: SoccerPlayerProps) => {
  const getSrc = (spId: number) => {
    return `https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${spId}.png`;
  };
  const { data, isLoading } = useGetSeasonIdMeta();

  const targetSeasonId = Number(playerDto.spId.toString().slice(0, 3));
  const seasonDto = data?.find(({ seasonId }) => seasonId === targetSeasonId);
  // seasonId를 통해서 시즌에 대한 정보를 Get해온다.

  return (
    <S.Container>
      <SoccerPlayerImage
        src={getSrc(playerDto.spId)}
        top={<MvpBadge />}
        bottomLeft={<GradeBadge seasonImageSrc={seasonDto?.seasonImg} />}
        bottomRight={<GradeBadge spGrade={playerDto.spGrade} />}
      />
      <S.Content>
        <div>포지션</div>
        <SoccerPlayerName spId={playerDto.spId} />
      </S.Content>
    </S.Container>
  );
};
