import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Title, SearchInput } from '@components';
import styled from 'styled-components';

const Home: NextPage = () => {
  return (
    <>
      <Image
        src="/images/background.png"
        alt="메인 배경 이미지"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <HomeWrapper>
        <MainBanner>
          <Image
            src="/images/main-banner.png"
            alt="메인 배너 이미지"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </MainBanner>
        <SearchInput text={'유저명을 입력하세요.'} />
      </HomeWrapper>
    </>
  );
};

export default Home;

const HomeWrapper = styled.div`
  display: flex;
  position: relative;
  color: white;
  z-index: 1;
  flex-direction: column;
  align-items: center;
`;

const MainBanner = styled.div`
  position: relative;
  width: 48.5rem;
  height: 25.4rem;
  margin-top: 10rem;
  margin-bottom: 5rem;
`;
