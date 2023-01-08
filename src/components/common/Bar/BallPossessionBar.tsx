import theme from 'src/style/theme';
import { IRenderPlayerDto } from 'src/useCases/changeServerDataIntoRenderData';
import { PercentBarCommon } from './PercentBarCommon';

interface Props {
  playerDto: IRenderPlayerDto;
  isMine: boolean;
}

export const BallPossessionBar = ({ playerDto, isMine }: Props) => {
  const left = isMine ? playerDto.nickName : `${playerDto.possession}%`;
  const right = isMine ? `${playerDto.possession}%` : playerDto.nickName;

  return (
    <PercentBarCommon
      style={{
        width: playerDto.possession,
        backgroundColor: isMine
          ? theme.colors.green[800]
          : theme.colors.gray[700],
      }}
      left={left}
      right={right}
      center={null}
    ></PercentBarCommon>
  );
};
