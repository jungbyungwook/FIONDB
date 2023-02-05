import type { NextPage } from 'next';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';

const dummyData = [
  {
    ranking: 1,
    profileImg: '프로필 이미지',
    nickname: '피굽남BenQ김승환',
    record: '34전 1승 6패',
    rankingScore: 1000,
    Odds: '82.9%',
    rating: '등급1',
  },
  {
    ranking: 2,
    profileImg: '프로필 이미지',
    nickname: 'VIsualUTA',
    record: '37전 1승 5패',
    rankingScore: 1000,
    Odds: '86%',
    rating: '등급2',
  },
  {
    ranking: 3,
    profileImg: '프로필 이미지',
    nickname: ' PGxKT곽준혁',
    record: '45전 0승 13패',
    rankingScore: 1000,
    Odds: '77.6%',
    rating: '등급3',
  },
];

const UserRankingBox = (props: any) => {
  const { ranking, profileImg, nickname, record, rankingScore, Odds, rating } =
    props;

  return (
    <UserRankingData>
      <li
        style={{
          width: '80px',
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '28px',
          marginLeft: '50px',
        }}
      >
        {ranking}
      </li>
      <li>
        <ul style={{ width: '280px', listStyle: 'none' }}>
          <li
            style={{
              fontWeight: '400px',
              fontSize: '16px',
              lineHeight: '18px',
            }}
          >
            {nickname}
          </li>
          <li
            style={{
              fontFamily: 'Noto Sans',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '22px',
            }}
          >
            100,000,000 BP
          </li>
        </ul>
      </li>
      <li
        style={{
          width: '200px',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '18px',
          marginLeft: '30px',
        }}
      >
        {record}
      </li>
      <li
        style={{
          width: '200px',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '22px',
          marginLeft: '40px',
        }}
      >
        {rankingScore}
      </li>
      <li style={{ width: '120px' }}>{Odds}</li>
      <li style={{ width: '120px' }}>{rating}</li>
    </UserRankingData>
  );
};

const Ranking: NextPage = () => {
  return (
    <>
      <RankingWrapper>
        <RankingScore>랭킹점수</RankingScore>
        <RankingList>
          <li
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '80px',
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: '23px',
              // marginRight: '24px',
            }}
          >
            순위
          </li>
          <li
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '280px',
              alignItems: 'center',
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: '23px',
            }}
          >
            구단주
          </li>
          <li
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '200px',
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: '23px',
            }}
          >
            전적
          </li>
          <li
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '200px',
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: '23px',
            }}
          >
            랭킹점수
          </li>
          <li
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '120px',
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: '23px',
            }}
          >
            승률
          </li>
          <li
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '120px',
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: '23px',
            }}
          >
            최고등급
          </li>
        </RankingList>
        {dummyData.map((i) => (
          <UserRankingBox
            ranking={i.ranking}
            profileImg={i.profileImg}
            nickname={i.nickname}
            record={i.record}
            Odds={i.Odds}
            rankingScore={i.rankingScore}
            rating={i.rating}
          />
        ))}
      </RankingWrapper>
    </>
  );
};

export default Ranking;

const RankingWrapper = styled.div`
  /* background-color: blue; */

  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 291px;

  ul {
    margin-top: 4px;
  }
`;

const UserRankingData = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;

  display: flex;
  list-style: none;

  background: #212121;
  width: 1080px;
  height: 84px;

  margin-bottom: 0;
  padding-bottom: 0;
`;

const RankingScore = styled.h1`
  font-weight: 400;
  font-size: 28px;
  line-height: 32px;

  margin-top: 62.5px;
  margin-bottom: 62.5px;
`;

const RankingList = styled.ul`
  display: flex;
  list-style: none;

  li {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
  }
`;
