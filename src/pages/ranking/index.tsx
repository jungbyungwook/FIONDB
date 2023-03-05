import type { NextPage } from 'next';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import theme from 'src/style/theme';
import { Chart, ArcElement } from 'chart.js';
import Image from 'next/image';
import { NickName } from '../api/type';

Chart.register(ArcElement);

const Item = () => {
  const options = {
    cutout: '90%',
  };

  const Odds = 20;
  return (
    <ItemContainer>
      <RankingItem>1</RankingItem>
      <OwnerItemContainer>
        <NickNameText>닉네임</NickNameText>
        <ClubValueText>1000000bp</ClubValueText>
      </OwnerItemContainer>
      <RankingScoreItem>1000000</RankingScoreItem>
      <RecordItem>nn전 n승 n패</RecordItem>
      <OddsItem>
        <DoughnutContainer>
          <Doughnut
            options={options}
            data={{
              datasets: [
                {
                  data: [Odds, 100 - Odds],
                  backgroundColor: [
                    theme.colors.green.fionGreen,
                    theme.colors.gray[600],
                    theme.colors.gray[600],
                  ],
                  borderWidth: 0,
                },
              ],
            }}
          />
          <DoughnutOdds>{`${Odds}%`}</DoughnutOdds>
        </DoughnutContainer>
      </OddsItem>
      <HighestGradeItem>
        <div
          style={{
            width: 60,
            height: 60,
            backgroundColor: '#D9D9D9',
            borderRadius: 100,
          }}
        />
      </HighestGradeItem>
    </ItemContainer>
  );
};

const Ranking: NextPage = () => {
  return (
    <BackgroundWrapper>
      <RankingWrapper>
        <Title>랭킹점수</Title>
        <List>
          <RankingText>순위</RankingText>
          <OwnerText>구단주</OwnerText>
          <RankingScoreText>랭킹점수</RankingScoreText>
          <RecordText>전적</RecordText>
          <OddsText>승률</OddsText>
          <HighestGradeText>최고등급</HighestGradeText>
        </List>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <BackgorundWrapper>
          <Backgorund>
            <Image
              src="/images/background/ranking.png"
              alt="최고등급"
              layout="fill"
            />
          </Backgorund>
        </BackgorundWrapper>
      </RankingWrapper>
    </BackgroundWrapper>
  );
};

export default Ranking;

const BackgroundWrapper = styled.div`
  position: relative;
`;

const RankingWrapper = styled.div`
  background-color: '#D9D9D900';

  padding-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 291px;
`;

const List = styled.div`
  display: flex;
`;

const RankingText = styled.div`
  width: 8rem;
  height: 4.4rem;

  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  text-align: center;
`;
const OwnerText = styled.div`
  width: 28rem;
  height: 4.4rem;

  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  text-align: center;
`;
const RankingScoreText = styled.div`
  width: 20rem;
  height: 4.4rem;

  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  text-align: center;
`;
const RecordText = styled.div`
  width: 20rem;
  height: 4.4rem;

  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  text-align: center;
`;
const OddsText = styled.div`
  width: 12rem;
  height: 4.4rem;

  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  text-align: center;
`;
const HighestGradeText = styled.div`
  width: 12rem;
  height: 4.4rem;

  font-weight: 400;
  font-size: 20px;
  line-height: 23px;

  text-align: center;
`;

const ItemContainer = styled.div`
  display: flex;
  background-color: #212121;
  width: 108rem;
  height: 8.4rem;
  border-radius: 0.8rem;
  padding-left: 4rem;
  padding-right: 4rem;
  align-items: center;
  margin-bottom: 0.4rem;

  z-index: 2;
`;
const RankingItem = styled.div`
  width: 8rem;
  text-align: center;

  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
`;
const OwnerItemContainer = styled.div`
  display: flex;
  width: 28rem;
  flex-direction: column;
  justify-content: center;
  padding-left: 8.8rem;
`;
const NickNameText = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
`;
const ClubValueText = styled.div`
  margin-top: 0.2rem;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
`;
const RankingScoreItem = styled.div`
  width: 20rem;
  text-align: center;

  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
`;
const RecordItem = styled.div`
  width: 20rem;
  text-align: center;

  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
`;
const OddsItem = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  width: 12.4rem;

  justify-content: center;
  align-items: center;
  /* padding-left: 5rem; */
`;
const HighestGradeItem = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  width: 12.4rem;

  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 28px;
  line-height: 32px;

  margin-top: 6.2rem;
  margin-bottom: 0;
  margin-bottom: 92px;
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

const DoughnutContainer = styled.div`
  position: relative;
  width: 6rem;
  height: 6rem;
`;

const BackgorundWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
`;

const Backgorund = styled.div`
  position: relative;
  width: 91rem;
  height: 48rem;
`;

const DoughnutOdds = styled.div`
  position: absolute;
  right: 1.1rem;
  top: 2.1rem;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
`;
