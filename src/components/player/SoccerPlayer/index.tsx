import { ReactNode } from 'react';

import * as S from './style';
import { SoccerPlayerImage } from 'src/components/common/SoccerPlayerImage';
import { IRenderBestPlayerDto } from 'src/useCases/changeServerDataIntoRenderData';
import { SoccerPlayerName } from 'src/components/common/SoccerPlayerName';
import { GradeBadge } from 'src/components/common/Badge/GradeBadge';
import { MvpBadge } from 'src/components/common/Badge/MvpBadge';

export interface SoccerPlayerProps {
  playerDto: IRenderBestPlayerDto;
  children: ReactNode;
}

export const SoccerPlayer = ({ playerDto }: SoccerPlayerProps) => {
  const getSrc = (spId: number) => {
    return `https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${spId}.png`;
  };

  return (
    <S.Container>
      <SoccerPlayerImage
        src={getSrc(playerDto.spId)}
        top={<MvpBadge />}
        bottomLeft={<GradeBadge spGrade={0} />}
        bottomRight={<GradeBadge spGrade={21} />}
      />
      <S.Content>
        <div>포지션</div>
        <SoccerPlayerName spId={playerDto.spId} />
      </S.Content>
    </S.Container>
  );
};
