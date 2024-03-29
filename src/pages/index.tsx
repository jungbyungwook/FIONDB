import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import styled from 'styled-components';

import { Input } from 'src/components/common/Input/Input';
import { Layout } from 'src/components/common/Layout';
import { useRouterByEnter } from 'src/hooks/useRouterByEnter';
import { FionDbIcon } from 'src/components/common/SvgIcons/FionDbIcon';
import { GoalLoadingSpinnerContainer } from 'src/components/common/Spinner/GoalLoadingSpinnerContainer';
import { GoalLoadingSpinner } from 'src/components/common/Spinner/GoalLoadingSpinner';

const Home: NextPage = () => {
  const [nickName, setNickName] = useState('');
  const { isRouting, routerPushOnKeyDown, routerClinkOnButton } =
    useRouterByEnter('player', [nickName]);

  const onChangeWithNickName = (e: ChangeEvent<HTMLInputElement>) =>
    setNickName(e.target.value);

  return (
    <BackgroundWrapper>
      {isRouting && (
        <GoalLoadingSpinnerContainer>
          <GoalLoadingSpinner width={100} height={100} />
        </GoalLoadingSpinnerContainer>
      )}

      <Layout>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <HomeWrapper>
            <SubLogo>
              <FionDbIcon />
            </SubLogo>
            <MainBanner>
              <Image
                src="/images/banner/main-banner2.png"
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
                style={{ paddingLeft: 16, fontSize: 16 }}
              />

              <SearchBtn onClick={routerClinkOnButton}>전적 보기</SearchBtn>
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
  width: 640px;

  @media (max-width: 1023px) {
    align-items: center;
  }
`;

const SubLogo = styled.div`
  margin-top: 100px;
  margin-bottom: 8px;
  margin-left: 2px;

  @media (max-width: 1023px) {
    display: none;
  }
`;
const MainBanner = styled.div`
  position: relative;
  width: 640px;
  height: 320px;
  margin-bottom: 24px;

  @media (max-width: 1023px) {
    width: 90vw;
    height: 46vw;
    margin-top: 10vw;
  }
`;
const InputWrapper = styled.div`
  width: 640px;
  height: 56px;
  display: flex;
  @media (max-width: 1023px) {
    width: 90vw;
  }
`;

const SearchBtn = styled.div`
  display: flex;
  margin-left: 13px;
  width: 128px;
  height: 56px;
  background: #212121;
  border-radius: 8px;
  justify-content: center;
  align-items: center;

  font-weight: 400;
  font-size: 16px;
  line-height: 18px;

  :hover {
    cursor: pointer;
  }
`;
