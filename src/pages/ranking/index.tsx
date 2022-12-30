import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';

const dummyData = [
  {
    ranking: 1,
    profileImg: '프로필 이미지',
    nickname: '닉네임',
    record: 'nn전 n승 n패',
    Odds: '50%',
    rating: '등급1',
  },
  {
    ranking: 2,
    profileImg: '프로필 이미지',
    nickname: '닉네임',
    record: 'nn전 n승 n패',
    Odds: '50%',
    rating: '등급2',
  },
  {
    ranking: 3,
    profileImg: '프로필 이미지',
    nickname: '닉네임',
    record: 'nn전 n승 n패',
    Odds: '50%',
    rating: '등급3',
  },
];

const UserRankingBox = (props: any) => {
  const { ranking, profileImg, nickname, record, Odds, rating } = props;

  return (
    <UserRankingBoxWrapper>
      <ul>
        <li>{ranking}</li>
        {/* <li>{profileImg}</li> */}
        <li>{nickname}</li>
        <li>{record}</li>
        <li>{Odds}</li>
        <li>{rating}</li>
      </ul>
    </UserRankingBoxWrapper>
  );
};

const Ranking: NextPage = () => {
  return (
    <>
      <RankingWrapper>
        <h1>랭킹점수</h1>
        <ul>
          <li>순위</li>
          <li>구단주</li>
          <li>전적</li>
          <li>승률</li>
          <li>최고등급1</li>
        </ul>
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
        ;
      </RankingWrapper>
    </>
  );
};

export default Ranking;

const RankingWrapper = styled.div`
  display: flex;
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
  }
`;

const UserRankingBoxWrapper = styled.div`
  width: 1200px;
  height: 127.83px;
  margin-bottom: 16px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  ul {
    color: black;
  }
`;
