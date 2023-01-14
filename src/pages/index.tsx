import { useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { Input } from 'src/components/ui/Input/Input';
import { useRouterByEnter } from 'hooks/useRouterByEnter';
import styled from 'styled-components';
import { Layout } from 'src/components/Layout';
import type { ChangeEvent } from 'react';
import { useRef } from 'react';

const Home: NextPage = () => {
  const [nickName, setNickName] = useState('');
  const { routerPushOnKeyDown } = useRouterByEnter('player', [nickName]);

  const onChangeWithNickName = (e: ChangeEvent<HTMLInputElement>) =>
    setNickName(e.target.value);

  const inputRef = useRef(null);

  return (
    <BackgroundWrapper>
      <Layout>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <HomeWrapper>
            <Title>FION.DB</Title>
            <MainBanner>
              <Image
                src="/images/banner/main-banner.png"
                alt="메인 배너 이미지"
                layout="fill"
              />
            </MainBanner>
            <InputWrapper>
              <Input
                placeholder="구단주 이름을 입력해주세요."
                isFocus={true}
                onChange={onChangeWithNickName}
                onKeyDown={routerPushOnKeyDown}
                style={{ paddingLeft: 24, fontSize: 18 }}
              />

              <SearchBtn onClick={() => console.log('전적 보기')}>
                전적 보기
              </SearchBtn>
            </InputWrapper>
          </HomeWrapper>
        </div>
      </Layout>
    </BackgroundWrapper>
  );
};

export default Home;

const BackgroundWrapper = styled.div`
  background-image: url('/images/background/background.png');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
`;

const HomeWrapper = styled.div`
  display: flex;
  color: white;
  flex-direction: column;
  height: 1024px;
  width: 790px;
`;

const Title = styled.h1`
  font-family: 'Chakra-Petch';
  font-style: normal;
  font-weight: 700;
  font-size: 62px;
  line-height: 81px;
  color: #a1db00;
  margin: 0;
  margin-top: 100px;
`;
const MainBanner = styled.div`
  position: relative;
  width: 790px;
  height: 373px;
  margin-bottom: 80px;
`;
const InputWrapper = styled.div`
  width: 790px;
  height: 73px;
  display: flex;
`;

const SearchBtn = styled.div`
  display: flex;
  margin-left: 13px;
  width: 174px;
  height: 73px;
  background: #212121;
  border-radius: 8px;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  font-size: 24px;
  line-height: 33px;
`;

const SubLogo = styled.div`
  position: relative;
`;
