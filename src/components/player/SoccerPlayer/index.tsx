import { S } from './style';
import { SoccerPlayerImage } from '../../common/SoccerPlayerImage';
import { IRenderBestPlayerDto } from 'src/useCases/changeServerDataIntoRenderData';
import { SoccerPlayerName } from '../../common/SoccerPlayerName';
import { ReactNode } from 'react';

export interface SoccerPlayerProps {
  playerDto: IRenderBestPlayerDto;
  children: ReactNode;
}

export const SoccerPlayer = ({ playerDto, children }: SoccerPlayerProps) => {
  return (
    <S.SoccerPlayer.Container>
      <SoccerPlayerImage
        src={`https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${playerDto.spId}.png`}
      />
      <S.SoccerPlayer.Name>
        {children}
        <SoccerPlayerName spId={playerDto.spId} />
      </S.SoccerPlayer.Name>
    </S.SoccerPlayer.Container>
  );
};
