import { useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { Input } from 'src/components/ui/Input/Input';
import { useRouterByEnter } from 'hooks/useRouterByEnter';
import styled from 'styled-components';
import { Layout } from 'src/components/Layout';
import type { ChangeEvent } from 'react';

const Home: NextPage = () => {
  const [nickName, setNickName] = useState('');
  const { routerPushOnKeyDown } = useRouterByEnter('player', [nickName]);

  const onChangeWithNickName = (e: ChangeEvent<HTMLInputElement>) =>
    setNickName(e.target.value);

  return (
    <BackgroundWrapper>
      <Layout>
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
          <InputWrapper>
            <Input
              placeholder="닉네임을 입력해주세요"
              isFocus={true}
              onChange={onChangeWithNickName}
              onKeyDown={routerPushOnKeyDown}
            />
          </InputWrapper>
        </HomeWrapper>
      </Layout>
    </BackgroundWrapper>
  );
};

export default Home;

const BackgroundWrapper = styled.div`
  background-image: url('/images/background.png');
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
`;

const HomeWrapper = styled.div`
  display: flex;
  color: white;
  flex-direction: column;
  align-items: center;
  height: 1024px;
`;
const MainBanner = styled.div`
  position: relative;
  width: 48.5rem;
  height: 25.4rem;
  margin-top: 15rem;
  margin-bottom: 5rem;
`;
const InputWrapper = styled.div`
  width: 35rem;
  height: 4.5rem;
`;
