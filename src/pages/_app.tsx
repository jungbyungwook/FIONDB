// 모든페이지에 적용되는 파일
import type { AppProps } from 'next/app';
import styled, { createGlobalStyle } from 'styled-components';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
const queryClient = new QueryClient();
import {Header} from '@components';
import background from '/images/background.png'
import Image from 'next/image';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <BackgroundWrapper>
        <OverlayWrapper>
          <Header logo="FionDB" pageList={["전적검색", "랭킹"]} />
          <GlobalStyles />
          <Component {...pageProps} />
        </OverlayWrapper>
      <Image
        src="/images/background.png"
        alt="메인 배경 이미지"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        />  
      </BackgroundWrapper>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

const BackgroundWrapper = styled.div`
  width:100%;
  height:100%;
`
const OverlayWrapper = styled.div`
  z-index: 1;
  position:absolute;
  height: 100%;
  width: 100%;
`

const GlobalStyles = createGlobalStyle`

html,
body {
    padding: 0;
    margin: 0;
    font-size: 62.5%; 
}

color: white;
input {
    ::placeholder {
      color: #A6A6A6;
    }
  }


h1{
  font-size: 3.2rem;
}
h2{
  font-size: 2.4rem;
}
h3{
  font-size: 1.9rem;
}
p{
  font-size: 1.5rem;
}

a {
    color: inherit;
    text-decoration: none;
}
* {
    box-sizing: border-box;
}
input, button {
  background-color: transparent;
  border: none;
  outline: none;
}
`;
