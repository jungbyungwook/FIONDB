import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';

const dummyData = [
  {
    ranking: 1,
    profileImg: '프로필 이미지',
    nickname: '피굽남BenQ김승환',
    record: '34전 1승 6패',
    Odds: '82.9%',
    rating: '등급1',
  },
  {
    ranking: 2,
    profileImg: '프로필 이미지',
    nickname: 'VIsualUTA',
    record: '37전 1승 5패',
    Odds: '86%',
    rating: '등급2',
  },
  {
    ranking: 3,
    profileImg: '프로필 이미지',
    nickname: ' PGxKT곽준혁',
    record: '45전 0승 13패',
    Odds: '77.6%',
    rating: '등급3',
  },
];

const UserRankingBox = (props: any) => {
  const { ranking, profileImg, nickname, record, Odds, rating } = props;

  return (
    <UserRankingData>
      <li
        style={{
          width: '80px',
          fontStyle: 'normal',
          fontWeight: '700px',
          fontSize: '32px',
          lineHeight: '37px',
          marginRight: '24px',
        }}
      >
        {ranking}
      </li>
      <li>
        <ul style={{ width: '320px', listStyle: 'none', marginRight: '24px' }}>
          <li
            style={{
              fontStyle: 'normal',
              fontWeight: '400px',
              fontSize: '20px',
              lineHeight: '23px',
            }}
          >
            {nickname}
          </li>
          <li
            style={{
              fontFamily: 'Noto Sans',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '25px',
            }}
          >
            100,000,000 BP
          </li>
        </ul>
      </li>
      <li
        style={{
          width: '200px',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '20px',
          lineHeight: '23px',
          marginRight: '24px',
        }}
      >
        {record}
      </li>
      <li style={{ width: '80px', marginRight: '24px' }}>{Odds}</li>
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
              marginRight: '24px',
            }}
          >
            순위
          </li>
          <li
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '320px',
              marginRight: '24px',
              alignItems: 'center',
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
              marginRight: '24px',
            }}
          >
            전적
          </li>
          <li
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: '80px',
              marginRight: '24px',
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
              marginRight: '65px',
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
            rating={i.rating}
          />
        ))}
      </RankingWrapper>
    </>
  );
};

export default Ranking;

const RankingWrapper = styled.div`
  /* display: flex;
  color: white;
  flex-direction: column;
  align-items: center;
  height: 744px;
  padding-top: 100px;
  
  ul {
    list-style: none;
    color: white;
    font-size: 20px;
  }
  li {
    float: left;
  }
  li + li {
    margin-left: 150px;
  } */

  padding-top: 142.5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 17px;
`;

const UserRankingData = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;

  display: flex;
  list-style: none;

  background: #212121;
  width: 1200px;
  height: 112px;
  margin-bottom: 0;
`;

const RankingScore = styled.h1`
  margin: 0;
  padding: 0;

  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 37px;
`;

const RankingList = styled.ul`
  display: flex;
  list-style: none;

  li {
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
  }
  /* width: 1200px; */

  /* width: 1200px; */
  /* align-items: center; */
  /* justify-content: center; */
`;
