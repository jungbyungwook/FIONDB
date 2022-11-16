import Image from 'next/image';
import { pickBestPlayer } from 'src/pages/player/useCases/matchRecordCase';
import { MatchInfo } from 'types/DetailObject';

interface Props {
  matchInfo: MatchInfo;
}

const BestPlayerBox = ({ matchInfo }: Props) => {
  const bestPlayer = pickBestPlayer(matchInfo);
  return (
    <>
      <div>
        <Image
          src={`https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p${bestPlayer?.spId}.png`}
          width="100px"
          height="100px"
          // placeholder=""
          // blurDataURL=""
        />
      </div>
      <div>평점: {bestPlayer?.status.spRating}</div>
    </>
  );
};

export default BestPlayerBox;
