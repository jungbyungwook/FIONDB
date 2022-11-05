import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IMatchDetailData } from 'types/DetailObject';
import { changeDateUtil } from 'util/chageDate';
import PercentBar from '../UI/bar/PercentBar';
import { ImageWithFallback } from '../UI/Image/ImageWithFallback';

interface Props {
  matchDetailData: IMatchDetailData;
  nickName: string;
}

interface IViewData {
  matchType: string;
  mathResult: string;
  leftPlayer: {
    goalCount: number;
    bestPlayer: {
      name: string;
      position: string;
      status: {};
    };
  };
  rightPlayer: {
    goalCount: number;
    bestPlayer: {
      name: string;
      position: string;
      status: {};
    };
  };
  matchDetail: {};
}

export const MatchResultBox = ({ matchDetailData, nickName }: Props) => {
  // 필요한 것만 추출하는 부분
  // name을 기준으로 left 한다.
  console.log('----------');
  console.log(matchDetailData);

  const changeServerDataIntoRenderData = (data: any) => {
    // 시간변환
    changeDateUtil(data.matchData);
    // matchType => 한글
    // 승, 패
  };

  const [sortedData, setSortedData] = useState({
    leftPlayer: {},
    rightPlayer: {},
  });

  return (
    <StyleContainer>
      {/* <StyleTop /> */}
      <StyleCenter>
        <StyleResult>
          <div>{matchDetailData.matchType}</div>
          <div>승</div>
          <div>{matchDetailData.matchType}</div>
        </StyleResult>
        <StyleLeftPlayer>
          <StyleBestPlayer>
            <ImageWithFallback fallbackSrc={''} src={''} />
            <div>이름</div>
          </StyleBestPlayer>
          <StyleBestPlayerStatus>113/112/111</StyleBestPlayerStatus>
        </StyleLeftPlayer>
        <StyleGoals>3 vs 4</StyleGoals>
        <StyleRightPlayer>
          <StyleBestPlayer>
            <ImageWithFallback fallbackSrc={''} src={''} />
            <div>이름</div>
          </StyleBestPlayer>
          <StyleBestPlayerStatus>113/112/111</StyleBestPlayerStatus>
        </StyleRightPlayer>
        <StyleDetail></StyleDetail>
      </StyleCenter>
      <StyleBottom>
        <PercentBar />
        <PercentBar />
      </StyleBottom>
    </StyleContainer>
  );
};

const StyleContainer = styled.div`
  /* display: flex; */
  width: 100%;
  height: 100%;
  border: 1px solid green;
`;

const StyleTop = styled.div`
  border: 1px solid green;
`;
const StyleBottom = styled.div`
  border: 1px solid green;
`;
const StyleCenter = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  border: 1px solid green;
  height: 100%;
  flex-basis: 100%;
`;
const StyleResult = styled.div`
  border: 1px solid green;
  flex-basis: 10rem;
`;
const StyleDetail = styled.div`
  border: 1px solid green;
  flex-basis: 5rem;
`;
const StyleGoals = styled.div`
  border: 1px solid green;
  flex-basis: 10rem;
`;
const StyleLeftPlayer = styled.div`
  display: flex;
  border: 1px solid green;
  flex: 1;
`;
const StyleRightPlayer = styled.div`
  display: flex;
  border: 1px solid green;
  flex: 1;
`;

const StyleBestPlayer = styled.div`
  border: 1px solid green;
  flex: 1;
  flex-basis: 10rem;
`;
const StyleBestPlayerStatus = styled.div`
  border: 1px solid green;
  flex: 1;
  flex-basis: 10rem;
`;
