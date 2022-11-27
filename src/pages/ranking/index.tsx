import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styled from 'styled-components';

const Ranking: NextPage = () => {
  return (
    <>
      <RankingWrapper>
        <h1>ranking 작업중</h1>
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
`;
